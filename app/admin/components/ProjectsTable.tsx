"use client";

import { useState } from "react";
import Link from "next/link";

type Project = {
  id: string;
  name: string;
  serviceType: string;
  status: string;
  progress: number;
  assignedTo: string | null;
  estimatedAt: Date | null;
  deliveredAt: Date | null;
  createdAt: Date;
  client: { companyName: string };
};

export function ProjectsTable({ projects }: { projects: Project[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  
  const filteredProjects = projects.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(search.toLowerCase()) || 
      p.client.companyName.toLowerCase().includes(search.toLowerCase());
      
    const matchesStatus = statusFilter === "ALL" || p.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending": return <span className="nv-badge" style={{ background: "rgba(245, 158, 11, 0.1)", color: "#f59e0b" }}>En attente</span>;
      case "active": return <span className="nv-badge" style={{ background: "rgba(6, 182, 212, 0.1)", color: "#06b6d4" }}>En cours</span>;
      case "revision": return <span className="nv-badge" style={{ background: "rgba(139, 92, 246, 0.1)", color: "#8b5cf6" }}>En révision</span>;
      case "delivered": return <span className="nv-badge" style={{ background: "rgba(16, 185, 129, 0.1)", color: "#10b981" }}>Livré</span>;
      case "archived": return <span className="nv-badge" style={{ background: "rgba(255, 255, 255, 0.1)", color: "var(--nv-text-secondary)" }}>Archivé</span>;
      default: return <span className="nv-badge">{status}</span>;
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div style={{ display: "flex", gap: "1rem", flex: 1, maxWidth: "600px" }}>
          <input 
            type="text" 
            placeholder="Rechercher un projet, client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="nv-input"
            style={{ flex: 1 }}
          />
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="nv-input"
            style={{ width: "180px" }}
          >
            <option value="ALL">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="active">En cours</option>
            <option value="revision">En révision</option>
            <option value="delivered">Livré</option>
            <option value="archived">Archivé</option>
          </select>
        </div>
        <Link href="/admin/projects/new" className="nv-btn nv-btn-primary">
          + Créer un projet
        </Link>
      </div>

      <div className="nv-card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.05)", textAlign: "left", borderBottom: "1px solid var(--nv-border-light)" }}>
              <th style={{ padding: "1rem" }}>Projet</th>
              <th style={{ padding: "1rem" }}>Client</th>
              <th style={{ padding: "1rem" }}>Progression</th>
              <th style={{ padding: "1rem" }}>Statut</th>
              <th style={{ padding: "1rem" }}>Assigné à</th>
              <th style={{ padding: "1rem" }}>Livraison prévue</th>
              <th style={{ padding: "1rem", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project) => (
              <tr key={project.id} style={{ borderBottom: "1px solid var(--nv-border-light)" }}>
                <td style={{ padding: "1rem", fontWeight: 600 }}>{project.name}</td>
                <td style={{ padding: "1rem" }}>{project.client.companyName}</td>
                <td style={{ padding: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{ flex: 1, height: "6px", background: "rgba(255,255,255,0.1)", borderRadius: "3px" }}>
                      <div style={{ width: `${project.progress}%`, height: "100%", background: "var(--nv-accent-violet)", borderRadius: "3px" }} />
                    </div>
                    <span style={{ fontSize: "0.8rem", color: "var(--nv-text-secondary)" }}>{project.progress}%</span>
                  </div>
                </td>
                <td style={{ padding: "1rem" }}>{getStatusBadge(project.status)}</td>
                <td style={{ padding: "1rem", color: project.assignedTo ? "var(--nv-text-primary)" : "var(--nv-text-muted)" }}>
                  {project.assignedTo || "Non assigné"}
                </td>
                <td style={{ padding: "1rem", color: project.estimatedAt ? "var(--nv-text-primary)" : "var(--nv-text-muted)" }}>
                  {project.estimatedAt ? new Date(project.estimatedAt).toLocaleDateString() : "Non définie"}
                </td>
                <td style={{ padding: "1rem", textAlign: "right" }}>
                  <Link href={`/admin/projects/${project.id}`} className="nv-btn" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", background: "rgba(255,255,255,0.05)" }}>
                    Gérer
                  </Link>
                </td>
              </tr>
            ))}
            {filteredProjects.length === 0 && (
              <tr>
                <td colSpan={7} style={{ padding: "2rem", textAlign: "center", color: "var(--nv-text-muted)" }}>
                  Aucun projet trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
