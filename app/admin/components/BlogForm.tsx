"use client";

import { useState } from "react";
import { TiptapEditor } from "./TiptapEditor";
import { createBlogPost, updateBlogPost } from "../actions/blog";
import { useRouter } from "next/navigation";

type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  coverImage: string | null;
  status: string;
};

export function BlogForm({ post }: { post?: Post }) {
  const [content, setContent] = useState(post?.content || "");
  const router = useRouter();

  return (
    <form action={async (formData) => {
      formData.append("content", content);
      if (post) {
        await updateBlogPost(formData);
      } else {
        await createBlogPost(formData);
      }
      router.push("/admin/blog");
    }} className="nv-card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {post && <input type="hidden" name="id" value={post.id} />}
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        <div>
          <label className="nv-label">Titre</label>
          <input type="text" name="title" className="nv-input" required defaultValue={post?.title} />
        </div>
        <div>
          <label className="nv-label">Slug (ex: mon-super-article)</label>
          <input type="text" name="slug" className="nv-input" required defaultValue={post?.slug} />
        </div>
        <div>
          <label className="nv-label">Catégorie</label>
          <input type="text" name="category" className="nv-input" defaultValue={post?.category || "Général"} />
        </div>
        <div>
          <label className="nv-label">Image URL (Cover)</label>
          <input type="url" name="coverImage" className="nv-input" defaultValue={post?.coverImage || ""} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "1.5rem" }}>
          <input type="checkbox" name="isPublished" id="isPublished" defaultChecked={post?.status === "published"} />
          <label htmlFor="isPublished">Publier immédiatement</label>
        </div>
      </div>

      <div>
        <label className="nv-label">Contenu (WYSIWYG)</label>
        <TiptapEditor content={content} onChange={setContent} />
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
        <button type="button" className="nv-btn" onClick={() => router.push("/admin/blog")}>Annuler</button>
        <button type="submit" className="nv-btn nv-btn-primary">
          {post ? "Enregistrer les modifications" : "Créer l'article"}
        </button>
      </div>
    </form>
  );
}
