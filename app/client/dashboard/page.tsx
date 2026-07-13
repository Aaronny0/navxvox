import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) return null; // handled by middleware

  const [activeProjects, completedProjects, pendingQuotes, unpaidInvoices, recentNotifications] = await Promise.all([
    db.project.count({ where: { clientId: session.userId, status: { in: ["pending", "active", "revision"] } } }),
    db.project.count({ where: { clientId: session.userId, status: "delivered" } }),
    db.quote.count({ where: { project: { clientId: session.userId }, status: "pending" } }),
    db.invoice.count({ where: { clientId: session.userId, status: { not: "paid" } } }),
    db.notification.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const ongoingProjects = await db.project.findMany({
    where: { clientId: session.userId, status: { in: ["pending", "active", "revision"] } },
    orderBy: { updatedAt: "desc" },
    take: 3,
  });

  return (
    <div>
      <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Bonjour, {session.firstName} 👋</h1>
          <p style={{ color: "var(--nv-text-secondary)", margin: 0 }}>
            Bienvenue sur l'espace client {session.companyName}
          </p>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link href="/client/brief/new" className="nv-btn nv-btn-primary">
            + Nouveau Brief
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
        {[
          { label: "Projets en cours", value: activeProjects, icon: "🚀", color: "var(--nv-accent-violet)" },
          { label: "Projets terminés", value: completedProjects, icon: "✅", color: "var(--nv-accent-cyan)" },
          { label: "Devis en attente", value: pendingQuotes, icon: "📄", color: "#f59e0b" },
          { label: "Factures impayées", value: unpaidInvoices, icon: "💳", color: "#ef4444" },
        ].map((stat) => (
          <div key={stat.label} className="nv-card" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ fontSize: "2rem" }}>{stat.icon}</div>
            <div>
              <p style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0, color: stat.color }}>{stat.value}</p>
              <p style={{ fontSize: "0.85rem", color: "var(--nv-text-secondary)", margin: 0 }}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem", alignItems: "start" }}>
        {/* Ongoing projects */}
        <div>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}>Projets récents</h2>
          {ongoingProjects.length === 0 ? (
            <div className="nv-card" style={{ textAlign: "center", padding: "3rem" }}>
              <p style={{ color: "var(--nv-text-muted)" }}>Aucun projet en cours.</p>
              <Link href="/client/brief/new" style={{ color: "var(--nv-accent-violet)", textDecoration: "none" }}>Soumettre un brief</Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {ongoingProjects.map((p) => (
                <Link key={p.id} href={`/client/projects/${p.id}`} style={{ textDecoration: "none" }}>
                  <div className="nv-card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <h3 style={{ fontSize: "1.1rem", margin: 0, color: "var(--nv-text-primary)" }}>{p.name}</h3>
                      <span className="nv-badge">{p.status}</span>
                    </div>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--nv-text-secondary)", marginBottom: "0.5rem" }}>
                        <span>Progression</span>
                        <span>{p.progress}%</span>
                      </div>
                      <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.1)", borderRadius: "3px", overflow: "hidden" }}>
                        <div style={{ width: `${p.progress}%`, height: "100%", background: "var(--nv-accent-violet)", borderRadius: "3px", transition: "width 0.5s ease" }} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}>Notifications</h2>
          <div className="nv-card" style={{ padding: 0, overflow: "hidden" }}>
            {recentNotifications.length === 0 ? (
              <div style={{ padding: "2rem", textAlign: "center" }}>
                <p style={{ color: "var(--nv-text-muted)", fontSize: "0.9rem", margin: 0 }}>Aucune notification récente.</p>
              </div>
            ) : (
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {recentNotifications.map((n, i) => (
                  <li
                    key={n.id}
                    style={{
                      padding: "1rem 1.5rem",
                      borderBottom: i < recentNotifications.length - 1 ? "1px solid var(--nv-border-light)" : "none",
                      background: n.read ? "transparent" : "rgba(139,92,246,0.05)",
                    }}
                  >
                    <p style={{ fontSize: "0.9rem", fontWeight: 600, margin: "0 0 0.25rem", color: "var(--nv-text-primary)" }}>{n.title}</p>
                    <p style={{ fontSize: "0.85rem", color: "var(--nv-text-secondary)", margin: 0 }}>{n.body}</p>
                    <p style={{ fontSize: "0.7rem", color: "var(--nv-text-muted)", margin: "0.5rem 0 0" }}>
                      {new Date(n.createdAt).toLocaleDateString("fr-FR")}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
