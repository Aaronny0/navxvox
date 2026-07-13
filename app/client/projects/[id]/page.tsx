import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import MessageForm from "../../components/MessageForm";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) return null;

  const resolvedParams = await params;
  const projectId = resolvedParams.id;

  const project = await db.project.findFirst({
    where: { id: projectId, clientId: session.userId },
    include: {
      messages: { orderBy: { createdAt: "asc" } },
      files: { orderBy: { createdAt: "desc" } },
      quotes: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!project) notFound();

  const clientFiles = project.files.filter(f => f.uploadedBy === "client");
  const novavoxFiles = project.files.filter(f => f.uploadedBy === "novavox");

  const timelineSteps = [
    { label: "Brief reçu", done: true },
    { label: "Devis", done: project.quotes.length > 0 },
    { label: "Démarré", done: ["active", "revision", "delivered"].includes(project.status) },
    { label: "En production", done: ["active", "revision", "delivered"].includes(project.status) && project.progress > 20 },
    { label: "Révisions", done: ["revision", "delivered"].includes(project.status) },
    { label: "Livré", done: project.status === "delivered" },
  ];

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <Link href="/client/projects" style={{ color: "var(--nv-text-muted)", fontSize: "0.85rem", textDecoration: "none", display: "inline-block", marginBottom: "1rem" }}>
          ← Retour aux projets
        </Link>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 style={{ fontSize: "2rem", margin: "0 0 0.5rem" }}>{project.name}</h1>
            <p style={{ color: "var(--nv-text-secondary)", margin: 0 }}>
              {project.serviceType} • Créé le {new Date(project.createdAt).toLocaleDateString("fr-FR")}
            </p>
          </div>
          <span className="nv-badge">{project.status}</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="nv-card" style={{ marginBottom: "2rem", padding: "2rem", overflowX: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", minWidth: "600px", position: "relative" }}>
          {/* Progress Line */}
          <div style={{ position: "absolute", top: "12px", left: "24px", right: "24px", height: "2px", background: "rgba(255,255,255,0.1)", zIndex: 0 }} />
          
          {timelineSteps.map((step, i) => (
            <div key={step.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 1, gap: "0.75rem" }}>
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: step.done ? "var(--nv-accent-violet)" : "var(--nv-bg-primary)",
                  border: step.done ? "none" : "2px solid rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "0.75rem",
                }}
              >
                {step.done && "✓"}
              </div>
              <span style={{ fontSize: "0.8rem", color: step.done ? "var(--nv-text-primary)" : "var(--nv-text-muted)", fontWeight: step.done ? 600 : 400 }}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem", alignItems: "start" }}>
        {/* Messages */}
        <div className="nv-card" style={{ display: "flex", flexDirection: "column", height: "600px" }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}>Discussion</h2>
          
          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "1rem", paddingRight: "0.5rem" }}>
            {project.messages.length === 0 ? (
              <p style={{ color: "var(--nv-text-muted)", textAlign: "center", margin: "auto" }}>Aucun message.</p>
            ) : (
              project.messages.map((msg) => {
                const isMe = msg.senderType === "client";
                return (
                  <div key={msg.id} style={{ alignSelf: isMe ? "flex-end" : "flex-start", maxWidth: "80%" }}>
                    <div
                      style={{
                        padding: "0.75rem 1rem",
                        borderRadius: "var(--nv-radius-md)",
                        background: isMe ? "var(--nv-accent-violet)" : "rgba(255,255,255,0.05)",
                        color: "#fff",
                        borderBottomRightRadius: isMe ? 0 : "var(--nv-radius-md)",
                        borderBottomLeftRadius: !isMe ? 0 : "var(--nv-radius-md)",
                      }}
                    >
                      <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.5 }}>{msg.content}</p>
                    </div>
                    <span style={{ fontSize: "0.7rem", color: "var(--nv-text-muted)", display: "block", marginTop: "0.25rem", textAlign: isMe ? "right" : "left" }}>
                      {new Date(msg.createdAt).toLocaleString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                );
              })
            )}
          </div>

          <MessageForm projectId={project.id} />
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          {/* Quotes */}
          {project.quotes.length > 0 && (
            <div className="nv-card">
              <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Devis</h3>
              {project.quotes.map((q) => (
                <div key={q.id} style={{ padding: "1rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--nv-radius-md)", border: "1px solid var(--nv-border-light)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <span style={{ fontWeight: 600 }}>{q.number}</span>
                    <span className="nv-badge">{q.status}</span>
                  </div>
                  <p style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 1rem", color: "var(--nv-accent-violet)" }}>
                    {q.amountTTC.toFixed(2)} € <span style={{ fontSize: "0.75rem", color: "var(--nv-text-muted)", fontWeight: 400 }}>TTC</span>
                  </p>
                  {q.status === "pending" && (
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button className="nv-btn nv-btn-primary" style={{ flex: 1, padding: "0.5rem", fontSize: "0.8rem", justifyContent: "center" }}>Accepter</button>
                      <button className="nv-btn nv-btn-ghost" style={{ flex: 1, padding: "0.5rem", fontSize: "0.8rem", justifyContent: "center", color: "#ef4444" }}>Refuser</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Files */}
          <div className="nv-card">
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Fichiers (Livrables)</h3>
            {novavoxFiles.length === 0 ? (
              <p style={{ fontSize: "0.85rem", color: "var(--nv-text-muted)" }}>Aucun livrable pour l'instant.</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {novavoxFiles.map(f => (
                  <li key={f.id}>
                    <a href={f.fileUrl} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--nv-text-secondary)", textDecoration: "none" }}>
                      <span>📄</span> {f.fileName}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            
            <h3 style={{ fontSize: "1.1rem", margin: "1.5rem 0 1rem" }}>Mes fichiers</h3>
            {clientFiles.length === 0 ? (
              <p style={{ fontSize: "0.85rem", color: "var(--nv-text-muted)" }}>Vous n'avez envoyé aucun fichier.</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {clientFiles.map(f => (
                  <li key={f.id}>
                    <a href={f.fileUrl} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--nv-text-secondary)", textDecoration: "none" }}>
                      <span>📎</span> {f.fileName}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <button className="nv-btn nv-btn-ghost" style={{ width: "100%", marginTop: "1rem", justifyContent: "center", fontSize: "0.85rem", padding: "0.5rem" }}>
              + Ajouter un fichier
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
