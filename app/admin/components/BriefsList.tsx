"use client";

import { useState } from "react";
import { acceptBrief, refuseBrief } from "../actions/briefs";

type Brief = {
  id: string;
  serviceType: string;
  projectName: string | null;
  budget: string | null;
  deadline: string | null;
  description: string;
  status: string;
  createdAt: Date;
  client: { companyName: string; firstName: string; lastName: string; email: string };
};

export function BriefsList({ briefs }: { briefs: Brief[] }) {
  const [refusalReason, setRefusalReason] = useState("");
  const [refusingId, setRefusingId] = useState<string | null>(null);

  const handleAccept = async (id: string) => {
    await acceptBrief(id);
  };

  const handleRefuse = async (id: string) => {
    if (!refusalReason) return alert("Veuillez indiquer un motif de refus.");
    await refuseBrief(id, refusalReason);
    setRefusingId(null);
    setRefusalReason("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {briefs.map((brief) => (
        <div key={brief.id} className="nv-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
            <div>
              <h2 style={{ fontSize: "1.25rem", margin: "0 0 0.5rem" }}>
                {brief.projectName || `Brief: ${brief.serviceType}`}
              </h2>
              <p style={{ color: "var(--nv-text-secondary)", margin: 0 }}>
                Par {brief.client.companyName} ({brief.client.firstName} {brief.client.lastName})
              </p>
            </div>
            <span className="nv-badge">{new Date(brief.createdAt).toLocaleDateString()}</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem", padding: "1rem", background: "rgba(255,255,255,0.02)", borderRadius: "0.5rem" }}>
            <div><strong style={{ color: "var(--nv-text-muted)" }}>Type:</strong> {brief.serviceType}</div>
            <div><strong style={{ color: "var(--nv-text-muted)" }}>Budget:</strong> {brief.budget || "Non spécifié"}</div>
            <div><strong style={{ color: "var(--nv-text-muted)" }}>Délai:</strong> {brief.deadline || "Non spécifié"}</div>
            <div><strong style={{ color: "var(--nv-text-muted)" }}>Email:</strong> {brief.client.email}</div>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem", color: "var(--nv-text-secondary)" }}>Description</h3>
            <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{brief.description}</p>
          </div>

          {refusingId === brief.id ? (
            <div style={{ padding: "1rem", background: "rgba(239, 68, 68, 0.05)", borderRadius: "0.5rem", borderLeft: "4px solid #ef4444" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Motif du refus :</label>
              <textarea 
                className="nv-input" 
                value={refusalReason} 
                onChange={e => setRefusalReason(e.target.value)}
                placeholder="Expliquez pourquoi le brief est refusé..."
                style={{ width: "100%", minHeight: "80px", marginBottom: "1rem" }}
              />
              <div style={{ display: "flex", gap: "1rem" }}>
                <button className="nv-btn" style={{ background: "#ef4444", color: "white" }} onClick={() => handleRefuse(brief.id)}>Confirmer le refus</button>
                <button className="nv-btn" onClick={() => setRefusingId(null)}>Annuler</button>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "1rem" }}>
              <button 
                className="nv-btn nv-btn-primary" 
                onClick={() => handleAccept(brief.id)}
              >
                Accepter & Créer Projet
              </button>
              <button 
                className="nv-btn"
                style={{ background: "rgba(239, 68, 68, 0.1)", color: "#ef4444" }}
                onClick={() => setRefusingId(brief.id)}
              >
                Refuser
              </button>
            </div>
          )}
        </div>
      ))}
      {briefs.length === 0 && (
        <div className="nv-card" style={{ textAlign: "center", padding: "3rem" }}>
          <p style={{ color: "var(--nv-text-muted)" }}>Aucun brief en attente.</p>
        </div>
      )}
    </div>
  );
}
