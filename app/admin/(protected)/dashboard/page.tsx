import { db } from "@/lib/db";
import Link from "next/link";
import { ProjectStatusChart, RevenueChart, ProjectsByMonthChart } from "../../components/DashboardCharts";

export default async function AdminDashboardPage() {
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const [
    totalClients,
    activeProjects,
    deliveredThisMonth,
    pendingBriefs,
    pendingQuotes,
    urgentProjects,
    recentBriefs,
    recentMessages,
  ] = await Promise.all([
    db.user.count({ where: { role: "CLIENT" } }),
    db.project.count({ where: { status: { in: ["pending", "active", "revision"] } } }),
    db.project.count({ where: { status: "delivered", deliveredAt: { gte: firstDayOfMonth } } }),
    db.brief.count({ where: { status: "received" } }),
    db.quote.count({ where: { status: "pending" } }),
    db.project.findMany({
      where: { status: { in: ["active", "revision"] }, estimatedAt: { lte: nextWeek, gte: now } },
      include: { client: true },
      take: 5,
      orderBy: { estimatedAt: "asc" }
    }),
    db.brief.findMany({ take: 3, orderBy: { createdAt: "desc" }, include: { client: true } }),
    db.projectMessage.findMany({
      where: { senderType: "client" },
      take: 3,
      orderBy: { createdAt: "desc" },
      include: { sender: true, project: true }
    }),
  ]);

  // Mock data for charts if DB is empty
  const statusData = [
    { name: "En cours", value: activeProjects || 5 },
    { name: "En révision", value: 2 },
    { name: "Livré", value: deliveredThisMonth || 12 },
    { name: "Archivé", value: 4 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 4000 },
    { month: "Fév", revenue: 3000 },
    { month: "Mar", revenue: 5000 },
    { month: "Avr", revenue: 8000 },
    { month: "Mai", revenue: 6000 },
    { month: "Juin", revenue: 9000 },
  ];

  const projectsByMonthData = [
    { month: "Jan", count: 2 },
    { month: "Fév", count: 3 },
    { month: "Mar", count: 4 },
    { month: "Avr", count: 7 },
    { month: "Mai", count: 5 },
    { month: "Juin", count: 8 },
  ];

  return (
    <div>
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Dashboard Overview</h1>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
        {[
          { label: "Clients totaux", value: totalClients, icon: "👥", color: "var(--nv-accent-violet)" },
          { label: "Projets en cours", value: activeProjects, icon: "🚀", color: "var(--nv-accent-cyan)" },
          { label: "Livrés ce mois", value: deliveredThisMonth, icon: "✅", color: "#10b981" },
          { label: "Briefs en attente", value: pendingBriefs, icon: "📥", color: "#f59e0b" },
          { label: "Devis en attente", value: pendingQuotes, icon: "📄", color: "#ef4444" },
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

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem", marginBottom: "3rem" }}>
        {/* Urgent Projects */}
        <div className="nv-card">
          <h2 style={{ fontSize: "1.25rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ color: "#ef4444" }}>⚠️</span> Projets urgents (&lt; 7 jours)
          </h2>
          {urgentProjects.length === 0 ? (
            <p style={{ color: "var(--nv-text-muted)" }}>Aucun projet urgent.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {urgentProjects.map((p) => (
                <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", background: "rgba(239, 68, 68, 0.05)", borderRadius: "0.5rem", borderLeft: "4px solid #ef4444" }}>
                  <div>
                    <h3 style={{ fontSize: "1rem", margin: "0 0 0.25rem" }}>{p.name}</h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--nv-text-secondary)", margin: 0 }}>Client : {p.client.companyName}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ margin: "0 0 0.25rem", fontWeight: 600, color: "#ef4444" }}>
                      {p.estimatedAt ? new Date(p.estimatedAt).toLocaleDateString("fr-FR") : "N/A"}
                    </p>
                    <Link href={`/admin/projects/${p.id}`} style={{ fontSize: "0.85rem", color: "var(--nv-accent-violet)", textDecoration: "none" }}>Voir</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="nv-card">
          <h2 style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}>Activité récente</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <h3 style={{ fontSize: "0.9rem", color: "var(--nv-text-secondary)", marginBottom: "0.5rem", textTransform: "uppercase" }}>Derniers Briefs</h3>
              {recentBriefs.length === 0 ? <p style={{ fontSize: "0.85rem", color: "var(--nv-text-muted)" }}>Aucun brief</p> : recentBriefs.map(b => (
                <div key={b.id} style={{ marginBottom: "0.5rem" }}>
                  <p style={{ fontSize: "0.9rem", margin: 0 }}>{b.client.companyName} - {b.serviceType}</p>
                </div>
              ))}
            </div>
            <div>
              <h3 style={{ fontSize: "0.9rem", color: "var(--nv-text-secondary)", marginBottom: "0.5rem", textTransform: "uppercase" }}>Derniers Messages</h3>
              {recentMessages.length === 0 ? <p style={{ fontSize: "0.85rem", color: "var(--nv-text-muted)" }}>Aucun message</p> : recentMessages.map(m => (
                <div key={m.id} style={{ marginBottom: "0.5rem" }}>
                  <p style={{ fontSize: "0.9rem", margin: 0 }}><strong>{m.sender.firstName}</strong> sur <em>{m.project.name}</em></p>
                  <p style={{ fontSize: "0.8rem", color: "var(--nv-text-muted)", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2rem" }}>
        <div className="nv-card">
          <h2 style={{ fontSize: "1.1rem", marginBottom: "1rem", textAlign: "center" }}>Projets par Statut</h2>
          <ProjectStatusChart data={statusData} />
        </div>
        <div className="nv-card">
          <h2 style={{ fontSize: "1.1rem", marginBottom: "1rem", textAlign: "center" }}>Nouveaux Projets (mensuel)</h2>
          <ProjectsByMonthChart data={projectsByMonthData} />
        </div>
        <div className="nv-card">
          <h2 style={{ fontSize: "1.1rem", marginBottom: "1rem", textAlign: "center" }}>Chiffre d'Affaires (HT)</h2>
          <RevenueChart data={revenueData} />
        </div>
      </div>
    </div>
  );
}
