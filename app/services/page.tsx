import type { Metadata } from "next";
import { services, processSteps } from "@/lib/data";
import Link from "next/link";
import ServiceCard from "@/app/components/ServiceCard";
import TimelineStep from "@/app/components/TimelineStep";
import SectionHeading from "@/app/components/SectionHeading";
import ScrollReveal from "@/app/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Découvrez nos services : création de sites web, applications web, design UX/UI, e-commerce, SEO et maintenance. Solutions digitales premium sur mesure.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
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
          <span className="nv-badge" style={{ marginBottom: "1rem" }}>Nos Services</span>
          <h1 style={{ marginBottom: "1rem" }}>
            Des solutions <span className="nv-text-gradient">sur mesure</span>
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--nv-text-secondary)", maxWidth: "600px", margin: "0 auto" }}>
            De la conception à la mise en ligne, chaque projet bénéficie de notre expertise complète en développement web et design.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="nv-section">
        <div className="nv-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {services.map((service, i) => (
              <ScrollReveal key={service.id} delay={i * 80}>
                <div>
                  <ServiceCard service={service} index={i} />
                  {/* Features list */}
                  <div
                    style={{
                      marginTop: "1rem",
                      padding: "1.5rem",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid var(--nv-border-light)",
                      borderRadius: "var(--nv-radius-md)",
                    }}
                  >
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {service.features.map((f) => (
                        <li
                          key={f}
                          style={{
                            fontSize: "0.85rem",
                            color: "var(--nv-text-secondary)",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <span style={{ color: "var(--nv-accent-violet)", fontSize: "0.7rem" }}>✦</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="nv-section" style={{ background: "var(--nv-bg-secondary)" }}>
        <div className="nv-container">
          <ScrollReveal>
            <SectionHeading
              badge="Notre Processus"
              title="5 étapes vers votre succès"
              subtitle="Un processus éprouvé, transparent et collaboratif pour des projets livrés dans les temps."
            />
          </ScrollReveal>

          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 120}>
                <TimelineStep step={step} isLast={i === processSteps.length - 1} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "5rem 0",
          textAlign: "center",
          background: "linear-gradient(135deg, rgba(26,111,212,0.12) 0%, rgba(0,200,224,0.06) 100%)",
        }}
      >
        <div className="nv-container">
          <ScrollReveal>
            <h2 style={{ fontFamily: "Outfit, sans-serif", marginBottom: "1rem" }}>
              Un projet en tête ?
            </h2>
            <p style={{ color: "var(--nv-text-secondary)", maxWidth: "500px", margin: "0 auto 2rem" }}>
              Discutons de vos besoins lors d&apos;un appel gratuit de 30 minutes.
            </p>
            <Link href="/contact" className="nv-btn nv-btn-primary">
              Demander un devis gratuit →
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
