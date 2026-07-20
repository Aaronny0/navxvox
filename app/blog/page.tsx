"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { blogCategories, blogPosts, getBlogPostsByCategory, searchBlogPosts } from "@/lib/data";
import ScrollReveal from "@/app/components/ScrollReveal";
import styles from "./blog.module.css";

export default function BlogPage() {
  const [category, setCategory] = useState("Tous");
  const [search, setSearch] = useState("");
  const filtered = search ? searchBlogPosts(search) : getBlogPostsByCategory(category);
  const featured = blogPosts.find((post) => post.featured) ?? blogPosts[0];

  return (
    <main className={styles.blogPage}>
      <section className={styles.blogHero}>
        <div className={`nv-container ${styles.blogHeroGrid}`}>
          <div className={styles.blogHeroCopy}>
            <span className={styles.eyebrow}>Le journal NOVAVOX</span>
            <h1>Des idées pour faire<br />grandir votre marque.</h1>
            <p>
              Design, stratégie, technologie et retours d’expérience expliqués
              simplement par notre studio.
            </p>
          </div>

          <Link href={`/blog/${featured.slug}`} className={styles.featuredCard}>
            <Image
              src={featured.image}
              alt={`Illustration de l'article : ${featured.title}`}
              fill
              preload
              sizes="(max-width: 820px) 100vw, 48vw"
              className={styles.blogImage}
            />
            <span className={styles.featuredOverlay} />
            <span className={styles.featuredContent}>
              <small>À la une · {featured.category}</small>
              <strong>{featured.title}</strong>
              <i>Lire l’article <b aria-hidden="true">↗</b></i>
            </span>
          </Link>
        </div>
      </section>

      <section className={styles.blogContent}>
        <div className="nv-container">
          <div className={styles.toolsRow}>
            <label className={styles.searchField} htmlFor="blog-search">
              <span aria-hidden="true">⌕</span>
              <input
                id="blog-search"
                type="search"
                placeholder="Rechercher un article"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>

            {!search && (
              <div className={styles.filters} aria-label="Filtrer les articles">
                {blogCategories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    className={category === item ? styles.filterActive : undefined}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={styles.articleGrid}>
            {filtered.map((post, index) => (
              <ScrollReveal key={post.id} delay={index * 60}>
                <Link href={`/blog/${post.slug}`} className={styles.articleCard}>
                  <div className={styles.articleImageWrap}>
                    <Image
                      src={post.image}
                      alt={`Illustration de l'article : ${post.title}`}
                      fill
                      sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 33vw"
                      className={styles.blogImage}
                    />
                  </div>
                  <div className={styles.articleMeta}>
                    <span>{post.category}</span>
                    <small>{post.readTime} min de lecture</small>
                  </div>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <div className={styles.articleFooter}>
                    <span>{post.authorAvatar}</span>
                    <small>{post.author}</small>
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
                    </time>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className={styles.emptyState}>Aucun article ne correspond à votre recherche.</p>
          )}
        </div>
      </section>
    </main>
  );
}
