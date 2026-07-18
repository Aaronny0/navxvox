import { db } from "@/lib/db";
import Link from "next/link";
import { deleteQuote, sendQuoteReminder, updateQuoteStatus } from "../../actions/quotes";

export default async function AdminQuotesPage({ searchParams }: { searchParams: Promise<{ projectId?: string }> }) {
  const params = await searchParams;
  const projectId = params.projectId;

  const where = projectId ? { projectId } : {};

  const quotes = await db.quote.findMany({
    where,
    include: {
      project: {
        include: { client: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem" }}>Gestion des Devis</h1>
        <Link href={`/admin/quotes/new${projectId ? `?projectId=${projectId}` : ""}`} className="nv-btn nv-btn-primary">
          + Nouveau Devis
        </Link>
      </div>

      <div className="nv-card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.05)", textAlign: "left", borderBottom: "1px solid var(--nv-border-light)" }}>
              <th style={{ padding: "1rem" }}>N° Devis</th>
              <th style={{ padding: "1rem" }}>Date & Validité</th>
              <th style={{ padding: "1rem" }}>Projet & Client</th>
              <th style={{ padding: "1rem" }}>Montant TTC</th>
              <th style={{ padding: "1rem" }}>Statut</th>
              <th style={{ padding: "1rem", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote) => {
              const isValid = new Date(quote.validUntil) >= new Date();
              return (
                <tr key={quote.id} style={{ borderBottom: "1px solid var(--nv-border-light)" }}>
                  <td style={{ padding: "1rem", fontWeight: "bold" }}>{quote.number}</td>
                  <td style={{ padding: "1rem" }}>
                    <div style={{ fontWeight: 600 }}>{new Date(quote.createdAt).toLocaleDateString()}</div>
                    <div style={{ fontSize: "0.85rem", color: !isValid && quote.status === "pending" ? "var(--nv-error)" : "var(--nv-text-secondary)" }}>
                      Valide jusqu'au {new Date(quote.validUntil).toLocaleDateString()}
                    </div>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <div style={{ fontWeight: 600 }}>{quote.project.name}</div>
                    <div style={{ fontSize: "0.85rem", color: "var(--nv-text-secondary)" }}>{quote.project.client.companyName}</div>
                  </td>
                  <td style={{ padding: "1rem", fontWeight: 600 }}>{quote.amountTTC.toFixed(2)} €</td>
                  <td style={{ padding: "1rem" }}>
                    <span className="nv-badge" style={{ 
                      background: quote.status === "accepted" ? "rgba(27, 138, 78, 0.12)" : quote.status === "refused" ? "rgba(198, 40, 40, 0.12)" : "rgba(230, 92, 0, 0.12)",
                      color: quote.status === "accepted" ? "var(--nv-success)" : quote.status === "refused" ? "var(--nv-error)" : "var(--nv-warning)"
                    }}>
                      {quote.status === "accepted" ? "Accepté" : quote.status === "refused" ? "Refusé" : "En attente"}
                    </span>
                    {quote.status === "refused" && quote.refusalNote && (
                      <div style={{ fontSize: "0.8rem", color: "var(--nv-text-muted)", marginTop: "0.25rem" }}>
                        Note: {quote.refusalNote}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: "1rem", textAlign: "right", display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                    {quote.status === "pending" && (
                      <>
                        <form action={async () => { "use server"; await sendQuoteReminder(quote.id); }}>
                          <button type="submit" className="nv-btn" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", background: "rgba(255,255,255,0.05)" }}>
                            Relancer
                          </button>
                        </form>
                        <form action={async () => { "use server"; await updateQuoteStatus(quote.id, "accepted"); }}>
                          <button type="submit" className="nv-btn" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", background: "rgba(27, 138, 78, 0.12)", color: "var(--nv-success)" }}>
                            Accepter
                          </button>
                        </form>
                      </>
                    )}
                    <a href={`/api/quotes/${quote.id}/pdf`} target="_blank" className="nv-btn" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", background: "rgba(255,255,255,0.05)" }}>
                      PDF
                    </a>
                    <form action={async () => { "use server"; await deleteQuote(quote.id); }}>
                      <button type="submit" className="nv-btn" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", background: "rgba(198, 40, 40, 0.12)", color: "var(--nv-error)" }}>
                        Suppr.
                      </button>
                    </form>
                  </td>
                </tr>
              );
            })}
            {quotes.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: "2rem", textAlign: "center", color: "var(--nv-text-muted)" }}>
                  Aucun devis trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
