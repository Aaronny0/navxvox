"use client";

import { useState } from "react";
import { createService, updateService, deleteService } from "../actions/services";

type Service = {
  id: string;
  title: string;
  slug: string;
  icon: string | null;
  shortDesc: string;
  longDesc: string;
  estimatedTime: string | null;
  priceRange: string | null;
  isActive: boolean;
};

export function ServicesManager({ services }: { services: Service[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "2rem" }}>
        <button 
          className="nv-btn nv-btn-primary" 
          onClick={() => { setIsAdding(true); setEditingId(null); }}
          disabled={isAdding}
        >
          + Ajouter un service
        </button>
      </div>

      {isAdding && (
        <form action={async (formData) => { await createService(formData); setIsAdding(false); }} className="nv-card" style={{ marginBottom: "2rem", border: "1px solid var(--nv-accent-violet)" }}>
          <h3 style={{ marginTop: 0, marginBottom: "1.5rem" }}>Nouveau Service</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div><label className="nv-label">Titre</label><input type="text" name="title" className="nv-input" required /></div>
            <div><label className="nv-label">Slug</label><input type="text" name="slug" className="nv-input" required /></div>
            <div><label className="nv-label">Icône (Emoji)</label><input type="text" name="icon" className="nv-input" defaultValue="✨" /></div>
            <div><label className="nv-label">Description courte</label><input type="text" name="shortDesc" className="nv-input" required /></div>
            <div><label className="nv-label">Temps estimé</label><input type="text" name="estimatedTime" className="nv-input" placeholder="ex: 2 semaines" /></div>
            <div><label className="nv-label">Fourchette de prix</label><input type="text" name="priceRange" className="nv-input" placeholder="ex: À partir de 500€" /></div>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label className="nv-label">Description longue</label>
            <textarea name="longDesc" className="nv-input" required rows={3}></textarea>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "1.5rem" }}>
            <input type="checkbox" name="isActive" id="isActiveNew" defaultChecked />
            <label htmlFor="isActiveNew">Actif (visible sur le site)</label>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1.5rem" }}>
            <button type="button" className="nv-btn" onClick={() => setIsAdding(false)}>Annuler</button>
            <button type="submit" className="nv-btn nv-btn-primary">Enregistrer</button>
          </div>
        </form>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
        {services.map((service) => (
          <div key={service.id} className="nv-card" style={{ display: "flex", flexDirection: "column" }}>
            {editingId === service.id ? (
              <form action={async (formData) => { await updateService(formData); setEditingId(null); }}>
                <input type="hidden" name="id" value={service.id} />
                <div style={{ marginBottom: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <input type="text" name="title" className="nv-input" defaultValue={service.title} required />
                  <input type="text" name="slug" className="nv-input" defaultValue={service.slug} required />
                  <input type="text" name="icon" className="nv-input" defaultValue={service.icon || ""} />
                  <input type="text" name="shortDesc" className="nv-input" defaultValue={service.shortDesc} required />
                  <textarea name="longDesc" className="nv-input" defaultValue={service.longDesc} required rows={3}></textarea>
                  <input type="text" name="estimatedTime" className="nv-input" defaultValue={service.estimatedTime || ""} placeholder="Temps estimé" />
                  <input type="text" name="priceRange" className="nv-input" defaultValue={service.priceRange || ""} placeholder="Prix" />
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <input type="checkbox" name="isActive" id={`act-${service.id}`} defaultChecked={service.isActive} />
                    <label htmlFor={`act-${service.id}`} style={{ fontSize: "0.85rem" }}>Actif</label>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button type="submit" className="nv-btn nv-btn-primary" style={{ flex: 1, padding: "0.5rem", fontSize: "0.85rem" }}>Sauver</button>
                  <button type="button" className="nv-btn" onClick={() => setEditingId(null)} style={{ flex: 1, padding: "0.5rem", fontSize: "0.85rem" }}>Annuler</button>
                </div>
              </form>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <div style={{ fontSize: "2rem" }}>{service.icon}</div>
                  {!service.isActive && <span className="nv-badge" style={{ background: "rgba(198, 40, 40, 0.12)", color: "var(--nv-error)" }}>Inactif</span>}
                </div>
                <h3 style={{ fontSize: "1.25rem", margin: "0 0 0.5rem" }}>{service.title}</h3>
                <p style={{ color: "var(--nv-text-secondary)", fontSize: "0.9rem", flex: 1 }}>{service.shortDesc}</p>
                {service.priceRange && (
                  <p style={{ fontWeight: "bold", marginTop: "1rem" }}>{service.priceRange}</p>
                )}
                
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.5rem", borderTop: "1px solid var(--nv-border-light)", paddingTop: "1rem" }}>
                  <button 
                    onClick={() => setEditingId(service.id)} 
                    className="nv-btn" 
                    style={{ flex: 1, padding: "0.5rem", fontSize: "0.85rem", background: "rgba(255,255,255,0.05)" }}
                  >
                    Modifier
                  </button>
                  <button 
                    onClick={async () => { if(confirm("Supprimer ce service ?")) await deleteService(service.id); }} 
                    className="nv-btn" 
                    style={{ flex: 1, padding: "0.5rem", fontSize: "0.85rem", background: "rgba(198, 40, 40, 0.12)", color: "var(--nv-error)" }}
                  >
                    Supprimer
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      {services.length === 0 && !isAdding && (
        <div className="nv-card" style={{ textAlign: "center", padding: "3rem" }}>
          <p style={{ color: "var(--nv-text-muted)" }}>Aucun service au catalogue.</p>
        </div>
      )}
    </div>
  );
}
