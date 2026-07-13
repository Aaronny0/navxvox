import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BlogForm } from "../../../components/BlogForm";

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const post = await db.blogPost.findUnique({
    where: { id }
  });

  if (!post) notFound();

  return (
    <div style={{ maxWidth: "1000px" }}>
      <div style={{ marginBottom: "2rem" }}>
        <Link href="/admin/blog" style={{ color: "var(--nv-text-secondary)", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Retour au blog
        </Link>
        <h1 style={{ fontSize: "2rem", marginTop: "0.5rem" }}>Modifier l'Article</h1>
      </div>
      <BlogForm post={post} />
    </div>
  );
}
