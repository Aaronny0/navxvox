"use client";

import { useState } from "react";
import Link from "next/link";
import { blogPosts, blogCategories, getBlogPostsByCategory, searchBlogPosts } from "@/lib/data";
import BlogSearch from "@/app/components/BlogSearch";
import PortfolioFilter from "@/app/components/PortfolioFilter";
import ScrollReveal from "@/app/components/ScrollReveal";

export default function BlogPage() {
  const [category, setCategory] = useState("Tous");
  const [search, setSearch] = useState("");

  const filtered = search
    ? searchBlogPosts(search)
    : getBlogPostsByCategory(category);

  return (
    <>
      <section
        style={{
          paddingTop: "10rem",
          paddingBottom: "4rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="nv-orb nv-orb-violet" style={{ width: "400px", height: "400px", top: "-10%", right: "-5%" }} />
        <div className="nv-container" style={{ position: "relative", zIndex: 1 }}>
          <span className="nv-badge" style={{ marginBottom: "1rem" }}>Blog</span>
          <h1 style={{ marginBottom: "1rem" }}>
            Insights & <span className="nv-text-gradient">Actualités</span>
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--nv-text-secondary)", maxWidth: "600px", margin: "0 auto 2rem" }}>
            Tendances, bonnes pratiques et retours d&apos;expérience pour booster votre présence digitale.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <BlogSearch value={search} onChange={setSearch} />
          </div>
        </div>
      </section>

      <section className="nv-section" style={{ paddingTop: "2rem" }}>
        <div className="nv-container">
          {!search && (
            <PortfolioFilter
              categories={blogCategories}
              activeCategory={category}
              onCategoryChange={setCategory}
            />
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {filtered.map((post, i) => (
              <ScrollReveal key={post.id} delay={i * 80}>
                <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                  <article className="nv-card" style={{ padding: 0, overflow: "hidden", height: "100%", display: "flex", flexDirection: "column" }}>
                    {/* Image */}
                    <div
                      style={{
                        height: "200px",
                        background: `linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(${
                          post.categorySlug === "design" ? "236,72,153" : post.categorySlug === "developpement" ? "99,102,241" : "34,211,238"
                        },0.1) 100%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                      }}
                    >
                      <span style={{ fontSize: "3rem", opacity: 0.3 }}>📝</span>
                      <span
                        className="nv-badge"
                        style={{ position: "absolute", top: "1rem", left: "1rem" }}
                      >
                        {post.category}
                      </span>
                    </div>
                    {/* Content */}
                    <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem", fontSize: "0.8rem", color: "var(--nv-text-muted)" }}>
                        <span>{new Date(post.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</span>
                        <span>·</span>
                        <span>{post.readTime} min de lecture</span>
                      </div>
                      <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--nv-text-primary)", lineHeight: 1.4 }}>
                        {post.title}
                      </h3>
                      <p style={{ fontSize: "0.85rem", color: "var(--nv-text-secondary)", lineHeight: 1.7, margin: 0, flex: 1 }}>
                        {post.excerpt}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--nv-border-light)" }}>
                        <div
                          style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            background: "var(--nv-grad-primary)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.6rem",
                            fontWeight: 700,
                            color: "#fff",
                          }}
                        >
                          {post.authorAvatar}
                        </div>
                        <span style={{ fontSize: "0.8rem", color: "var(--nv-text-secondary)" }}>{post.author}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <p style={{ textAlign: "center", color: "var(--nv-text-muted)", padding: "3rem 0" }}>
              Aucun article trouvé.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
