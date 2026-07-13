"use client";

import { useState } from "react";
import { projects, projectCategories, getProjectsByCategory } from "@/lib/data";
import ProjectCard from "@/app/components/ProjectCard";
import PortfolioFilter from "@/app/components/PortfolioFilter";
import SectionHeading from "@/app/components/SectionHeading";
import ScrollReveal from "@/app/components/ScrollReveal";

export default function PortfolioPage() {
  const [category, setCategory] = useState("Tous");
  const filtered = getProjectsByCategory(category);

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
        <div className="nv-orb nv-orb-cyan" style={{ width: "400px", height: "400px", top: "-10%", left: "-5%" }} />
        <div className="nv-container" style={{ position: "relative", zIndex: 1 }}>
          <span className="nv-badge" style={{ marginBottom: "1rem" }}>Portfolio</span>
          <h1 style={{ marginBottom: "1rem" }}>
            Nos <span className="nv-text-gradient">réalisations</span>
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--nv-text-secondary)", maxWidth: "600px", margin: "0 auto" }}>
            Chaque projet raconte une histoire de collaboration, d&apos;innovation et de résultats concrets.
          </p>
        </div>
      </section>

      <section className="nv-section" style={{ paddingTop: "2rem" }}>
        <div className="nv-container">
          <PortfolioFilter
            categories={projectCategories}
            activeCategory={category}
            onCategoryChange={setCategory}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {filtered.map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 80}>
                <ProjectCard project={project} />
              </ScrollReveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <p style={{ textAlign: "center", color: "var(--nv-text-muted)", padding: "3rem 0" }}>
              Aucun projet dans cette catégorie pour l&apos;instant.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
