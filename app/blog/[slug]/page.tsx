import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts, getBlogPostBySlug, getRelatedBlogPosts } from "@/lib/data";
import ScrollReveal from "@/app/components/ScrollReveal";
import styles from "../blog.module.css";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
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
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: [{ url: post.image, alt: `Illustration de l'article : ${post.title}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
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
  const slugifyHeading = (value: string) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  const headings = post.content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("## "))
    .map((line) => line.slice(3));
  const contentHtml = post.content
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("## ")) {
        const heading = trimmed.slice(3);
        return `<h2 id="${slugifyHeading(heading)}">${heading}</h2>`;
      }
      if (trimmed.startsWith("# ")) return `<h1>${trimmed.slice(2)}</h1>`;
      if (trimmed === "") return "";
      return `<p>${trimmed}</p>`;
    })
    .join("");

  return (
    <main className={styles.articlePage}>
      <section className={styles.detailHero}>
        <div className={`nv-container ${styles.detailHeader}`}>
          <Link href="/blog" className={styles.backLink}>← Retour au journal</Link>
          <div className={styles.detailMeta}>
            <strong>{post.category}</strong>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
            </time>
            <span>·</span>
            <span>{post.readTime} min de lecture</span>
          </div>
          <h1>{post.title}</h1>
          <div className={styles.authorRow}>
            <span className={styles.authorAvatar}>{post.authorAvatar}</span>
            <div>
              <strong>{post.author}</strong>
              <small>{post.authorRole}</small>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.detailImageSection}>
        <div className="nv-container">
          <div className={styles.detailImageWrap}>
            <Image
              src={post.image}
              alt={`Illustration de l'article : ${post.title}`}
              fill
              preload
              sizes="(max-width: 1280px) 100vw, 1280px"
              className={styles.blogImage}
            />
          </div>
        </div>
      </section>

      <section className={styles.articleBody}>
        <div className={`nv-container ${styles.articleLayout}`}>
          <aside className={styles.articleAside}>
            <div>
              <span>Dans cet article</span>
              <nav aria-label="Sommaire de l'article">
                {headings.map((heading) => (
                  <a key={heading} href={`#${slugifyHeading(heading)}`}>{heading}</a>
                ))}
              </nav>
              <small>Publié par {post.author}<br />{post.readTime} minutes de lecture</small>
            </div>
          </aside>

          <div className={styles.articleBodyInner}>
            <p className={styles.articleLead}>{post.excerpt}</p>
            <ScrollReveal>
              <div className={styles.articleProse} dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </ScrollReveal>
            <div className={styles.tags}>
              {post.tags.map((tag) => <span key={tag}>#{tag}</span>)}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className={styles.relatedSection}>
          <div className="nv-container">
            <h2>À lire ensuite</h2>
            <div className={styles.relatedGrid}>
              {related.map((item) => (
                <Link key={item.id} href={`/blog/${item.slug}`} className={styles.relatedCard}>
                  <div className={styles.relatedImageWrap}>
                    <Image
                      src={item.image}
                      alt={`Illustration de l'article : ${item.title}`}
                      fill
                      sizes="(max-width: 700px) 100vw, 33vw"
                      className={styles.blogImage}
                    />
                  </div>
                  <span>{item.category}</span>
                  <h3>{item.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
