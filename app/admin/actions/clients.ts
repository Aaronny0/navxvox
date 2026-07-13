"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function toggleClientStatus(clientId: string, isActive: boolean) {
  await db.user.update({
    where: { id: clientId },
    data: { isActive },
  });
  
  revalidatePath("/admin/clients");
}
