"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function acceptBrief(briefId: string) {
  const brief = await db.brief.findUnique({ where: { id: briefId } });
  if (!brief) return;

  const project = await db.project.create({
    data: {
      clientId: brief.clientId,
      name: brief.projectName || `Projet ${brief.serviceType}`,
      serviceType: brief.serviceType,
      status: "pending",
    },
  });

  await db.brief.update({
    where: { id: briefId },
    data: { status: "converted" },
  });

  await db.notification.create({
    data: {
      userId: brief.clientId,
      projectId: project.id,
      type: "status_change",
      title: "Brief accepté",
      body: `Votre brief a été accepté et le projet "${project.name}" a été créé.`,
    }
  });

  revalidatePath("/admin/briefs");
  return project.id;
}

export async function refuseBrief(briefId: string, reason: string) {
  const brief = await db.brief.findUnique({ where: { id: briefId } });
  if (!brief) return;

  await db.brief.update({
    where: { id: briefId },
    data: { status: "refused" },
  });

  await db.notification.create({
    data: {
      userId: brief.clientId,
      type: "status_change",
      title: "Brief refusé",
      body: `Votre brief a été refusé. Motif : ${reason}`,
    }
  });

  revalidatePath("/admin/briefs");
}
