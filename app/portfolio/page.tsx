import type { Metadata } from "next";
import { projects } from "@/lib/data";
import { graphicCreations } from "@/lib/creations";
import PortfolioShowcase from "@/app/components/PortfolioShowcase";

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

      <PortfolioShowcase projects={projects} creations={graphicCreations} />
    </>
  );
}
