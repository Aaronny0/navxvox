"use client";

import { useState } from "react";
import { createTeamMember, updateTeamMember } from "../actions/team";

type Member = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isActive: boolean;
};

export function TeamManager({ members, currentUserId }: { members: Member[], currentUserId: string }) {
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "2rem" }}>
        <button 
          className="nv-btn nv-btn-primary" 
          onClick={() => setIsAdding(true)}
          disabled={isAdding}
        >
          + Ajouter un membre
        </button>
      </div>

      {isAdding && (
        <form action={async (formData) => {
          const res = await createTeamMember(formData);
          if (res?.error) setError(res.error);
          else { setError(null); setIsAdding(false); }
        }} className="nv-card" style={{ marginBottom: "2rem", border: "1px solid var(--nv-accent-violet)" }}>
          <h3 style={{ marginTop: 0, marginBottom: "1.5rem" }}>Nouveau Membre</h3>
          {error && <p style={{ color: "var(--nv-error)", marginBottom: "1rem" }}>{error}</p>}
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div><label className="nv-label">Prénom</label><input type="text" name="firstName" className="nv-input" required /></div>
            <div><label className="nv-label">Nom</label><input type="text" name="lastName" className="nv-input" required /></div>
            <div><label className="nv-label">Email</label><input type="email" name="email" className="nv-input" required /></div>
            <div><label className="nv-label">Mot de passe temporaire</label><input type="text" name="password" className="nv-input" placeholder="Par défaut: Novavox2026!" /></div>
            <div>
              <label className="nv-label">Rôle</label>
              <select name="role" className="nv-input" required>
                <option value="ADMIN">Administrateur</option>
                <option value="EMPLOYEE">Employé</option>
              </select>
            </div>
          </div>
          
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1.5rem" }}>
            <button type="button" className="nv-btn" onClick={() => setIsAdding(false)}>Annuler</button>
            <button type="submit" className="nv-btn nv-btn-primary">Enregistrer</button>
          </div>
        </form>
      )}

      <div className="nv-card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.05)", textAlign: "left", borderBottom: "1px solid var(--nv-border-light)" }}>
              <th style={{ padding: "1rem" }}>Membre</th>
              <th style={{ padding: "1rem" }}>Email</th>
              <th style={{ padding: "1rem" }}>Rôle</th>
              <th style={{ padding: "1rem" }}>Statut</th>
              <th style={{ padding: "1rem", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} style={{ borderBottom: "1px solid var(--nv-border-light)" }}>
                <td style={{ padding: "1rem", fontWeight: 600 }}>{member.firstName} {member.lastName}</td>
                <td style={{ padding: "1rem", color: "var(--nv-text-secondary)" }}>{member.email}</td>
                <td style={{ padding: "1rem" }}>
                  <span className="nv-badge" style={{ background: member.role === "SUPER_ADMIN" ? "rgba(26, 111, 212, 0.12)" : "rgba(255,255,255,0.05)", color: member.role === "SUPER_ADMIN" ? "var(--nv-accent-violet)" : "var(--nv-text-primary)" }}>
                    {member.role}
                  </span>
                </td>
                <td style={{ padding: "1rem" }}>
                  <span className="nv-badge" style={{ background: member.isActive ? "rgba(27, 138, 78, 0.12)" : "rgba(198, 40, 40, 0.12)", color: member.isActive ? "var(--nv-success)" : "var(--nv-error)" }}>
                    {member.isActive ? "Actif" : "Inactif"}
                  </span>
                </td>
                <td style={{ padding: "1rem", textAlign: "right" }}>
                  {member.id !== currentUserId && member.role !== "SUPER_ADMIN" && (
                    <form action={async (formData) => { await updateTeamMember(formData); }} style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                      <input type="hidden" name="id" value={member.id} />
                      <select name="role" className="nv-input" style={{ width: "auto", padding: "0.25rem" }} defaultValue={member.role}>
                        <option value="ADMIN">ADMIN</option>
                        <option value="EMPLOYEE">EMPLOYEE</option>
                      </select>
                      <label style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.85rem", cursor: "pointer" }}>
                        <input type="checkbox" name="isActive" defaultChecked={member.isActive} />
                        Actif
                      </label>
                      <button type="submit" className="nv-btn nv-btn-primary" style={{ padding: "0.25rem 0.75rem", fontSize: "0.85rem" }}>
                        Appliquer
                      </button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
