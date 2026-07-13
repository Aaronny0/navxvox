"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createService(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const icon = formData.get("icon") as string;
  const shortDesc = formData.get("shortDesc") as string;
  const longDesc = formData.get("longDesc") as string;
  const estimatedTime = formData.get("estimatedTime") as string;
  const priceRange = formData.get("priceRange") as string;
  const isActive = formData.get("isActive") === "on";

  await db.service.create({
    data: {
      title,
      slug,
      icon: icon || "✨",
      shortDesc,
      longDesc,
      estimatedTime: estimatedTime || null,
      priceRange: priceRange || null,
      isActive,
    }
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
}

export async function updateService(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const icon = formData.get("icon") as string;
  const shortDesc = formData.get("shortDesc") as string;
  const longDesc = formData.get("longDesc") as string;
  const estimatedTime = formData.get("estimatedTime") as string;
  const priceRange = formData.get("priceRange") as string;
  const isActive = formData.get("isActive") === "on";

  await db.service.update({
    where: { id },
    data: {
      title,
      slug,
      icon,
      shortDesc,
      longDesc,
      estimatedTime: estimatedTime || null,
      priceRange: priceRange || null,
      isActive,
    }
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
}

export async function deleteService(id: string) {
  await db.service.delete({ where: { id } });
  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
}
