"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateSettings(formData: FormData) {
  const agencyName = formData.get("agencyName") as string;
  const agencyAddress = formData.get("agencyAddress") as string;
  const agencyEmail = formData.get("agencyEmail") as string;
  const agencyPhone = formData.get("agencyPhone") as string;
  const agencySiret = formData.get("agencySiret") as string;
  const defaultTva = parseFloat(formData.get("defaultTva") as string);

  // Assuming there's only one row with id = 1 or a specific ID
  // In our DB schema, id is a CUID. If we want a singleton, we need to find the first one or create it.
  
  const existing = await db.settings.findFirst();

  if (existing) {
    await db.settings.update({
      where: { id: existing.id },
      data: {
        agencyName,
        agencyAddress,
        agencyEmail,
        agencyPhone,
        agencySiret,
        defaultTva: isNaN(defaultTva) ? 0 : defaultTva,
      },
    });
  } else {
    await db.settings.create({
      data: {
        agencyName,
        agencyAddress,
        agencyEmail,
        agencyPhone,
        agencySiret,
        defaultTva: isNaN(defaultTva) ? 0 : defaultTva,
      }
    });
  }

  revalidatePath("/admin/settings");
}
