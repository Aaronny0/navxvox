import type { Metadata } from "next";
import ContactForm from "@/app/components/ContactForm";
import ScrollReveal from "@/app/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez NOVAVOX pour discuter de votre projet de communication, de branding, de création digitale ou de sécurité informatique.",
};

const contactInfo = [
  { icon: "📧", label: "Email", value: "novavox30@gmail.com", href: "mailto:novavox30@gmail.com" },
  { icon: "📞", label: "Téléphone", value: "01 62 08 91 61", href: "tel:0162089161" },
  { icon: "📍", label: "Localisation", value: "Cotonou, Bénin", href: null },
  { icon: "🕐", label: "Horaires", value: "9h–17h", href: null },
];

const reasons = [
  { icon: "⚡", title: "Réponse sous 24h", description: "Nous accusons réception de votre message dans les 24 heures." },
  { icon: "🎁", title: "Premier échange gratuit", description: "30 minutes pour comprendre vos besoins — sans engagement ni frais cachés." },
  { icon: "📋", title: "Devis détaillé sous 48h", description: "Un devis clair et transparent avec le détail de chaque prestation." },
];

export default function ContactPage() {
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
        <div className="nv-orb nv-orb-cyan" style={{ width: "400px", height: "400px", top: "-10%", left: "-5%" }} />
        <div className="nv-container" style={{ position: "relative", zIndex: 1 }}>
          <span className="nv-badge" style={{ marginBottom: "1rem" }}>Contact</span>
          <h1 style={{ marginBottom: "1rem" }}>
            Parlons de votre <span className="nv-text-gradient">projet</span>
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--nv-text-secondary)", maxWidth: "600px", margin: "0 auto" }}>
            Remplissez le formulaire ci-dessous ou contactez-nous directement. Nous vous répondons sous 24 heures.
          </p>
        </div>
      </section>

      {/* Reasons */}
      <section style={{ paddingBottom: "3rem" }}>
        <div className="nv-container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
            {reasons.map((r, i) => (
              <ScrollReveal key={r.title} delay={i * 100}>
                <div
                  style={{
                    padding: "1.25rem",
                    background: "rgba(46,196,182,0.07)",
                    border: "1px solid var(--nv-border-light)",
                    borderRadius: "var(--nv-radius-md)",
                    display: "flex",
                    alignItems: "start",
                    gap: "1rem",
                  }}
                >
                  <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{r.icon}</span>
                  <div>
                    <h4 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.25rem" }}>
                      {r.title}
                    </h4>
                    <p style={{ fontSize: "0.85rem", color: "var(--nv-text-secondary)", margin: 0, lineHeight: 1.6 }}>
                      {r.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="nv-section" style={{ paddingTop: "2rem" }}>
        <div className="nv-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 340px",
              gap: "3rem",
              alignItems: "start",
            }}
            className="contact-grid"
          >
            {/* Form */}
            <ScrollReveal>
              <div
                style={{
                  padding: "2.5rem",
                  background: "var(--nv-bg-card)",
                  border: "1px solid var(--nv-border-light)",
                  borderRadius: "var(--nv-radius-lg)",
                  position: "relative",
                }}
              >
                <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>
                  Envoyez-nous un message
                </h2>
                <ContactForm />
              </div>
            </ScrollReveal>

            {/* Sidebar */}
            <ScrollReveal delay={200}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {/* Contact Info Card */}
                <div className="nv-card">
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem" }}>
                      Coordonnées
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      {contactInfo.map((c) => (
                        <div key={c.label} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <span
                            style={{
                              width: "36px",
                              height: "36px",
                              borderRadius: "8px",
                              background: "rgba(46,196,182,0.12)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "0.9rem",
                              flexShrink: 0,
                            }}
                          >
                            {c.icon}
                          </span>
                          <div>
                            <span style={{ fontSize: "0.7rem", color: "var(--nv-text-muted)", textTransform: "uppercase" as const, letterSpacing: "0.08em", fontWeight: 600, fontFamily: "Outfit, sans-serif" }}>
                              {c.label}
                            </span>
                            {c.href ? (
                              <a href={c.href} style={{ display: "block", fontSize: "0.9rem", color: "var(--nv-text-primary)", fontWeight: 500, textDecoration: "none" }}>
                                {c.value}
                              </a>
                            ) : (
                              <p style={{ fontSize: "0.9rem", color: "var(--nv-text-primary)", fontWeight: 500, margin: 0 }}>
                                {c.value}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Social */}
                <div className="nv-card">
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>
                      Suivez-nous
                    </h3>
                    <div style={{ display: "flex", gap: "0.75rem" }}>
                      {["TikTok", "Instagram", "Facebook"].map((s) => (
                        <a
                          key={s}
                          href="#"
                          style={{
                            padding: "0.5rem 0.875rem",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid var(--nv-border-light)",
                            borderRadius: "8px",
                            fontSize: "0.75rem",
                            color: "var(--nv-text-secondary)",
                            textDecoration: "none",
                            transition: "all 0.3s ease",
                            fontFamily: "Outfit, sans-serif",
                            fontWeight: 500,
                          }}
                        >
                          {s}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
