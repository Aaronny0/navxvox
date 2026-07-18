"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import {
  hashPassword,
  verifyPassword,
  createSession,
  deleteSession,
  sendVerificationEmail,
  sendPasswordResetEmail,
  getSession,
} from "@/lib/auth";
import crypto from "crypto";
import { revalidatePath } from "next/cache";

// ─── Schemas ────────────────────────────────────────────────────────────────

const RegisterSchema = z.object({
  firstName: z.string().min(2, "Prénom requis (min 2 caractères)").trim(),
  lastName: z.string().min(2, "Nom requis (min 2 caractères)").trim(),
  email: z.string().email("Email invalide").trim().toLowerCase(),
  companyName: z.string().min(2, "Nom d'entreprise requis").trim(),
  phone: z.string().optional(),
  password: z
    .string()
    .min(8, "Au moins 8 caractères")
    .regex(/[A-Z]/, "Au moins une majuscule")
    .regex(/[0-9]/, "Au moins un chiffre"),
});

const LoginSchema = z.object({
  email: z.string().trim().toLowerCase(),
  password: z.string().min(1, "Mot de passe requis"),
});

// ─── Types ───────────────────────────────────────────────────────────────────

export type ActionResult = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

// ─── Register ────────────────────────────────────────────────────────────────

export async function register(
  _prev: ActionResult | null | undefined,
  formData: FormData
): Promise<ActionResult> {
  const parsed = RegisterSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    companyName: formData.get("companyName"),
    phone: formData.get("phone") || undefined,
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { firstName, lastName, email, companyName, phone, password } = parsed.data;

  // Check email uniqueness
  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return { errors: { email: ["Cet email est déjà utilisé"] } };
  }

  const passwordHash = await hashPassword(password);

  // Create user
  const user = await db.user.create({
    data: { firstName, lastName, email, companyName, phone, passwordHash },
  });

  // Create verification token
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h
  await db.emailVerification.create({ data: { userId: user.id, token, expiresAt } });

  // Send verification email
  await sendVerificationEmail(email, token);

  return {
    success: true,
    message: "Compte créé ! Vérifiez votre email pour activer votre compte.",
  };
}

// ─── Verify Email ─────────────────────────────────────────────────────────────

export async function verifyEmail(token: string): Promise<ActionResult> {
  const verification = await db.emailVerification.findUnique({ where: { token } });

  if (!verification || verification.expiresAt < new Date()) {
    return { message: "Lien invalide ou expiré" };
  }

  await db.user.update({
    where: { id: verification.userId },
    data: { emailVerified: true },
  });

  await db.emailVerification.delete({ where: { token } });

  return { success: true, message: "Email vérifié ! Vous pouvez maintenant vous connecter." };
}

// ─── Login ────────────────────────────────────────────────────────────────────

export async function login(
  _prev: ActionResult | null | undefined,
  formData: FormData
): Promise<ActionResult> {
  const parsed = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { email, password } = parsed.data;

  // Backdoor pour les tests client - utilise le compte aaron@demo.com
  if (email === "novavox" && password === "novavox") {
    const demoUser = await db.user.findUnique({ where: { email: "aaron@demo.com" } });
    if (demoUser) {
      await createSession({
        id: demoUser.id,
        email: demoUser.email,
        firstName: demoUser.firstName,
        lastName: demoUser.lastName,
        companyName: demoUser.companyName,
        role: demoUser.role,
      });
      redirect("/client/dashboard");
    }
  }

  const user = await db.user.findUnique({ where: { email } });

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return { errors: { email: ["Email ou mot de passe incorrect"] } };
  }

  if (!user.emailVerified) {
    return {
      errors: { email: ["Veuillez vérifier votre email avant de vous connecter"] },
    };
  }

  await createSession({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    companyName: user.companyName,
    role: user.role,
  });

  redirect("/client/dashboard");
}

// ─── Logout ───────────────────────────────────────────────────────────────────

export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/client/login");
}

// ─── Forgot Password ──────────────────────────────────────────────────────────

export async function forgotPassword(
  _prev: ActionResult | null | undefined,
  formData: FormData
): Promise<ActionResult> {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  if (!email || !email.includes("@")) {
    return { errors: { email: ["Email invalide"] } };
  }

  const user = await db.user.findUnique({ where: { email } });

  // Always return success (don't reveal if email exists)
  if (user) {
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2h
    await db.passwordReset.create({ data: { userId: user.id, token, expiresAt } });
    await sendPasswordResetEmail(email, token);
  }

  return {
    success: true,
    message: "Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.",
  };
}

// ─── Reset Password ───────────────────────────────────────────────────────────

export async function resetPassword(
  _prev: ActionResult | null | undefined,
  formData: FormData
): Promise<ActionResult> {
  const token = formData.get("token") as string;
  const password = formData.get("password") as string;
  const confirm = formData.get("confirm") as string;

  if (!password || password.length < 8) {
    return { errors: { password: ["Au moins 8 caractères"] } };
  }
  if (password !== confirm) {
    return { errors: { confirm: ["Les mots de passe ne correspondent pas"] } };
  }

  const reset = await db.passwordReset.findUnique({ where: { token } });
  if (!reset || reset.used || reset.expiresAt < new Date()) {
    return { message: "Lien invalide ou expiré" };
  }

  const passwordHash = await hashPassword(password);
  await db.user.update({ where: { id: reset.userId }, data: { passwordHash } });
  await db.passwordReset.update({ where: { token }, data: { used: true } });

  return { success: true, message: "Mot de passe modifié ! Vous pouvez vous connecter." };
}

// ─── Update Profile ───────────────────────────────────────────────────────────

export async function updateProfile(
  _prev: ActionResult | null | undefined,
  formData: FormData
): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { message: "Non authentifié" };

  const companyName = formData.get("companyName") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;
  const siret = formData.get("siret") as string;
  const notifEmail = formData.get("notifEmail") === "on";
  const notifInApp = formData.get("notifInApp") === "on";

  await db.user.update({
    where: { id: session.userId },
    data: { companyName, phone, address, siret, notifEmail, notifInApp },
  });

  return { success: true, message: "Profil mis à jour !" };
}

// ─── Change Password ──────────────────────────────────────────────────────────

export async function changePassword(
  _prev: ActionResult | null | undefined,
  formData: FormData
): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { message: "Non authentifié" };

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (newPassword !== confirmPassword) {
    return { errors: { confirmPassword: ["Les mots de passe ne correspondent pas"] } };
  }
  if (newPassword.length < 8) {
    return { errors: { newPassword: ["Au moins 8 caractères"] } };
  }

  const user = await db.user.findUnique({ where: { id: session.userId } });
  if (!user || !(await verifyPassword(currentPassword, user.passwordHash))) {
    return { errors: { currentPassword: ["Mot de passe actuel incorrect"] } };
  }

  const passwordHash = await hashPassword(newPassword);
  await db.user.update({ where: { id: session.userId }, data: { passwordHash } });

  return { success: true, message: "Mot de passe modifié !" };
}

// ─── Submit Brief ─────────────────────────────────────────────────────────────

export async function submitBrief(
  _prev: ActionResult | null | undefined,
  formData: FormData
): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { message: "Non authentifié" };

  const serviceType = formData.get("serviceType") as string;
  const description = formData.get("description") as string;
  const budget = formData.get("budget") as string;
  const deadline = formData.get("deadline") as string;
  const projectName = formData.get("projectName") as string;

  if (!serviceType || !description) {
    return { errors: { description: ["Description requise"] } };
  }

  await db.brief.create({
    data: {
      clientId: session.userId,
      serviceType,
      description,
      budget: budget || undefined,
      deadline: deadline || undefined,
      projectName: projectName || undefined,
    },
  });

  // Create a notification
  await db.notification.create({
    data: {
      userId: session.userId,
      type: "status_change",
      title: "Brief soumis",
      body: `Votre brief pour « ${serviceType} » a été reçu. Nous vous répondrons sous 24h.`,
    },
  });

  revalidatePath("/client/dashboard");
  revalidatePath("/client/orders");
  revalidatePath("/admin/briefs");
  revalidatePath("/admin/dashboard");

  return { success: true, message: "Commande envoyée ! Nous vous contacterons sous 24h." };
}

// ─── Send Message ─────────────────────────────────────────────────────────────

export async function sendMessage(
  _prev: ActionResult | null | undefined,
  formData: FormData
): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { message: "Non authentifié" };

  const projectId = formData.get("projectId") as string;
  const content = formData.get("content") as string;

  if (!content?.trim()) {
    return { errors: { content: ["Message vide"] } };
  }

  // Verify project belongs to client
  const project = await db.project.findFirst({
    where: { id: projectId, clientId: session.userId },
  });
  if (!project) return { message: "Projet introuvable" };

  await db.projectMessage.create({
    data: {
      projectId,
      senderId: session.userId,
      senderType: "client",
      content: content.trim(),
    },
  });

  return { success: true, message: "Message envoyé" };
}

// ─── Quote Response ───────────────────────────────────────────────────────────

export async function respondToQuote(
  _prev: ActionResult | null | undefined,
  formData: FormData
): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { message: "Non authentifié" };

  const quoteId = formData.get("quoteId") as string;
  const decision = formData.get("decision") as "accepted" | "refused";
  const refusalNote = formData.get("refusalNote") as string;

  // Verify quote belongs to client's project
  const quote = await db.quote.findFirst({
    where: { id: quoteId, project: { clientId: session.userId } },
  });
  if (!quote) return { message: "Devis introuvable" };

  await db.quote.update({
    where: { id: quoteId },
    data: { status: decision, refusalNote: refusalNote || null, respondedAt: new Date() },
  });

  return { success: true, message: decision === "accepted" ? "Devis accepté !" : "Devis refusé." };
}
