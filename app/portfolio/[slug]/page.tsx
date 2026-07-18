import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { projects, getProjectBySlug, getRelatedProjects } from "@/lib/data";
import ProjectCard from "@/app/components/ProjectCard";
import ScrollReveal from "@/app/components/ScrollReveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Projet introuvable" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = getRelatedProjects(project);

  return (
    <>
      {/* Hero */}
      <section
        style={{
          paddingTop: "10rem",
          paddingBottom: "4rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="nv-orb nv-orb-violet" style={{ width: "500px", height: "500px", top: "-15%", right: "-10%" }} />
        <div className="nv-container" style={{ position: "relative", zIndex: 1 }}>
          <Link
            href="/portfolio"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "var(--nv-text-muted)",
              fontSize: "0.85rem",
              marginBottom: "2rem",
              textDecoration: "none",
              transition: "color 0.3s ease",
            }}
          >
            ← Retour au portfolio
          </Link>

          <span className="nv-badge" style={{ marginBottom: "1rem" }}>{project.category}</span>
          <h1 style={{ marginBottom: "0.5rem" }}>{project.title}</h1>
          <p style={{ fontSize: "1.1rem", color: "var(--nv-accent-violet)", fontWeight: 500, fontFamily: "Outfit, sans-serif" }}>
            {project.client}
          </p>
        </div>
      </section>

      {/* Image placeholder */}
      <section style={{ paddingBottom: "3rem" }}>
        <div className="nv-container">
          <div
            style={{
              height: "400px",
              borderRadius: "var(--nv-radius-lg)",
              background: `linear-gradient(135deg, rgba(13,61,102,0.48) 0%, rgba(46,196,182,0.12) 50%, rgba(6,26,43,0.94) 100%)`,
              border: "1px solid var(--nv-border-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                fontSize: "6rem",
                opacity: 0.15,
                fontFamily: "Outfit, sans-serif",
                fontWeight: 900,
              }}
            >
              {project.title}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="nv-section" style={{ paddingTop: "2rem" }}>
        <div className="nv-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 320px",
              gap: "3rem",
              alignItems: "start",
            }}
            className="project-detail-grid"
          >
            {/* Main */}
            <div>
              <ScrollReveal>
                <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.5rem", marginBottom: "1rem" }}>
                  À propos du projet
                </h2>
                <p style={{ fontSize: "1rem", lineHeight: 1.9, color: "var(--nv-text-secondary)" }}>
                  {project.longDescription}
                </p>
              </ScrollReveal>

              {project.results && (
                <ScrollReveal delay={100}>
                  <div style={{ marginTop: "2.5rem" }}>
                    <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.25rem", marginBottom: "1rem" }}>
                      Résultats
                    </h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                      {project.results.map((r) => (
                        <div
                          key={r}
                          style={{
                            padding: "1rem 1.5rem",
                            background: "rgba(46,196,182,0.09)",
                            border: "1px solid rgba(46,196,182,0.24)",
                            borderRadius: "var(--nv-radius-md)",
                            fontFamily: "Outfit, sans-serif",
                            fontWeight: 600,
                            fontSize: "0.95rem",
                            color: "var(--nv-text-primary)",
                          }}
                        >
                          {r}
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}
            </div>

            {/* Sidebar */}
            <aside>
              <div
                className="nv-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                {[
                  { label: "Client", value: project.client },
                  { label: "Catégorie", value: project.category },
                  { label: "Année", value: String(project.year) },
                ].map((item) => (
                  <div key={item.label}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--nv-text-muted)", textTransform: "uppercase" as const, letterSpacing: "0.08em", fontFamily: "Outfit, sans-serif" }}>
                      {item.label}
                    </span>
                    <p style={{ fontSize: "0.95rem", color: "var(--nv-text-primary)", fontWeight: 500, margin: "0.25rem 0 0" }}>
                      {item.value}
                    </p>
                  </div>
                ))}
                <div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--nv-text-muted)", textTransform: "uppercase" as const, letterSpacing: "0.08em", fontFamily: "Outfit, sans-serif" }}>
                    Technologies
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginTop: "0.5rem" }}>
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        style={{
                          padding: "0.25rem 0.625rem",
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid var(--nv-border-light)",
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                          color: "var(--nv-text-secondary)",
                          fontFamily: "monospace",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nv-btn nv-btn-primary"
                    style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
                  >
                    Voir le site →
                  </a>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="nv-section" style={{ background: "var(--nv-bg-secondary)" }}>
          <div className="nv-container">
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.5rem", marginBottom: "2rem", textAlign: "center" }}>
              Projets similaires
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
                gap: "1.5rem",
              }}
            >
              {related.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        @media (max-width: 768px) {
          .project-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
