import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import Link from "next/link";

export default async function ProjectsPage() {
  const session = await getSession();
  if (!session) return null;

  const projects = await db.project.findMany({
    where: { clientId: session.userId },
    orderBy: { updatedAt: "desc" },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return { bg: "rgba(245,158,11,0.1)", text: "#f59e0b", label: "En attente" };
      case "active": return { bg: "rgba(139,92,246,0.1)", text: "var(--nv-accent-violet)", label: "En cours" };
      case "revision": return { bg: "rgba(236,72,153,0.1)", text: "var(--nv-accent-pink)", label: "En révision" };
      case "delivered": return { bg: "rgba(34,211,238,0.1)", text: "var(--nv-accent-cyan)", label: "Livré" };
      case "archived": return { bg: "rgba(255,255,255,0.05)", text: "var(--nv-text-muted)", label: "Archivé" };
      default: return { bg: "rgba(255,255,255,0.05)", text: "var(--nv-text-secondary)", label: status };
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: "2rem", margin: 0 }}>Mes Projets</h1>
        <Link href="/client/brief/new" className="nv-btn nv-btn-primary">
          + Nouveau Projet
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="nv-card" style={{ textAlign: "center", padding: "4rem" }}>
          <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>📁</span>
          <h2 style={{ marginBottom: "0.5rem" }}>Aucun projet</h2>
          <p style={{ color: "var(--nv-text-secondary)", marginBottom: "1.5rem" }}>
            Vous n'avez pas encore de projet avec NOVAVOX.
          </p>
          <Link href="/client/brief/new" className="nv-btn nv-btn-primary">
            Démarrer un projet
          </Link>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {projects.map((project) => {
            const statusStyle = getStatusColor(project.status);
            return (
              <Link key={project.id} href={`/client/projects/${project.id}`} style={{ textDecoration: "none" }}>
                <div
                  className="nv-card"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr auto",
                    gap: "1.5rem",
                    alignItems: "center",
                    transition: "transform 0.2s ease, border-color 0.2s ease",
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: "1.1rem", margin: "0 0 0.25rem", color: "var(--nv-text-primary)" }}>
                      {project.name}
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--nv-text-secondary)", margin: 0 }}>
                      {project.serviceType}
                    </p>
                  </div>
                  
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--nv-text-secondary)", marginBottom: "0.4rem" }}>
                      <span>Progression</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.1)", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ width: `${project.progress}%`, height: "100%", background: statusStyle.text, borderRadius: "3px" }} />
                    </div>
                  </div>

                  <div>
                    <p style={{ fontSize: "0.8rem", color: "var(--nv-text-muted)", margin: "0 0 0.25rem" }}>Livraison estimée</p>
                    <p style={{ fontSize: "0.9rem", color: "var(--nv-text-primary)", margin: 0, fontWeight: 500 }}>
                      {project.estimatedAt ? new Date(project.estimatedAt).toLocaleDateString("fr-FR") : "À définir"}
                    </p>
                  </div>

                  <div>
                    <span
                      style={{
                        padding: "0.35rem 0.75rem",
                        borderRadius: "100px",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        background: statusStyle.bg,
                        color: statusStyle.text,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {statusStyle.label}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
