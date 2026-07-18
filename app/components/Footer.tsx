"use client";

import Link from "next/link";

const footerLinks = {
  navigation: [
    { href: "/", label: "Accueil" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/a-propos", label: "À Propos" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  services: [
    { href: "/services#creation-site-web", label: "Création de Site Web" },
    { href: "/services#application-web", label: "Application Web" },
    { href: "/services#design-ux-ui", label: "Design UX/UI" },
    { href: "/services#e-commerce", label: "E-commerce" },
    { href: "/services#seo", label: "SEO & Visibilité" },
    { href: "/services#maintenance", label: "Maintenance" },
  ],
  legal: [
    { href: "#", label: "Mentions légales" },
    { href: "#", label: "Politique de confidentialité" },
    { href: "#", label: "CGU" },
  ],
};

const socials = [
  {
    id: "tiktok",
    label: "TikTok",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.6 5.82A4.85 4.85 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-2.59-2.59c.27 0 .53.04.78.12V9.78a5.7 5.7 0 1 0 4.9 5.62V9.11A7.9 7.9 0 0 0 20.16 10V6.92a4.9 4.9 0 0 1-3.56-1.1Z" />
      </svg>
    ),
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3z" />
      </svg>
    ),
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.5 22v-9h3l.45-3.5H13.5V7.27c0-1.01.28-1.7 1.73-1.7H17V2.44A23.6 23.6 0 0 0 14.42 2C11.86 2 10 3.56 10 6.43V9.5H7V13h3v9h3.5Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--nv-bg-secondary)",
        borderTop: "1px solid var(--nv-border-light)",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* CTA Band */}
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(26,111,212,0.16) 0%, rgba(0,200,224,0.08) 100%)",
          borderBottom: "1px solid var(--nv-border-light)",
          padding: "3rem 0",
        }}
      >
        <div className="nv-container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "Outfit, sans-serif",
                  fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
                  fontWeight: 700,
                  color: "var(--nv-text-primary)",
                  marginBottom: "0.5rem",
                }}
              >
                Prêt à propulser votre projet ?
              </h3>
              <p
                style={{
                  color: "var(--nv-text-secondary)",
                  fontSize: "0.95rem",
                  margin: 0,
                }}
              >
                Discutons de votre vision — premier échange gratuit et sans engagement.
              </p>
            </div>
            <Link href="/contact" className="nv-btn nv-btn-primary">
              Démarrer maintenant →
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="nv-container" style={{ padding: "4rem clamp(1rem, 4vw, 2.5rem)" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "3rem",
            marginBottom: "3rem",
          }}
        >
          {/* Brand */}
          <div style={{ gridColumn: "span 1" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <span
                style={{
                  width: "32px",
                  height: "32px",
                  background: "var(--nv-grad-primary)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.875rem",
                  fontWeight: 900,
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                N
              </span>
              <span
                style={{
                  fontFamily: "Outfit, sans-serif",
                  fontWeight: 800,
                  fontSize: "1.125rem",
                  letterSpacing: "-0.03em",
                  background: "var(--nv-grad-text)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                NOVAVOX
              </span>
            </div>
            <p style={{ fontSize: "0.875rem", color: "var(--nv-text-muted)", lineHeight: 1.7, margin: 0 }}>
              Agence web premium spécialisée en création de sites, applications web et design UX/UI.
            </p>
            {/* Socials */}
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
              {socials.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  aria-label={s.label}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--nv-border-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--nv-text-muted)",
                    transition: "all var(--nv-transition)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--nv-accent-violet)";
                    el.style.color = "var(--nv-accent-violet)";
                    el.style.background = "rgba(26,111,212,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--nv-border-light)";
                    el.style.color = "var(--nv-text-muted)";
                    el.style.background = "rgba(255,255,255,0.04)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              style={{
                fontFamily: "Outfit, sans-serif",
                fontWeight: 600,
                fontSize: "0.8rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--nv-text-muted)",
                marginBottom: "1.25rem",
              }}
            >
              Navigation
            </h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--nv-text-secondary)",
                      textDecoration: "none",
                      transition: "color var(--nv-transition)",
                    }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.color = "var(--nv-accent-violet)")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color = "var(--nv-text-secondary)")
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              style={{
                fontFamily: "Outfit, sans-serif",
                fontWeight: 600,
                fontSize: "0.8rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--nv-text-muted)",
                marginBottom: "1.25rem",
              }}
            >
              Services
            </h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--nv-text-secondary)",
                      textDecoration: "none",
                      transition: "color var(--nv-transition)",
                    }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.color = "var(--nv-accent-violet)")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color = "var(--nv-text-secondary)")
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontFamily: "Outfit, sans-serif",
                fontWeight: 600,
                fontSize: "0.8rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--nv-text-muted)",
                marginBottom: "1.25rem",
              }}
            >
              Contact
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {[
                { icon: "📧", text: "novavox30@gmail.com", href: "mailto:novavox30@gmail.com" },
                { icon: "📞", text: "01 62 08 91 61", href: "tel:0162089161" },
                { icon: "📍", text: "Cotonou, Bénin", href: null },
                { icon: "🕐", text: "9h–17h", href: null },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                  <span style={{ fontSize: "0.875rem" }}>{item.icon}</span>
                  {item.href ? (
                    <a
                      href={item.href}
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--nv-text-secondary)",
                        textDecoration: "none",
                        transition: "color var(--nv-transition)",
                      }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLElement).style.color = "var(--nv-accent-violet)")
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLElement).style.color = "var(--nv-text-secondary)")
                      }
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span style={{ fontSize: "0.875rem", color: "var(--nv-text-secondary)" }}>
                      {item.text}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid var(--nv-border-light)",
            paddingTop: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ fontSize: "0.8rem", color: "var(--nv-text-muted)", margin: 0 }}>
            © {year} NOVAVOX. Tous droits réservés. Conçu avec{" "}
            <span style={{ color: "var(--nv-accent-violet)" }}>♥</span> à Cotonou.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {footerLinks.legal.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontSize: "0.8rem",
                  color: "var(--nv-text-muted)",
                  textDecoration: "none",
                  transition: "color var(--nv-transition)",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--nv-text-secondary)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--nv-text-muted)")
                }
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
