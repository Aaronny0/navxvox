"use client";

import { useState } from "react";
import Link from "next/link";
import { toggleClientStatus } from "../actions/clients";

type Client = {
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
  projectsCount: number;
};

export function ClientsTable({ clients }: { clients: Client[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL"); // ALL, ACTIVE, INACTIVE
  
  const filteredClients = clients.filter((c) => {
    const matchesSearch = 
      c.companyName.toLowerCase().includes(search.toLowerCase()) || 
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.firstName.toLowerCase().includes(search.toLowerCase()) ||
      c.lastName.toLowerCase().includes(search.toLowerCase());
      
    const matchesStatus = 
      statusFilter === "ALL" || 
      (statusFilter === "ACTIVE" && c.isActive) ||
      (statusFilter === "INACTIVE" && !c.isActive);

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <input 
          type="text" 
          placeholder="Rechercher par nom, entreprise, email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="nv-input"
          style={{ flex: 1 }}
        />
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          className="nv-input"
          style={{ width: "200px" }}
        >
          <option value="ALL">Tous les statuts</option>
          <option value="ACTIVE">Actifs</option>
          <option value="INACTIVE">Inactifs</option>
        </select>
      </div>

      <div className="nv-card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.05)", textAlign: "left", borderBottom: "1px solid var(--nv-border-light)" }}>
              <th style={{ padding: "1rem" }}>Entreprise</th>
              <th style={{ padding: "1rem" }}>Contact</th>
              <th style={{ padding: "1rem" }}>Email</th>
              <th style={{ padding: "1rem" }}>Projets</th>
              <th style={{ padding: "1rem" }}>Statut</th>
              <th style={{ padding: "1rem", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr key={client.id} style={{ borderBottom: "1px solid var(--nv-border-light)" }}>
                <td style={{ padding: "1rem", fontWeight: 600 }}>{client.companyName}</td>
                <td style={{ padding: "1rem" }}>{client.firstName} {client.lastName}</td>
                <td style={{ padding: "1rem", color: "var(--nv-text-secondary)" }}>{client.email}</td>
                <td style={{ padding: "1rem" }}>{client.projectsCount}</td>
                <td style={{ padding: "1rem" }}>
                  <span className="nv-badge" style={{ background: client.isActive ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)", color: client.isActive ? "#10b981" : "#ef4444" }}>
                    {client.isActive ? "Actif" : "Inactif"}
                  </span>
                </td>
                <td style={{ padding: "1rem", textAlign: "right", display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                  <Link href={`/admin/clients/${client.id}`} className="nv-btn" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
                    Détails
                  </Link>
                  <button 
                    onClick={() => toggleClientStatus(client.id, !client.isActive)}
                    className="nv-btn" 
                    style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", background: "rgba(255,255,255,0.05)" }}
                  >
                    {client.isActive ? "Désactiver" : "Activer"}
                  </button>
                </td>
              </tr>
            ))}
            {filteredClients.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: "2rem", textAlign: "center", color: "var(--nv-text-muted)" }}>
                  Aucun client trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
