"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createInvoice(formData: FormData) {
  const clientId = formData.get("clientId") as string;
  const dueDate = formData.get("dueDate") as string;
  
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
      tvaRate: 20, // default
    };
  }).filter(line => line.description.trim() !== "");

  const client = await db.user.findUnique({ where: { id: clientId } });
  if (!client) return;

  const tvaRate = 20; // could be from settings
  const amountTTC = amountHT * (1 + tvaRate / 100);

  const count = await db.invoice.count();
  const number = `FAC-${new Date().getFullYear()}-${String(count + 1).padStart(4, "0")}`;

  const invoice = await db.invoice.create({
    data: {
      clientId,
      number,
      amountHT,
      tvaRate,
      amountTTC,
      status: "sent",
      dueDate: dueDate ? new Date(dueDate) : null,
      lines: {
        create: lineItems,
      }
    }
  });

  await db.notification.create({
    data: {
      userId: client.id,
      type: "invoice",
      title: "Nouvelle Facture reçue",
      body: `Une nouvelle facture d'un montant de ${amountTTC}€ est disponible.`,
    }
  });

  redirect("/admin/invoices");
}

export async function updateInvoiceStatus(invoiceId: string, status: string) {
  await db.invoice.update({
    where: { id: invoiceId },
    data: { 
      status,
      paidAt: status === "paid" ? new Date() : null,
    }
  });
  revalidatePath("/admin/invoices");
}

export async function sendInvoiceReminder(invoiceId: string) {
  const invoice = await db.invoice.findUnique({
    where: { id: invoiceId },
    include: { client: true }
  });

  if (!invoice) return;

  await db.notification.create({
    data: {
      userId: invoice.client.id,
      type: "invoice",
      title: "Rappel de Facture",
      body: `Ceci est un rappel concernant la facture n°${invoice.number} de ${invoice.amountTTC}€.`,
    }
  });
}

export async function deleteInvoice(invoiceId: string) {
  await db.invoice.delete({ where: { id: invoiceId } });
  revalidatePath("/admin/invoices");
}
