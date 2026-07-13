"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";

export async function updateProject(formData: FormData) {
  const session = await getSession();
  if (!session || session.role === "CLIENT") return;

  const projectId = formData.get("projectId") as string;
  const status = formData.get("status") as string;
  const progress = parseInt(formData.get("progress") as string, 10);
  const assignedTo = formData.get("assignedTo") as string;
  const estimatedAt = formData.get("estimatedAt") as string;
  const finalLink = formData.get("finalLink") as string;

  const data: any = {
    status,
    progress: isNaN(progress) ? 0 : progress,
    assignedTo: assignedTo || null,
    finalDeliverableLink: finalLink || null,
  };

  if (estimatedAt) {
    data.estimatedAt = new Date(estimatedAt);
  }

  if (status === "delivered") {
    data.deliveredAt = new Date();
  } else {
    data.deliveredAt = null;
  }

  await db.project.update({
    where: { id: projectId },
    data,
  });

  // Notify client if delivered
  if (status === "delivered") {
    const project = await db.project.findUnique({ where: { id: projectId } });
    if (project) {
      await db.notification.create({
        data: {
          userId: project.clientId,
          projectId: project.id,
          type: "status_change",
          title: "Projet Livré 🎉",
          body: `Votre projet "${project.name}" a été livré. Vous pouvez consulter les livrables.`,
        }
      });
    }
  }

  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath("/admin/projects");
}

export async function sendProjectMessage(formData: FormData) {
  const session = await getSession();
  if (!session || session.role === "CLIENT") return;

  const projectId = formData.get("projectId") as string;
  const content = formData.get("content") as string;

  if (!content.trim()) return;

  await db.projectMessage.create({
    data: {
      projectId,
      senderId: session.userId,
      senderType: "admin",
      content: content.trim(),
    }
  });

  const project = await db.project.findUnique({ where: { id: projectId } });
  if (project) {
    await db.notification.create({
      data: {
        userId: project.clientId,
        projectId: project.id,
        type: "message",
        title: "Nouveau message de l'équipe",
        body: `Vous avez reçu un message pour le projet "${project.name}".`,
      }
    });
  }

  revalidatePath(`/admin/projects/${projectId}`);
}
