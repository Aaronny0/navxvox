import Link from "next/link";
import { BlogForm } from "../../../components/BlogForm";

export default function NewBlogPostPage() {
  return (
    <div style={{ maxWidth: "1000px" }}>
      <div style={{ marginBottom: "2rem" }}>
        <Link href="/admin/blog" style={{ color: "var(--nv-text-secondary)", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Retour au blog
        </Link>
        <h1 style={{ fontSize: "2rem", marginTop: "0.5rem" }}>Créer un Article</h1>
      </div>
      <BlogForm />
    </div>
  );
}
