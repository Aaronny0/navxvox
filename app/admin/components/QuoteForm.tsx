"use client";

import { useState } from "react";
import { createQuote } from "../actions/quotes";

type Project = { id: string; name: string; client: { companyName: string } };

export function QuoteForm({ projects, preselectedProjectId }: { projects: Project[], preselectedProjectId?: string }) {
  const [lines, setLines] = useState([{ id: 1, description: "", quantity: 1, unitPriceHT: 0 }]);

  const addLine = () => {
    setLines([...lines, { id: Date.now(), description: "", quantity: 1, unitPriceHT: 0 }]);
  };

  const removeLine = (id: number) => {
    if (lines.length > 1) {
      setLines(lines.filter(l => l.id !== id));
    }
  };

  const totalHT = lines.reduce((acc, line) => acc + (line.quantity * line.unitPriceHT), 0);
  const totalTTC = totalHT * 1.2;

  // default valid date + 30 days
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 30);
  const defaultDateStr = defaultDate.toISOString().split("T")[0];

  return (
    <form action={createQuote} className="nv-card" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        <div>
          <label className="nv-label">Projet associé</label>
          <select name="projectId" className="nv-input" required defaultValue={preselectedProjectId || ""}>
            <option value="">Sélectionner un projet...</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.name} ({p.client.companyName})</option>
            ))}
          </select>
        </div>
        <div>
          <label className="nv-label">Date de validité (Jusqu'au)</label>
          <input type="date" name="validUntil" className="nv-input" defaultValue={defaultDateStr} required />
        </div>
      </div>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h3 style={{ fontSize: "1.1rem", margin: 0 }}>Lignes du devis</h3>
          <button type="button" onClick={addLine} className="nv-btn" style={{ padding: "0.25rem 0.75rem", fontSize: "0.85rem", background: "rgba(255,255,255,0.05)" }}>
            + Ajouter une ligne
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {lines.map((line, index) => (
            <div key={line.id} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{ flex: 2 }}>
                {index === 0 && <label className="nv-label" style={{ fontSize: "0.75rem" }}>Description</label>}
                <input 
                  type="text" 
                  name="line_description" 
                  className="nv-input" 
                  required 
                  value={line.description}
                  onChange={e => {
                    const newLines = [...lines];
                    newLines[index].description = e.target.value;
                    setLines(newLines);
                  }}
                />
              </div>
              <div style={{ width: "100px" }}>
                {index === 0 && <label className="nv-label" style={{ fontSize: "0.75rem" }}>Quantité</label>}
                <input 
                  type="number" 
                  name="line_quantity" 
                  className="nv-input" 
                  min="1" 
                  required 
                  value={line.quantity}
                  onChange={e => {
                    const newLines = [...lines];
                    newLines[index].quantity = parseInt(e.target.value) || 0;
                    setLines(newLines);
                  }}
                />
              </div>
              <div style={{ width: "120px" }}>
                {index === 0 && <label className="nv-label" style={{ fontSize: "0.75rem" }}>Prix Unitaire HT</label>}
                <input 
                  type="number" 
                  name="line_unitPriceHT" 
                  className="nv-input" 
                  min="0" 
                  step="0.01" 
                  required 
                  value={line.unitPriceHT}
                  onChange={e => {
                    const newLines = [...lines];
                    newLines[index].unitPriceHT = parseFloat(e.target.value) || 0;
                    setLines(newLines);
                  }}
                />
              </div>
              <div style={{ width: "100px", display: "flex", flexDirection: "column", justifyContent: index === 0 ? "flex-end" : "center", height: index === 0 ? "58px" : "auto" }}>
                <span style={{ fontWeight: 600 }}>{(line.quantity * line.unitPriceHT).toFixed(2)} €</span>
              </div>
              <div style={{ width: "40px", display: "flex", flexDirection: "column", justifyContent: index === 0 ? "flex-end" : "center", height: index === 0 ? "58px" : "auto" }}>
                {lines.length > 1 && (
                  <button type="button" onClick={() => removeLine(line.id)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "1.25rem" }}>
                    ×
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", padding: "1.5rem", background: "rgba(255,255,255,0.02)", borderRadius: "0.5rem" }}>
        <div style={{ textAlign: "right" }}>
          <p style={{ margin: "0 0 0.5rem", color: "var(--nv-text-secondary)" }}>Total HT : {totalHT.toFixed(2)} €</p>
          <p style={{ margin: 0, fontSize: "1.5rem", fontWeight: "bold", color: "var(--nv-accent-cyan)" }}>Total TTC : {totalTTC.toFixed(2)} €</p>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
        <button type="submit" className="nv-btn nv-btn-primary">
          Créer et envoyer le devis
        </button>
      </div>
    </form>
  );
}
