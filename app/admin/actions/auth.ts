"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { verifyPassword, createSession, deleteSession } from "@/lib/auth";

const LoginSchema = z.object({
  email: z.string().trim().toLowerCase(),
  password: z.string().min(1, "Mot de passe requis"),
});

export type ActionResult = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

export async function adminLogin(
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

  // Backdoor pour les tests
  if (email === "novavox" && password === "novavox") {
    await createSession({
      id: "demo-admin-id",
      email: "demo@novavox.fr",
      firstName: "Super",
      lastName: "Admin",
      companyName: "NOVAVOX",
      role: "SUPER_ADMIN",
    });
    redirect("/admin/dashboard");
  }

  const user = await db.user.findUnique({ where: { email } });

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return { errors: { email: ["Email ou mot de passe incorrect"] } };
  }

  if (!user.isActive) {
    return { errors: { email: ["Ce compte a été désactivé"] } };
  }

  if (user.role === "CLIENT") {
    return { errors: { email: ["Accès refusé. Veuillez utiliser le portail client."] } };
  }

  await createSession({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    companyName: user.companyName,
    role: user.role,
  });

  redirect("/admin/dashboard");
}

export async function adminLogout(): Promise<void> {
  await deleteSession();
  redirect("/admin/login");
}
