"use client";

import { useState } from "react";
import { createPortfolioProject, updatePortfolioProject, deletePortfolioProject } from "../actions/portfolio";
import Image from "next/image";

type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  images: string;
  description: string;
  clientName: string | null;
  isPublished: boolean;
};

export function PortfolioManager({ projects }: { projects: Project[] }) {
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
          + Ajouter au portfolio
        </button>
      </div>

      {isAdding && (
        <form action={async (formData) => { await createPortfolioProject(formData); setIsAdding(false); }} className="nv-card" style={{ marginBottom: "2rem", border: "1px solid var(--nv-accent-violet)" }}>
          <h3 style={{ marginTop: 0, marginBottom: "1.5rem" }}>Nouveau Projet</h3>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div><label className="nv-label">Titre</label><input type="text" name="title" className="nv-input" required /></div>
            <div><label className="nv-label">Slug (ex: mon-projet)</label><input type="text" name="slug" className="nv-input" required /></div>
            <div><label className="nv-label">Catégorie</label><input type="text" name="category" className="nv-input" required /></div>
            <div><label className="nv-label">Image URL</label><input type="text" name="imageUrl" className="nv-input" required defaultValue="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80&w=800" /></div>
            <div><label className="nv-label">Nom du client</label><input type="text" name="clientName" className="nv-input" /></div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "1.5rem" }}>
              <input type="checkbox" name="isPublished" id="isPublished" />
              <label htmlFor="isPublished">Publier</label>
            </div>
          </div>
          
          <div style={{ marginBottom: "1rem" }}>
            <label className="nv-label">Description longue</label>
            <textarea name="description" className="nv-input" required rows={4}></textarea>
          </div>
          
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1.5rem" }}>
            <button type="button" className="nv-btn" onClick={() => setIsAdding(false)}>Annuler</button>
            <button type="submit" className="nv-btn nv-btn-primary">Enregistrer</button>
          </div>
        </form>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
        {projects.map((project) => {
          const images = JSON.parse(project.images || "[]");
          const imageUrl = images[0] || "";

          return (
            <div key={project.id} className="nv-card" style={{ display: "flex", flexDirection: "column", padding: 0, overflow: "hidden" }}>
              {editingId === project.id ? (
                <form action={async (formData) => { await updatePortfolioProject(formData); setEditingId(null); }} style={{ padding: "1.5rem" }}>
                  <input type="hidden" name="id" value={project.id} />
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
                    <input type="text" name="title" className="nv-input" defaultValue={project.title} required placeholder="Titre" />
                    <input type="text" name="slug" className="nv-input" defaultValue={project.slug} required placeholder="Slug" />
                    <input type="text" name="category" className="nv-input" defaultValue={project.category} required placeholder="Catégorie" />
                    <input type="text" name="imageUrl" className="nv-input" defaultValue={imageUrl} required placeholder="Image URL" />
                    <input type="text" name="clientName" className="nv-input" defaultValue={project.clientName || ""} placeholder="Client" />
                    <textarea name="description" className="nv-input" defaultValue={project.description} required rows={3} placeholder="Description"></textarea>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <input type="checkbox" name="isPublished" id={`pub-${project.id}`} defaultChecked={project.isPublished} />
                      <label htmlFor={`pub-${project.id}`}>Publier</label>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button type="submit" className="nv-btn nv-btn-primary" style={{ flex: 1, padding: "0.5rem", fontSize: "0.85rem" }}>Sauver</button>
                    <button type="button" className="nv-btn" onClick={() => setEditingId(null)} style={{ flex: 1, padding: "0.5rem", fontSize: "0.85rem" }}>Annuler</button>
                  </div>
                </form>
              ) : (
                <>
                  <div style={{ width: "100%", height: "200px", position: "relative" }}>
                    {imageUrl && <Image src={imageUrl} alt={project.title} fill style={{ objectFit: "cover" }} />}
                  </div>
                  <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: "0.8rem", color: "var(--nv-accent-violet)", fontWeight: 600, marginBottom: "0.5rem", textTransform: "uppercase" }}>
                      {project.category}
                    </div>
                    <h3 style={{ fontSize: "1.25rem", margin: "0 0 0.5rem" }}>{project.title}</h3>
                    <p style={{ color: "var(--nv-text-secondary)", fontSize: "0.9rem", flex: 1, marginBottom: "1rem", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {project.description}
                    </p>
                    <div style={{ display: "flex", gap: "0.5rem", borderTop: "1px solid var(--nv-border-light)", paddingTop: "1rem" }}>
                      <button 
                        onClick={() => setEditingId(project.id)} 
                        className="nv-btn" 
                        style={{ flex: 1, padding: "0.5rem", fontSize: "0.85rem", background: "rgba(255,255,255,0.05)" }}
                      >
                        Modifier
                      </button>
                      <button 
                        onClick={async () => { if(confirm("Supprimer ce projet ?")) await deletePortfolioProject(project.id); }} 
                        className="nv-btn" 
                        style={{ flex: 1, padding: "0.5rem", fontSize: "0.85rem", background: "rgba(239, 68, 68, 0.1)", color: "#ef4444" }}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
      {projects.length === 0 && !isAdding && (
        <div className="nv-card" style={{ textAlign: "center", padding: "3rem" }}>
          <p style={{ color: "var(--nv-text-muted)" }}>Aucun projet dans le portfolio.</p>
        </div>
      )}
    </div>
  );
}
