import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts, getBlogPostBySlug, getRelatedBlogPosts } from "@/lib/data";
import ScrollReveal from "@/app/components/ScrollReveal";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Article introuvable" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedBlogPosts(post);

  // Simple markdown-to-html: headers and paragraphs
  const contentHtml = post.content
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("## "))
        return `<h2 style="font-family:Outfit,sans-serif;font-size:1.5rem;font-weight:700;margin:2rem 0 1rem;color:var(--nv-text-primary)">${trimmed.slice(3)}</h2>`;
      if (trimmed.startsWith("# "))
        return `<h1 style="font-family:Outfit,sans-serif;font-size:2rem;font-weight:800;margin:0 0 1.5rem;color:var(--nv-text-primary)">${trimmed.slice(2)}</h1>`;
      if (trimmed === "") return "";
      return `<p style="color:var(--nv-text-secondary);line-height:1.9;margin-bottom:1rem">${trimmed}</p>`;
    })
    .join("");

  return (
    <>
      {/* Hero */}
      <section
        style={{
          paddingTop: "10rem",
          paddingBottom: "3rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="nv-orb nv-orb-violet" style={{ width: "400px", height: "400px", top: "-10%", right: "-5%" }} />
        <div className="nv-container" style={{ position: "relative", zIndex: 1, maxWidth: "800px" }}>
          <Link
            href="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "var(--nv-text-muted)",
              fontSize: "0.85rem",
              marginBottom: "2rem",
              textDecoration: "none",
            }}
          >
            ← Retour au blog
          </Link>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap" }}>
            <span className="nv-badge">{post.category}</span>
            <span style={{ fontSize: "0.8rem", color: "var(--nv-text-muted)" }}>
              {new Date(post.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            <span style={{ fontSize: "0.8rem", color: "var(--nv-text-muted)" }}>· {post.readTime} min de lecture</span>
          </div>
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", marginBottom: "1.5rem", lineHeight: 1.2 }}>
            {post.title}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "var(--nv-grad-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "0.8rem",
                color: "#fff",
              }}
            >
              {post.authorAvatar}
            </div>
            <div>
              <p style={{ fontSize: "0.9rem", color: "var(--nv-text-primary)", fontWeight: 600, margin: 0 }}>{post.author}</p>
              <p style={{ fontSize: "0.8rem", color: "var(--nv-text-muted)", margin: 0 }}>{post.authorRole}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Image */}
      <section style={{ paddingBottom: "2rem" }}>
        <div className="nv-container" style={{ maxWidth: "800px" }}>
          <div
            style={{
              height: "300px",
              borderRadius: "var(--nv-radius-lg)",
              background: "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(34,211,238,0.08) 100%)",
              border: "1px solid var(--nv-border-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "4rem", opacity: 0.2 }}>📝</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="nv-section" style={{ paddingTop: "1rem" }}>
        <div className="nv-container" style={{ maxWidth: "800px" }}>
          <ScrollReveal>
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </ScrollReveal>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--nv-border-light)" }}>
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "0.375rem 0.875rem",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--nv-border-light)",
                  borderRadius: "100px",
                  fontSize: "0.8rem",
                  color: "var(--nv-text-secondary)",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="nv-section" style={{ background: "var(--nv-bg-secondary)" }}>
          <div className="nv-container">
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.5rem", marginBottom: "2rem", textAlign: "center" }}>
              Articles similaires
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {related.map((r) => (
                <Link key={r.id} href={`/blog/${r.slug}`} style={{ textDecoration: "none" }}>
                  <div className="nv-card">
                    <div style={{ position: "relative", zIndex: 1 }}>
                      <span className="nv-badge" style={{ marginBottom: "0.75rem" }}>{r.category}</span>
                      <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--nv-text-primary)" }}>
                        {r.title}
                      </h3>
                      <p style={{ fontSize: "0.85rem", color: "var(--nv-text-secondary)", margin: 0, lineHeight: 1.7 }}>
                        {r.excerpt.substring(0, 120)}…
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
