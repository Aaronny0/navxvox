import { db } from "@/lib/db";
import Link from "next/link";
import { deleteBlogPost } from "../../actions/blog";
import Image from "next/image";

export default async function AdminBlogPage() {
  const posts = await db.blogPost.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem" }}>Gestion du Blog</h1>
        <Link href="/admin/blog/new" className="nv-btn nv-btn-primary">
          + Nouvel Article
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
        {posts.map((post) => (
          <div key={post.id} className="nv-card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ width: "100%", height: "200px", position: "relative", background: "rgba(255,255,255,0.05)" }}>
              {post.coverImage ? (
                <Image src={post.coverImage} alt={post.title} fill style={{ objectFit: "cover" }} />
              ) : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--nv-text-muted)" }}>Sans image</div>
              )}
            </div>
            <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--nv-accent-violet)", fontWeight: 600, textTransform: "uppercase" }}>
                  {post.category || "Général"}
                </span>
                <span className="nv-badge" style={{ background: post.status === "published" ? "rgba(16, 185, 129, 0.1)" : "rgba(245, 158, 11, 0.1)", color: post.status === "published" ? "#10b981" : "#f59e0b" }}>
                  {post.status === "published" ? "Publié" : "Brouillon"}
                </span>
              </div>
              <h3 style={{ fontSize: "1.25rem", margin: "0 0 0.5rem" }}>{post.title}</h3>
              <p style={{ color: "var(--nv-text-secondary)", fontSize: "0.85rem", marginBottom: "1rem" }}>
                Créé le {new Date(post.createdAt).toLocaleDateString()}
              </p>
              
              <div style={{ display: "flex", gap: "0.5rem", borderTop: "1px solid var(--nv-border-light)", paddingTop: "1rem", marginTop: "auto" }}>
                <Link 
                  href={`/admin/blog/${post.id}`} 
                  className="nv-btn" 
                  style={{ flex: 1, justifyContent: "center", padding: "0.5rem", fontSize: "0.85rem", background: "rgba(255,255,255,0.05)" }}
                >
                  Modifier
                </Link>
                <form action={async () => { "use server"; await deleteBlogPost(post.id); }} style={{ flex: 1, display: "flex" }}>
                  <button 
                    type="submit" 
                    className="nv-btn" 
                    style={{ flex: 1, padding: "0.5rem", fontSize: "0.85rem", background: "rgba(239, 68, 68, 0.1)", color: "#ef4444" }}
                  >
                    Supprimer
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
      {posts.length === 0 && (
        <div className="nv-card" style={{ textAlign: "center", padding: "3rem" }}>
          <p style={{ color: "var(--nv-text-muted)" }}>Aucun article sur le blog.</p>
        </div>
      )}
    </div>
  );
}
