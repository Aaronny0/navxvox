"use client";

import { useState } from "react";
import type { Project } from "@/lib/data";
import type { GraphicCreation } from "@/lib/creations";
import GraphicGallery from "./GraphicGallery";
import ProjectCard from "./ProjectCard";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import styles from "./PortfolioShowcase.module.css";

type PortfolioView = "digital" | "graphic";

interface PortfolioShowcaseProps {
  projects: Project[];
  creations: GraphicCreation[];
}

export default function PortfolioShowcase({ projects, creations }: PortfolioShowcaseProps) {
  const [activeView, setActiveView] = useState<PortfolioView>("digital");

  return (
    <section className={`nv-section ${styles.showcase}`}>
      <div className="nv-container">
        <div className={styles.tabsWrap}>
          <div className={styles.tabs} role="tablist" aria-label="Filtrer les réalisations">
            <button
              type="button"
              id="portfolio-tab-digital"
              className={`${styles.tab} ${activeView === "digital" ? styles.tabActive : ""}`}
              role="tab"
              aria-selected={activeView === "digital"}
              aria-controls="portfolio-panel-digital"
              onClick={() => setActiveView("digital")}
            >
              Sites & applications
            </button>
            <button
              type="button"
              id="portfolio-tab-graphic"
              className={`${styles.tab} ${activeView === "graphic" ? styles.tabActive : ""}`}
              role="tab"
              aria-selected={activeView === "graphic"}
              aria-controls="portfolio-panel-graphic"
              onClick={() => setActiveView("graphic")}
            >
              Créations graphiques
            </button>
          </div>
        </div>

        {activeView === "digital" ? (
          <div
            id="portfolio-panel-digital"
            className={styles.panel}
            role="tabpanel"
            aria-labelledby="portfolio-tab-digital"
          >
            <ScrollReveal>
              <SectionHeading
                badge="Solutions digitales"
                title="Sites et applications réalisés"
                subtitle="Découvrez des expériences digitales pensées pour répondre aux objectifs de chaque activité."
              />
            </ScrollReveal>
            <div className={styles.projectsGrid}>
              {projects.map((project, index) => (
                <ScrollReveal key={project.id} delay={index * 80}>
                  <ProjectCard project={project} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        ) : (
          <div
            id="portfolio-panel-graphic"
            className={styles.panel}
            role="tabpanel"
            aria-labelledby="portfolio-tab-graphic"
          >
            <ScrollReveal>
              <SectionHeading
                badge="Communication visuelle"
                title="Créations graphiques"
                subtitle="Affiches, packagings et supports conçus par notre équipe créative."
              />
            </ScrollReveal>
            <GraphicGallery creations={creations} />
          </div>
        )}
      </div>
    </section>
  );
}
