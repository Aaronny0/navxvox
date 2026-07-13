"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createQuote(formData: FormData) {
  const projectId = formData.get("projectId") as string;
  const validUntilStr = formData.get("validUntil") as string;
  
  const descriptions = formData.getAll("line_description") as string[];
  const quantities = formData.getAll("line_quantity").map(q => parseInt(q as string, 10));
  const unitPrices = formData.getAll("line_unitPriceHT").map(p => parseFloat(p as string));

  let amountHT = 0;
  const lineItems = descriptions.map((desc, i) => {
    const q = quantities[i] || 1;
    const p = unitPrices[i] || 0;
    amountHT += q * p;
    return {
      description: desc,
      quantity: q,
      unitPriceHT: p,
      tvaRate: 20,
    };
  }).filter(line => line.description.trim() !== "");

  const project = await db.project.findUnique({ where: { id: projectId } });
  if (!project) return;

  const count = await db.quote.count();
  const number = `DEV-${new Date().getFullYear()}-${String(count + 1).padStart(4, "0")}`;

  const validUntil = new Date(validUntilStr);
  const tvaRate = 20; // Example
  const amountTTC = amountHT * (1 + tvaRate / 100);

  const quote = await db.quote.create({
    data: {
      projectId,
      number,
      amountHT,
      tvaRate,
      amountTTC,
      validUntil,
      status: "pending",
      lines: {
        create: lineItems,
      }
    }
  });

  await db.notification.create({
    data: {
      userId: project.clientId,
      projectId: project.id,
      type: "quote",
      title: "Nouveau Devis disponible",
      body: `Un nouveau devis (${number}) d'un montant de ${amountTTC}€ a été émis pour votre projet "${project.name}".`,
    }
  });

  redirect("/admin/quotes");
}

export async function updateQuoteStatus(quoteId: string, status: string, refusalNote?: string) {
  await db.quote.update({
    where: { id: quoteId },
    data: { 
      status, 
      refusalNote: refusalNote || null,
      respondedAt: new Date()
    }
  });
  revalidatePath("/admin/quotes");
  // Would also trigger client notification
}

export async function sendQuoteReminder(quoteId: string) {
  const quote = await db.quote.findUnique({
    where: { id: quoteId },
    include: { project: true }
  });

  if (!quote) return;

  await db.notification.create({
    data: {
      userId: quote.project.clientId,
      projectId: quote.project.id,
      type: "quote",
      title: "Rappel de Devis",
      body: `Ceci est un rappel concernant le devis en attente pour le projet "${quote.project.name}".`,
    }
  });
}

export async function deleteQuote(quoteId: string) {
  await db.quote.delete({ where: { id: quoteId } });
  revalidatePath("/admin/quotes");
}
