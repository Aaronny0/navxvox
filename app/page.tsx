import Link from "next/link";
import { services, stats, testimonials } from "@/lib/data";
import { getFeaturedProjects } from "@/lib/data";
import TypewriterEffect from "./components/TypewriterEffect";
import AnimatedCounter from "./components/AnimatedCounter";
import ServiceCard from "./components/ServiceCard";
import ProjectCard from "./components/ProjectCard";
import SectionHeading from "./components/SectionHeading";
import TestimonialSlider from "./components/TestimonialSlider";
import ScrollReveal from "./components/ScrollReveal";

export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      {/* ═══════════════ HERO ═══════════════ */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: "8rem 0 4rem",
        }}
      >
        {/* Orbs */}
        <div className="nv-orb nv-orb-violet" style={{ width: "500px", height: "500px", top: "-10%", left: "-5%" }} />
        <div className="nv-orb nv-orb-cyan" style={{ width: "400px", height: "400px", bottom: "0", right: "-5%" }} />
        <div className="nv-orb nv-orb-pink" style={{ width: "300px", height: "300px", top: "40%", left: "50%" }} />

        <div className="nv-container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ animation: "fadeInUp 0.8s ease" }}>
            <span className="nv-badge" style={{ marginBottom: "1.5rem" }}>
              ✨ Agence Web Premium
            </span>
          </div>

          <h1
            style={{
              animation: "fadeInUp 0.8s ease 0.1s both",
              marginBottom: "1.5rem",
              maxWidth: "900px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Nous créons des expériences web{" "}
            <TypewriterEffect
              words={["mémorables", "performantes", "sur mesure", "exceptionnelles"]}
            />
          </h1>

          <p
            style={{
              animation: "fadeInUp 0.8s ease 0.2s both",
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "var(--nv-text-secondary)",
              maxWidth: "600px",
              margin: "0 auto 2.5rem",
              lineHeight: 1.8,
            }}
          >
            NOVAVOX conçoit des sites vitrines, applications web et e-commerces
            qui propulsent votre business. Design premium, performances optimales.
          </p>

          <div
            style={{
              animation: "fadeInUp 0.8s ease 0.3s both",
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link href="/contact" className="nv-btn nv-btn-primary">
              Démarrer un projet →
            </Link>
            <Link href="/client/login" className="nv-btn nv-btn-ghost">
              Espace Client 🔐
            </Link>
            <Link href="/portfolio" className="nv-btn nv-btn-ghost">
              Voir nos réalisations
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS ═══════════════ */}
      <section
        style={{
          borderTop: "1px solid var(--nv-border-light)",
          borderBottom: "1px solid var(--nv-border-light)",
          background: "var(--nv-bg-secondary)",
          padding: "3rem 0",
        }}
      >
        <div className="nv-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "2rem",
              textAlign: "center",
            }}
          >
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 100}>
                <div>
                  <span style={{ fontSize: "1.5rem", display: "block", marginBottom: "0.5rem" }}>
                    {stat.icon}
                  </span>
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
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "var(--nv-text-muted)", margin: 0 }}>
                    {stat.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICES ═══════════════ */}
      <section className="nv-section">
        <div className="nv-container">
          <ScrollReveal>
            <SectionHeading
              badge="Nos Services"
              title="Des solutions digitales complètes"
              subtitle="De l'idée à la réalisation, nous maîtrisons chaque étape de votre projet web."
            />
          </ScrollReveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {services.map((service, i) => (
              <ScrollReveal key={service.id} delay={i * 80}>
                <ServiceCard service={service} index={i} />
              </ScrollReveal>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link href="/services" className="nv-btn nv-btn-ghost">
              Tous nos services →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ PORTFOLIO ═══════════════ */}
      <section
        className="nv-section"
        style={{ background: "var(--nv-bg-secondary)" }}
      >
        <div className="nv-container">
          <ScrollReveal>
            <SectionHeading
              badge="Portfolio"
              title="Nos dernières réalisations"
              subtitle="Chaque projet est une histoire unique. Découvrez comment nous avons aidé nos clients à se démarquer."
            />
          </ScrollReveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {featuredProjects.map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 100}>
                <ProjectCard project={project} />
              </ScrollReveal>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link href="/portfolio" className="nv-btn nv-btn-ghost">
              Voir tout le portfolio →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ TÉMOIGNAGES ═══════════════ */}
      <section className="nv-section" style={{ position: "relative", overflow: "hidden" }}>
        <div className="nv-orb nv-orb-violet" style={{ width: "400px", height: "400px", top: "10%", right: "-10%" }} />
        <div className="nv-container" style={{ position: "relative", zIndex: 1 }}>
          <ScrollReveal>
            <SectionHeading
              badge="Témoignages"
              title="Ce que disent nos clients"
              subtitle="La satisfaction client est notre priorité absolue."
            />
          </ScrollReveal>
          <ScrollReveal>
            <TestimonialSlider testimonials={testimonials} />
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════ CTA FINAL ═══════════════ */}
      <section
        style={{
          padding: "6rem 0",
          background: "linear-gradient(135deg, rgba(26,111,212,0.14) 0%, rgba(0,200,224,0.07) 100%)",
          borderTop: "1px solid var(--nv-border-light)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="nv-orb nv-orb-violet" style={{ width: "300px", height: "300px", bottom: "-20%", left: "10%" }} />
        <div className="nv-container" style={{ position: "relative", zIndex: 1 }}>
          <ScrollReveal>
            <h2
              style={{
                fontFamily: "Outfit, sans-serif",
                marginBottom: "1rem",
              }}
            >
              Prêt à démarrer votre projet ?
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--nv-text-secondary)",
                maxWidth: "500px",
                margin: "0 auto 2rem",
              }}
            >
              Premier échange gratuit et sans engagement. Parlons de votre vision.
            </p>
            <Link href="/contact" className="nv-btn nv-btn-primary" style={{ fontSize: "1rem", padding: "1rem 2.5rem" }}>
              Contactez-nous ✨
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
