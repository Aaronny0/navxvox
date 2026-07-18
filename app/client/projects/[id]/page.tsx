import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import MessageForm from "../../components/MessageForm";
import QuoteResponseForm from "../../components/QuoteResponseForm";

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return { bg: "rgba(230,92,0,0.12)", text: "var(--nv-warning)", label: "En attente" };
      case "active": return { bg: "rgba(46,196,182,0.12)", text: "var(--nv-accent-violet)", label: "En cours" };
      case "revision": return { bg: "rgba(230,92,0,0.12)", text: "var(--nv-warning)", label: "En révision" };
      case "delivered": return { bg: "rgba(27,138,78,0.12)", text: "var(--nv-success)", label: "Livré" };
      default: return { bg: "rgba(255,255,255,0.05)", text: "var(--nv-text-secondary)", label: status };
    }
  };

  const statusStyle = getStatusColor(project.status);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <Link href="/client/projects" style={{ color: "var(--nv-text-muted)", fontSize: "0.8rem", textDecoration: "none", display: "inline-block", marginBottom: "0.75rem" }}>
          ← Retour aux projets
        </Link>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "1.5rem", margin: "0 0 0.5rem", fontWeight: 700 }}>{project.name}</h1>
            <p style={{ color: "var(--nv-text-secondary)", margin: 0, fontSize: "0.85rem" }}>
              {project.serviceType} • Créé le {new Date(project.createdAt).toLocaleDateString("fr-FR", { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>
          <span
            style={{
              padding: "0.4rem 0.8rem",
              borderRadius: "20px",
              fontSize: "0.75rem",
              fontWeight: 600,
              background: statusStyle.bg,
              color: statusStyle.text,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              whiteSpace: "nowrap",
            }}
          >
            {statusStyle.label}
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ 
        background: "var(--nv-bg-card)", 
        border: "1px solid var(--nv-border-light)", 
        borderRadius: "12px", 
        padding: "1.5rem", 
        marginBottom: "1.5rem", 
        overflowX: "auto" 
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", minWidth: "500px", position: "relative" }}>
          <div style={{ position: "absolute", top: "12px", left: "20px", right: "20px", height: "2px", background: "rgba(255,255,255,0.1)", zIndex: 0 }} />
          
          {timelineSteps.map((step, i) => (
            <div key={step.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 1, gap: "0.5rem" }}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: step.done ? "var(--nv-accent-violet)" : "var(--nv-bg-primary)",
                  border: step.done ? "none" : "2px solid rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "0.7rem",
                }}
              >
                {step.done && "✓"}
              </div>
              <span style={{ fontSize: "0.7rem", color: step.done ? "var(--nv-text-primary)" : "var(--nv-text-muted)", fontWeight: step.done ? 600 : 400 }}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem", alignItems: "start" }}>
        {/* Messages */}
        <div style={{ 
          background: "var(--nv-bg-card)", 
          border: "1px solid var(--nv-border-light)", 
          borderRadius: "12px", 
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          height: "500px",
        }}>
          <h2 style={{ fontSize: "1rem", marginBottom: "1rem", fontWeight: 600 }}>Discussion</h2>
          
          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.75rem", paddingRight: "0.5rem" }}>
            {project.messages.length === 0 ? (
              <p style={{ color: "var(--nv-text-muted)", textAlign: "center", margin: "auto", fontSize: "0.85rem" }}>Aucun message.</p>
            ) : (
              project.messages.map((msg) => {
                const isMe = msg.senderType === "client";
                return (
                  <div key={msg.id} style={{ alignSelf: isMe ? "flex-end" : "flex-start", maxWidth: "80%" }}>
                    <div
                      style={{
                        padding: "0.75rem 1rem",
                        borderRadius: "12px",
                        background: isMe ? "var(--nv-accent-violet)" : "rgba(255,255,255,0.05)",
                        color: isMe ? "#fff" : "var(--nv-text-primary)",
                        borderBottomRightRadius: isMe ? 4 : 12,
                        borderBottomLeftRadius: !isMe ? 4 : 12,
                      }}
                    >
                      <p style={{ margin: 0, fontSize: "0.85rem", lineHeight: 1.5 }}>{msg.content}</p>
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
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          
          {/* Quotes */}
          {project.quotes.length > 0 && (
            <div style={{ 
              background: "var(--nv-bg-card)", 
              border: "1px solid var(--nv-border-light)", 
              borderRadius: "12px", 
              padding: "1.25rem" 
            }}>
              <h3 style={{ fontSize: "0.9rem", marginBottom: "0.75rem", fontWeight: 600 }}>Devis</h3>
              {project.quotes.map((q) => (
                <div key={q.id} style={{ 
                  padding: "1rem", 
                  background: "rgba(255,255,255,0.03)", 
                  borderRadius: "8px", 
                  border: "1px solid var(--nv-border-light)",
                  marginBottom: "0.75rem"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <span style={{ fontWeight: 600, fontSize: "0.85rem" }}>{q.number}</span>
                    <span style={{ 
                      fontSize: "0.7rem", 
                      padding: "0.2rem 0.5rem", 
                      borderRadius: "12px", 
                      background: q.status === "accepted" ? "rgba(27,138,78,0.12)" : "rgba(230,92,0,0.12)",
                      color: q.status === "accepted" ? "var(--nv-success)" : "var(--nv-warning)",
                      textTransform: "uppercase",
                      fontWeight: 600
                    }}>{q.status}</span>
                  </div>
                  <p style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 0.75rem", color: "var(--nv-accent-violet)" }}>
                    {q.amountTTC.toFixed(2)} € <span style={{ fontSize: "0.7rem", color: "var(--nv-text-muted)", fontWeight: 400 }}>TTC</span>
                  </p>
                  {q.status === "pending" && (
                    <QuoteResponseForm quoteId={q.id} />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Files */}
          <div style={{ 
            background: "var(--nv-bg-card)", 
            border: "1px solid var(--nv-border-light)", 
            borderRadius: "12px", 
            padding: "1.25rem" 
          }}>
            <h3 style={{ fontSize: "0.9rem", marginBottom: "0.75rem", fontWeight: 600 }}>Livrables NOVAVOX</h3>
            {novavoxFiles.length === 0 ? (
              <p style={{ fontSize: "0.8rem", color: "var(--nv-text-muted)" }}>Aucun livrable pour l'instant.</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {novavoxFiles.map(f => (
                  <li key={f.id}>
                    <a href={f.fileUrl} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--nv-text-secondary)", textDecoration: "none", padding: "0.5rem", borderRadius: "6px", background: "rgba(255,255,255,0.02)" }}>
                      <span>📄</span> {f.fileName}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            
            <h3 style={{ fontSize: "0.9rem", margin: "1.25rem 0 0.75rem", fontWeight: 600 }}>Mes fichiers</h3>
            {clientFiles.length === 0 ? (
              <p style={{ fontSize: "0.8rem", color: "var(--nv-text-muted)" }}>Vous n'avez envoyé aucun fichier.</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {clientFiles.map(f => (
                  <li key={f.id}>
                    <a href={f.fileUrl} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--nv-text-secondary)", textDecoration: "none", padding: "0.5rem", borderRadius: "6px", background: "rgba(255,255,255,0.02)" }}>
                      <span>📎</span> {f.fileName}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <button className="nv-btn nv-btn-ghost" style={{ width: "100%", marginTop: "1rem", justifyContent: "center", fontSize: "0.8rem", padding: "0.5rem", borderRadius: "8px" }}>
              + Ajouter un fichier
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
