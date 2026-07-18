"use server";

import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function acceptBrief(briefId: string) {
  const session = await getSession();
  if (!session || session.role === "CLIENT") throw new Error("Action non autorisée");

  const project = await db.$transaction(async (tx) => {
    const brief = await tx.brief.findUnique({ where: { id: briefId } });
    if (!brief) throw new Error("Commande introuvable");
    if (brief.status !== "received") throw new Error("Cette commande a déjà été traitée");

    const createdProject = await tx.project.create({
      data: {
        clientId: brief.clientId,
        name: brief.projectName || `Projet ${brief.serviceType}`,
        serviceType: brief.serviceType,
        status: "pending",
      },
    });

    await tx.brief.update({
      where: { id: briefId },
      data: { status: "converted", reviewedAt: new Date(), refusalReason: null },
    });

    await tx.notification.create({
      data: {
        userId: brief.clientId,
        projectId: createdProject.id,
        type: "status_change",
        title: "Commande approuvée",
        body: `Bonne nouvelle : votre commande « ${createdProject.name} » est approuvée. Le projet est maintenant ouvert.`,
      },
    });

    return createdProject;
  });

  revalidatePath("/admin/briefs");
  revalidatePath("/admin/dashboard");
  revalidatePath("/client/dashboard");
  revalidatePath("/client/orders");
  revalidatePath("/client/projects");
  return project.id;
}

export async function refuseBrief(briefId: string, reason: string) {
  const session = await getSession();
  if (!session || session.role === "CLIENT") throw new Error("Action non autorisée");

  const cleanReason = reason.trim();
  if (cleanReason.length < 8) throw new Error("Le motif doit contenir au moins 8 caractères");

  await db.$transaction(async (tx) => {
    const brief = await tx.brief.findUnique({ where: { id: briefId } });
    if (!brief) throw new Error("Commande introuvable");
    if (brief.status !== "received") throw new Error("Cette commande a déjà été traitée");

    await tx.brief.update({
      where: { id: briefId },
      data: { status: "refused", refusalReason: cleanReason, reviewedAt: new Date() },
    });

    await tx.notification.create({
      data: {
        userId: brief.clientId,
        type: "status_change",
        title: "Commande à ajuster",
        body: `Votre demande « ${brief.projectName || brief.serviceType} » n’a pas été retenue en l’état. Motif : ${cleanReason}`,
      },
    });
  });

  revalidatePath("/admin/briefs");
  revalidatePath("/admin/dashboard");
  revalidatePath("/client/dashboard");
  revalidatePath("/client/orders");
}
