import type { Metadata } from "next";
import { graphicCreations } from "@/lib/creations";
import GraphicGallery from "@/app/components/GraphicGallery";

export const metadata: Metadata = {
  title: "Réalisations graphiques",
  description:
    "Découvrez les affiches, packagings, identités visuelles et supports de communication réalisés par NOVAVOX.",
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
            Affiches, packagings et supports de communication conçus avec soin par notre équipe créative.
          </p>
        </div>
      </section>

      <section className="nv-section" style={{ paddingTop: "2rem" }}>
        <div className="nv-container">
          <GraphicGallery creations={graphicCreations} />
        </div>
      </section>
    </>
  );
}
