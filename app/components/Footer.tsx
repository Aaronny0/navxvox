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
    id: "linkedin",
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
  {
    id: "twitter",
    label: "Twitter / X",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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
    id: "github",
    label: "GitHub",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
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
            "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(34,211,238,0.08) 100%)",
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
                    el.style.background = "rgba(139,92,246,0.1)";
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
                { icon: "📧", text: "hello@novavox.fr", href: "mailto:hello@novavox.fr" },
                { icon: "📞", text: "+33 1 23 45 67 89", href: "tel:+33123456789" },
                { icon: "📍", text: "Paris, France", href: null },
                { icon: "🕐", text: "Lun–Ven, 9h–18h", href: null },
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
            <span style={{ color: "var(--nv-accent-violet)" }}>♥</span> à Paris.
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
