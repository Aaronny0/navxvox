"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createPortfolioProject(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const category = formData.get("category") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const description = formData.get("description") as string;
  const clientName = formData.get("clientName") as string;
  const isPublished = formData.get("isPublished") === "on";

  await db.portfolioProject.create({
    data: {
      title,
      slug,
      category,
      images: JSON.stringify([imageUrl]),
      description,
      clientName: clientName || null,
      isPublished,
    }
  });

  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
  revalidatePath("/");
}

export async function updatePortfolioProject(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const category = formData.get("category") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const description = formData.get("description") as string;
  const clientName = formData.get("clientName") as string;
  const isPublished = formData.get("isPublished") === "on";

  await db.portfolioProject.update({
    where: { id },
    data: {
      title,
      slug,
      category,
      images: JSON.stringify([imageUrl]),
      description,
      clientName: clientName || null,
      isPublished,
    }
  });

  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
  revalidatePath("/");
}

export async function deletePortfolioProject(id: string) {
  await db.portfolioProject.delete({ where: { id } });
  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
  revalidatePath("/");
}
