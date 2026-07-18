import type { Metadata } from "next";
import { projects } from "@/lib/data";
import { graphicCreations } from "@/lib/creations";
import GraphicGallery from "@/app/components/GraphicGallery";
import ProjectCard from "@/app/components/ProjectCard";
import SectionHeading from "@/app/components/SectionHeading";
import ScrollReveal from "@/app/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Nos réalisations",
  description:
    "Découvrez les sites web, applications, boutiques en ligne et créations graphiques réalisés par NOVAVOX.",
};

export default function PortfolioPage() {
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
        <div
          className="nv-orb nv-orb-cyan"
          style={{ width: "400px", height: "400px", top: "-10%", left: "-5%" }}
        />
        <div className="nv-container" style={{ position: "relative", zIndex: 1 }}>
          <span className="nv-badge" style={{ marginBottom: "1rem" }}>
            Portfolio
          </span>
          <h1 style={{ marginBottom: "1rem" }}>
            Nos <span className="nv-text-gradient">réalisations</span>
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--nv-text-secondary)",
              maxWidth: "680px",
              margin: "0 auto",
            }}
          >
            Sites web, applications, boutiques en ligne et créations graphiques conçus avec soin par notre équipe.
          </p>
        </div>
      </section>

      <section className="nv-section" style={{ paddingTop: "2rem" }}>
        <div className="nv-container">
          <ScrollReveal>
            <SectionHeading
              badge="Solutions digitales"
              title="Sites et applications réalisés"
              subtitle="Découvrez des expériences digitales pensées pour répondre aux objectifs de chaque activité."
            />
          </ScrollReveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
              gap: "1.5rem",
            }}
          >
            {projects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 80}>
                <ProjectCard project={project} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="nv-section" style={{ background: "var(--nv-bg-secondary)" }}>
        <div className="nv-container">
          <ScrollReveal>
            <SectionHeading
              badge="Communication visuelle"
              title="Créations graphiques"
              subtitle="Affiches, packagings et supports conçus par notre équipe créative."
            />
          </ScrollReveal>
          <GraphicGallery creations={graphicCreations} />
        </div>
      </section>
    </>
  );
}
