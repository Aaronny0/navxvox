import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export default async function InvoicesPage() {
  const session = await getSession();
  if (!session) return null;

  const invoices = await db.invoice.findMany({
    where: { clientId: session.userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", margin: "0 0 0.5rem" }}>Mes Factures</h1>
        <p style={{ color: "var(--nv-text-secondary)", margin: 0 }}>
          Retrouvez ici l'historique de vos factures et paiements.
        </p>
      </div>

      <div className="nv-card" style={{ padding: 0, overflow: "hidden" }}>
        {invoices.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
            <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>🧾</span>
            <p style={{ color: "var(--nv-text-muted)" }}>Aucune facture pour le moment.</p>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid var(--nv-border-light)", textAlign: "left" }}>
                <th style={{ padding: "1rem 1.5rem", fontWeight: 600, fontSize: "0.85rem", color: "var(--nv-text-secondary)" }}>Numéro</th>
                <th style={{ padding: "1rem 1.5rem", fontWeight: 600, fontSize: "0.85rem", color: "var(--nv-text-secondary)" }}>Date</th>
                <th style={{ padding: "1rem 1.5rem", fontWeight: 600, fontSize: "0.85rem", color: "var(--nv-text-secondary)" }}>Montant TTC</th>
                <th style={{ padding: "1rem 1.5rem", fontWeight: 600, fontSize: "0.85rem", color: "var(--nv-text-secondary)" }}>Statut</th>
                <th style={{ padding: "1rem 1.5rem", fontWeight: 600, fontSize: "0.85rem", color: "var(--nv-text-secondary)", textAlign: "right" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} style={{ borderBottom: "1px solid var(--nv-border-light)" }}>
                  <td style={{ padding: "1rem 1.5rem", fontWeight: 500 }}>{inv.number}</td>
                  <td style={{ padding: "1rem 1.5rem", fontSize: "0.9rem" }}>{new Date(inv.createdAt).toLocaleDateString("fr-FR")}</td>
                  <td style={{ padding: "1rem 1.5rem", fontWeight: 600 }}>{inv.amountTTC.toFixed(2)} €</td>
                  <td style={{ padding: "1rem 1.5rem" }}>
                    <span
                      style={{
                        padding: "0.25rem 0.6rem",
                        borderRadius: "100px",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        background: inv.status === "paid" ? "rgba(34,197,94,0.1)" : inv.status === "sent" ? "rgba(245,158,11,0.1)" : "rgba(255,255,255,0.1)",
                        color: inv.status === "paid" ? "#22c55e" : inv.status === "sent" ? "#f59e0b" : "var(--nv-text-secondary)",
                      }}
                    >
                      {inv.status === "paid" ? "Payée" : inv.status === "viewed" ? "Vue" : "Envoyée"}
                    </span>
                  </td>
                  <td style={{ padding: "1rem 1.5rem", textAlign: "right" }}>
                    {inv.pdfUrl ? (
                      <a href={inv.pdfUrl} target="_blank" rel="noreferrer" className="nv-btn nv-btn-ghost" style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}>
                        Télécharger PDF
                      </a>
                    ) : (
                      <span style={{ fontSize: "0.8rem", color: "var(--nv-text-muted)" }}>En cours...</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
