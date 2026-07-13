"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createBlogPost(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;
  const coverImage = formData.get("coverImage") as string;
  const isPublished = formData.get("isPublished") === "on";

  await db.blogPost.create({
    data: {
      title,
      slug,
      content,
      category: category || "Général",
      coverImage: coverImage || null,
      status: isPublished ? "published" : "draft",
      publishedAt: isPublished ? new Date() : null,
    }
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function updateBlogPost(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;
  const coverImage = formData.get("coverImage") as string;
  const isPublished = formData.get("isPublished") === "on";

  const post = await db.blogPost.findUnique({ where: { id } });
  
  await db.blogPost.update({
    where: { id },
    data: {
      title,
      slug,
      content,
      category: category || "Général",
      coverImage: coverImage || null,
      status: isPublished ? "published" : "draft",
      publishedAt: (isPublished && post?.status !== "published") ? new Date() : post?.publishedAt,
    }
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
}

export async function deleteBlogPost(id: string) {
  await db.blogPost.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
