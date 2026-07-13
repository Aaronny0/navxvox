"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "../actions/auth";
import type { SessionPayload } from "@/lib/auth";

export default function ClientSidebar({ user }: { user: SessionPayload }) {
  const pathname = usePathname();

  const links = [
    { href: "/client/dashboard", label: "Tableau de Bord", icon: "📊" },
    { href: "/client/projects", label: "Mes Projets", icon: "📁" },
    { href: "/client/brief/new", label: "Nouveau Brief", icon: "✨" },
    { href: "/client/invoices", label: "Mes Factures", icon: "🧾" },
    { href: "/client/profile", label: "Mon Profil", icon: "⚙️" },
  ];

  return (
    <aside
      style={{
        width: "280px",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        background: "var(--nv-bg-secondary)",
        borderRight: "1px solid var(--nv-border-light)",
        display: "flex",
        flexDirection: "column",
        zIndex: 100,
      }}
    >
      <div style={{ padding: "2rem 1.5rem" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 800,
              fontSize: "1.25rem",
              background: "var(--nv-grad-text)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            NOVAVOX
          </span>
        </Link>
      </div>

      <div style={{ padding: "0 1.5rem", marginBottom: "2rem" }}>
        <p style={{ fontSize: "0.8rem", color: "var(--nv-text-muted)", margin: "0 0 0.5rem" }}>
          Espace Client
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "var(--nv-grad-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              color: "#fff",
              fontSize: "0.9rem",
            }}
          >
            {user.firstName[0]}
            {user.lastName[0]}
          </div>
          <div>
            <p style={{ fontSize: "0.9rem", fontWeight: 600, margin: 0, color: "var(--nv-text-primary)" }}>
              {user.companyName}
            </p>
            <p style={{ fontSize: "0.75rem", margin: 0, color: "var(--nv-text-secondary)" }}>
              {user.firstName} {user.lastName}
            </p>
          </div>
        </div>
      </div>

      <nav style={{ flex: 1, padding: "0 1rem" }}>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.75rem 1rem",
                    borderRadius: "var(--nv-radius-md)",
                    background: active ? "rgba(139,92,246,0.1)" : "transparent",
                    color: active ? "var(--nv-accent-violet)" : "var(--nv-text-secondary)",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    fontWeight: active ? 600 : 500,
                    transition: "all 0.2s ease",
                  }}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div style={{ padding: "1.5rem" }}>
        <button
          onClick={() => logout()}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.75rem 1rem",
            borderRadius: "var(--nv-radius-md)",
            background: "rgba(239,68,68,0.1)",
            color: "#ef4444",
            border: "none",
            cursor: "pointer",
            fontSize: "0.9rem",
            fontWeight: 500,
          }}
        >
          <span>🚪</span> Déconnexion
        </button>
      </div>
    </aside>
  );
}
