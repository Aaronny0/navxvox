import type { Metadata } from "next";
import Link from "next/link";
import { teamMembers, stats } from "@/lib/data";
import AnimatedCounter from "@/app/components/AnimatedCounter";
import SectionHeading from "@/app/components/SectionHeading";
import ScrollReveal from "@/app/components/ScrollReveal";

export const metadata: Metadata = {
  title: "À Propos",
  description:
    "Découvrez NOVAVOX : notre histoire, notre mission, nos valeurs et l'équipe passionnée derrière vos projets web.",
};

const values = [
  { icon: "💡", title: "Créativité", description: "Des designs uniques qui captent l'attention et marquent les esprits." },
  { icon: "🎯", title: "Professionnalisme", description: "Rigueur, transparence et respect des engagements à chaque étape." },
  { icon: "⭐", title: "Excellence", description: "Un souci du détail obsessionnel pour des résultats qui dépassent les attentes." },
  { icon: "🔒", title: "Confidentialité", description: "Protection totale de vos données et de vos idées. NDA disponible." },
];

export default function AProposPage() {
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
        <div className="nv-orb nv-orb-pink" style={{ width: "400px", height: "400px", top: "-10%", left: "10%" }} />
        <div className="nv-container" style={{ position: "relative", zIndex: 1 }}>
          <span className="nv-badge" style={{ marginBottom: "1rem" }}>À Propos</span>
          <h1 style={{ marginBottom: "1rem" }}>
            L&apos;agence web qui <span className="nv-text-gradient">fait la différence</span>
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--nv-text-secondary)", maxWidth: "640px", margin: "0 auto" }}>
            Fondée par des passionnés du digital, NOVAVOX accompagne les entreprises ambitieuses dans leur transformation numérique depuis 5 ans.
          </p>
        </div>
      </section>

      {/* Histoire & Mission */}
      <section className="nv-section">
        <div className="nv-container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", alignItems: "center" }}>
            <ScrollReveal>
              <div>
                <span className="nv-badge" style={{ marginBottom: "1rem" }}>Notre Histoire</span>
                <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(1.5rem, 3vw, 2.25rem)", marginBottom: "1rem" }}>
                  Née de la passion, forgée par l&apos;exigence
                </h2>
                <p style={{ color: "var(--nv-text-secondary)", lineHeight: 1.9, marginBottom: "1rem" }}>
                  NOVAVOX est née d&apos;un constat simple : trop de projets web ne sont pas à la hauteur des ambitions de leurs commanditaires. Nous avons décidé de changer la donne.
                </p>
                <p style={{ color: "var(--nv-text-secondary)", lineHeight: 1.9 }}>
                  Notre mission est de concevoir des expériences digitales qui allient beauté, performance et résultats concrets. Chaque pixel compte. Chaque ligne de code a un objectif.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div
                style={{
                  height: "360px",
                  borderRadius: "var(--nv-radius-lg)",
                  background: "linear-gradient(135deg, rgba(26,111,212,0.22) 0%, rgba(0,200,224,0.1) 50%, rgba(10,14,26,0.9) 100%)",
                  border: "1px solid var(--nv-border-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "5rem", opacity: 0.3 }}>🚀</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="nv-section" style={{ background: "var(--nv-bg-secondary)" }}>
        <div className="nv-container">
          <ScrollReveal>
            <SectionHeading
              badge="Nos Valeurs"
              title="Ce qui nous guide au quotidien"
            />
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 100}>
                <div className="nv-card" style={{ textAlign: "center" }}>
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "1rem" }}>{v.icon}</span>
                    <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                      {v.title}
                    </h3>
                    <p style={{ fontSize: "0.9rem", color: "var(--nv-text-secondary)", margin: 0, lineHeight: 1.7 }}>
                      {v.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="nv-section">
        <div className="nv-container">
          <ScrollReveal>
            <SectionHeading
              badge="L'Équipe"
              title="Les talents derrière NOVAVOX"
              subtitle="Une équipe pluridisciplinaire passionnée par le digital et dédiée à votre réussite."
            />
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
            {teamMembers.map((m, i) => (
              <ScrollReveal key={m.id} delay={i * 100}>
                <div className="nv-card" style={{ textAlign: "center" }}>
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div
                      style={{
                        width: "72px",
                        height: "72px",
                        borderRadius: "50%",
                        background: "var(--nv-grad-primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "Outfit, sans-serif",
                        fontWeight: 800,
                        fontSize: "1.25rem",
                        color: "#fff",
                        margin: "0 auto 1rem",
                        boxShadow: "var(--nv-shadow-md)",
                      }}
                    >
                      {m.avatar}
                    </div>
                    <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.25rem" }}>
                      {m.name}
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--nv-accent-violet)", fontWeight: 500, marginBottom: "0.75rem" }}>
                      {m.role}
                    </p>
                    <p style={{ fontSize: "0.85rem", color: "var(--nv-text-secondary)", lineHeight: 1.7, margin: "0 0 1rem" }}>
                      {m.bio}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", justifyContent: "center" }}>
                      {m.skills.map((s) => (
                        <span
                          key={s}
                          style={{
                            padding: "0.2rem 0.5rem",
                            background: "rgba(26,111,212,0.12)",
                            border: "1px solid rgba(26,111,212,0.24)",
                            borderRadius: "4px",
                            fontSize: "0.7rem",
                            color: "var(--nv-accent-violet)",
                            fontFamily: "monospace",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        style={{
          padding: "4rem 0",
          background: "var(--nv-bg-secondary)",
          borderTop: "1px solid var(--nv-border-light)",
          borderBottom: "1px solid var(--nv-border-light)",
        }}
      >
        <div className="nv-container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "2rem", textAlign: "center" }}>
            {stats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 100}>
                <div>
                  <div
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      fontSize: "clamp(2rem, 4vw, 3rem)",
                      fontWeight: 800,
                      background: "var(--nv-grad-text)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "var(--nv-text-muted)", margin: 0 }}>{s.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "5rem 0", textAlign: "center" }}>
        <div className="nv-container">
          <ScrollReveal>
            <h2 style={{ fontFamily: "Outfit, sans-serif", marginBottom: "1rem" }}>Envie de travailler avec nous ?</h2>
            <p style={{ color: "var(--nv-text-secondary)", maxWidth: "500px", margin: "0 auto 2rem" }}>
              Rejoignez les 120+ entreprises qui nous font confiance.
            </p>
            <Link href="/contact" className="nv-btn nv-btn-primary">
              Parlons de votre projet →
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
