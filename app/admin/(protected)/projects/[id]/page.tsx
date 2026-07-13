import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { updateProject, sendProjectMessage } from "../../../actions/projects";

export default async function AdminProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const project = await db.project.findUnique({
    where: { id },
    include: {
      client: true,
      messages: {
        include: { sender: true },
        orderBy: { createdAt: "asc" }
      },
      quotes: true,
    }
  });

  const invoicesCount = project ? await db.invoice.count({ where: { clientId: project.clientId } }) : 0;

  if (!project) notFound();

  return (
    <div style={{ maxWidth: "1000px" }}>
      <div style={{ marginBottom: "2rem" }}>
        <Link href="/admin/projects" style={{ color: "var(--nv-text-secondary)", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Retour aux projets
        </Link>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "0.5rem" }}>
          <div>
            <h1 style={{ fontSize: "2rem", margin: "0 0 0.25rem" }}>{project.name}</h1>
            <p style={{ color: "var(--nv-text-secondary)", margin: 0, fontSize: "1.1rem" }}>
              Client : {project.client.companyName} ({project.client.firstName} {project.client.lastName})
            </p>
          </div>
          <span className="nv-badge">{project.status}</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "3rem" }}>
        {/* Gestion du Projet */}
        <form action={updateProject} className="nv-card">
          <h2 style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}>Gestion du Projet</h2>
          <input type="hidden" name="projectId" value={project.id} />
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label className="nv-label">Statut</label>
              <select name="status" className="nv-input" defaultValue={project.status}>
                <option value="pending">En attente</option>
                <option value="active">En cours</option>
                <option value="revision">En révision</option>
                <option value="delivered">Livré</option>
                <option value="archived">Archivé</option>
              </select>
            </div>
            
            <div>
              <label className="nv-label">Progression (%)</label>
              <input type="number" name="progress" min="0" max="100" className="nv-input" defaultValue={project.progress} />
            </div>

            <div>
              <label className="nv-label">Assigné à</label>
              <input type="text" name="assignedTo" className="nv-input" defaultValue={project.assignedTo || ""} placeholder="Nom de l'admin / employé" />
            </div>

            <div>
              <label className="nv-label">Date de livraison prévue</label>
              <input type="date" name="estimatedAt" className="nv-input" defaultValue={project.estimatedAt ? new Date(project.estimatedAt).toISOString().split("T")[0] : ""} />
            </div>

            <button type="submit" className="nv-btn nv-btn-primary" style={{ marginTop: "1rem" }}>
              Mettre à jour le projet
            </button>
          </div>
        </form>

        {/* Détails et Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div className="nv-card">
            <h2 style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}>Informations</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div><strong style={{ display: "block", color: "var(--nv-text-muted)", fontSize: "0.85rem" }}>Type de service</strong> {project.serviceType}</div>
              <div><strong style={{ display: "block", color: "var(--nv-text-muted)", fontSize: "0.85rem" }}>Créé le</strong> {new Date(project.createdAt).toLocaleDateString()}</div>
              <div><strong style={{ display: "block", color: "var(--nv-text-muted)", fontSize: "0.85rem" }}>Email client</strong> <a href={`mailto:${project.client.email}`} style={{ color: "var(--nv-accent-violet)" }}>{project.client.email}</a></div>
              <div><strong style={{ display: "block", color: "var(--nv-text-muted)", fontSize: "0.85rem" }}>Téléphone</strong> {project.client.phone || "N/A"}</div>
            </div>
          </div>
          
          <div className="nv-card">
            <h2 style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}>Documents Liés</h2>
            <div style={{ display: "flex", gap: "1rem" }}>
              <Link href={`/admin/quotes?projectId=${project.id}`} className="nv-btn" style={{ flex: 1, justifyContent: "center" }}>
                Devis ({project.quotes.length})
              </Link>
              <Link href={`/admin/invoices`} className="nv-btn" style={{ flex: 1, justifyContent: "center" }}>
                Factures du client ({invoicesCount})
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Messagerie */}
      <div className="nv-card">
        <h2 style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}>Fil de messagerie</h2>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem", maxHeight: "400px", overflowY: "auto", paddingRight: "0.5rem" }}>
          {project.messages.length === 0 ? (
            <p style={{ textAlign: "center", color: "var(--nv-text-muted)", padding: "2rem 0" }}>
              Aucun message pour ce projet.
            </p>
          ) : (
            project.messages.map((msg) => {
              const isAdmin = msg.senderType === "admin";
              return (
                <div key={msg.id} style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isAdmin ? "flex-end" : "flex-start",
                }}>
                  <div style={{
                    maxWidth: "80%",
                    padding: "1rem",
                    borderRadius: "1rem",
                    background: isAdmin ? "var(--nv-accent-violet)" : "rgba(255,255,255,0.05)",
                    borderBottomRightRadius: isAdmin ? 0 : "1rem",
                    borderBottomLeftRadius: isAdmin ? "1rem" : 0,
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem", marginBottom: "0.5rem" }}>
                      <strong style={{ fontSize: "0.85rem", color: isAdmin ? "rgba(255,255,255,0.9)" : "var(--nv-text-primary)" }}>
                        {isAdmin ? "Équipe NOVAVOX" : `${msg.sender.firstName} ${msg.sender.lastName}`}
                      </strong>
                      <span style={{ fontSize: "0.75rem", color: isAdmin ? "rgba(255,255,255,0.7)" : "var(--nv-text-muted)" }}>
                        {new Date(msg.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p style={{ margin: 0, whiteSpace: "pre-wrap", color: isAdmin ? "white" : "var(--nv-text-secondary)" }}>
                      {msg.content}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <form action={sendProjectMessage} style={{ display: "flex", gap: "1rem" }}>
          <input type="hidden" name="projectId" value={project.id} />
          <input 
            type="text" 
            name="content" 
            className="nv-input" 
            style={{ flex: 1 }} 
            placeholder="Écrivez un message au client..."
            required 
          />
          <button type="submit" className="nv-btn nv-btn-primary">Envoyer</button>
        </form>
      </div>

    </div>
  );
}
