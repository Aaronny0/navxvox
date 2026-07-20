"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/a-propos", label: "À Propos" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeLink = usePathname();
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`nv-header${scrolled ? " nv-header--scrolled" : ""}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: "var(--nv-z-header)" as string,
        transition: "all var(--nv-transition)",
        padding: scrolled ? "0.75rem 0" : "1.25rem 0",
        background: scrolled
          ? "rgba(6, 26, 43, 0.9)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(46, 196, 182, 0.2)"
          : "1px solid transparent",
      }}
    >
      <div className="nv-container">
        <nav
          ref={menuRef}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          aria-label="Navigation principale"
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
              zIndex: 10,
            }}
            onClick={() => setIsOpen(false)}
          >
            <span
              style={{
                width: "42px",
                height: "42px",
                position: "relative",
                borderRadius: "10px",
                display: "block",
                overflow: "hidden",
                boxShadow: "var(--nv-shadow-md)",
                flexShrink: 0,
              }}
            >
              <Image
                src="/brand/novavox-logo.jpeg"
                alt=""
                fill
                sizes="42px"
                style={{ objectFit: "cover" }}
                preload
              />
            </span>
            <span
              style={{
                fontFamily: "Outfit, sans-serif",
                fontWeight: 800,
                fontSize: "1.25rem",
                letterSpacing: "-0.03em",
                background: "var(--nv-grad-text)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              NOVAVOX
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul
            role="list"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
            className="nv-desktop-nav"
          >
            {navLinks.slice(0, -1).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{
                    padding: "0.5rem 0.875rem",
                    borderRadius: "100px",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    fontFamily: "Outfit, sans-serif",
                    color:
                      activeLink === link.href
                        ? "var(--nv-accent-violet)"
                        : "var(--nv-text-secondary)",
                    background:
                      activeLink === link.href
                        ? "rgba(46, 196, 182, 0.12)"
                        : "transparent",
                    transition: "all var(--nv-transition)",
                    textDecoration: "none",
                    display: "block",
                  }}
                  onMouseEnter={(e) => {
                    if (activeLink !== link.href) {
                      (e.target as HTMLElement).style.color =
                        "var(--nv-text-primary)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeLink !== link.href) {
                      (e.target as HTMLElement).style.color =
                        "var(--nv-text-secondary)";
                    }
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Buttons + Burger */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Link
              href="/client/login"
              className="nv-btn nv-btn-ghost nv-header-cta"
              style={{ fontSize: "0.85rem", padding: "0.625rem 1.25rem" }}
            >
              Espace client
            </Link>
            <Link
              href="/contact"
              className="nv-btn nv-btn-primary nv-header-cta"
              style={{ fontSize: "0.85rem", padding: "0.625rem 1.5rem" }}
            >
              Démarrer un projet
            </Link>

            {/* Burger */}
            <button
              id="menu-toggle"
              aria-label="Ouvrir le menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsOpen(!isOpen)}
              style={{
                display: "none",
                flexDirection: "column",
                gap: "5px",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                zIndex: 10,
              }}
              className="nv-burger"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: "block",
                    width: "24px",
                    height: "2px",
                    background: "var(--nv-text-primary)",
                    borderRadius: "2px",
                    transition: "all 0.3s ease",
                    transform:
                      isOpen
                        ? i === 0
                          ? "rotate(45deg) translateY(7px)"
                          : i === 2
                          ? "rotate(-45deg) translateY(-7px)"
                          : "scaleX(0)"
                        : "none",
                    opacity: isOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-label="Menu mobile"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(6, 26, 43, 0.98)",
            backdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1.5rem",
            animation: "slideDown 0.3s ease",
            zIndex: 99,
          }}
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              style={{
                fontFamily: "Outfit, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
                color:
                  activeLink === link.href
                    ? "var(--nv-accent-violet)"
                    : "var(--nv-text-primary)",
                textDecoration: "none",
                transition: "all var(--nv-transition)",
                animation: `fadeInUp 0.4s ease ${i * 0.05}s both`,
                letterSpacing: "-0.02em",
              }}
            >
              {link.label}
            </Link>
          ))}
          <div className="nv-mobile-actions">
            <Link
              href="/client/login"
              onClick={() => setIsOpen(false)}
              className="nv-btn nv-btn-ghost"
            >
              Espace client
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="nv-btn nv-btn-primary"
            >
              Démarrer un projet
            </Link>
          </div>
        </div>
      )}

      <style>{`
        .nv-mobile-actions {
          display: flex;
          gap: 0.75rem;
          margin-top: 1rem;
          animation: fadeInUp 0.4s ease 0.3s both;
        }
        .nv-mobile-actions .nv-btn {
          min-height: 44px;
          padding: 0.75rem 1.5rem;
        }
        @media (max-width: 1024px) {
          .nv-desktop-nav { display: none !important; }
          .nv-burger { display: flex !important; }
          .nv-header-cta { display: none !important; }
        }
        @media (max-width: 520px) {
          .nv-mobile-actions {
            width: min(100% - 2rem, 320px);
            flex-direction: column;
          }
          .nv-mobile-actions .nv-btn { justify-content: center; }
        }
      `}</style>
    </header>
  );
}
