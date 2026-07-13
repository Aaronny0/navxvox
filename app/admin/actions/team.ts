"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getSession, hashPassword } from "@/lib/auth";

export async function createTeamMember(formData: FormData) {
  const session = await getSession();
  if (!session || session.role !== "SUPER_ADMIN") return { error: "Non autorisé" };

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as any;
  const password = formData.get("password") as string;

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) return { error: "Cet email est déjà utilisé" };

  const passwordHash = await hashPassword(password || "Novavox2026!");

  await db.user.create({
    data: {
      firstName,
      lastName,
      companyName: "NOVAVOX",
      email,
      role,
      passwordHash,
      emailVerified: true,
      isActive: true,
    }
  });

  revalidatePath("/admin/team");
  return { success: true };
}

export async function updateTeamMember(formData: FormData) {
  const session = await getSession();
  if (!session || session.role !== "SUPER_ADMIN") return { error: "Non autorisé" };

  const id = formData.get("id") as string;
  const role = formData.get("role") as any;
  const isActive = formData.get("isActive") === "on";

  // Prevent super_admin from demoting themselves
  if (id === session.userId) return { error: "Vous ne pouvez pas modifier votre propre rôle ici." };

  await db.user.update({
    where: { id },
    data: { role, isActive }
  });

  revalidatePath("/admin/team");
  return { success: true };
}
