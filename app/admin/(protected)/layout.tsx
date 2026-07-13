import { getSession } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { adminLogout } from "../actions/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session || session.role === "CLIENT") {
    redirect("/admin/login");
  }

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: "📊" },
    { label: "Clients", href: "/admin/clients", icon: "👥" },
    { label: "Briefs", href: "/admin/briefs", icon: "📥" },
    { label: "Projets", href: "/admin/projects", icon: "🚀" },
    { label: "Devis", href: "/admin/quotes", icon: "📄" },
    { label: "Factures", href: "/admin/invoices", icon: "💳" },
    { label: "Services", href: "/admin/services", icon: "✨" },
    { label: "Portfolio", href: "/admin/portfolio", icon: "🖼️" },
    { label: "Blog", href: "/admin/blog", icon: "✍️" },
    { label: "Équipe", href: "/admin/team", icon: "👨‍💻" },
    { label: "Paramètres", href: "/admin/settings", icon: "⚙️" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--nv-bg-primary)" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "260px",
          background: "var(--nv-bg-secondary)",
          borderRight: "1px solid var(--nv-border-light)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: "2rem", borderBottom: "1px solid var(--nv-border-light)" }}>
          <h2 style={{ fontSize: "1.5rem", margin: 0, fontWeight: 800, color: "var(--nv-text-primary)" }}>
            NOVAVOX
          </h2>
          <span style={{ fontSize: "0.8rem", color: "var(--nv-accent-cyan)", fontWeight: 600 }}>BACK-OFFICE</span>
        </div>

        <nav style={{ padding: "1rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "0.75rem 1rem",
                borderRadius: "0.5rem",
                color: "var(--nv-text-secondary)",
                textDecoration: "none",
                fontWeight: 500,
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.color = "var(--nv-text-primary)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--nv-text-secondary)";
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ padding: "1.5rem", borderTop: "1px solid var(--nv-border-light)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "var(--nv-accent-violet)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                color: "white",
              }}
            >
              {session.firstName.charAt(0)}{session.lastName.charAt(0)}
            </div>
            <div style={{ overflow: "hidden" }}>
              <p style={{ margin: 0, fontSize: "0.9rem", fontWeight: 600, whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                {session.firstName} {session.lastName}
              </p>
              <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--nv-text-muted)" }}>
                {session.role}
              </p>
            </div>
          </div>
          <form action={adminLogout}>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "0.5rem",
                background: "rgba(239, 68, 68, 0.1)",
                color: "#ef4444",
                border: "none",
                borderRadius: "0.5rem",
                cursor: "pointer",
                fontWeight: 500,
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)")}
              onMouseOut={(e) => (e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)")}
            >
              Déconnexion
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "2rem 3rem", overflowY: "auto" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>{children}</div>
      </main>
    </div>
  );
}
