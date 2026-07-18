import { db } from "@/lib/db";
import Link from "next/link";
import { deleteInvoice, sendInvoiceReminder, updateInvoiceStatus } from "../../actions/invoices";

export default async function AdminInvoicesPage() {
  const invoices = await db.invoice.findMany({
    include: {
      client: true
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem" }}>Gestion des Factures</h1>
        <Link href="/admin/invoices/new" className="nv-btn nv-btn-primary">
          + Nouvelle Facture
        </Link>
      </div>

      <div className="nv-card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.05)", textAlign: "left", borderBottom: "1px solid var(--nv-border-light)" }}>
              <th style={{ padding: "1rem" }}>N° Facture</th>
              <th style={{ padding: "1rem" }}>Date & Échéance</th>
              <th style={{ padding: "1rem" }}>Client</th>
              <th style={{ padding: "1rem" }}>Montant TTC</th>
              <th style={{ padding: "1rem" }}>Statut</th>
              <th style={{ padding: "1rem", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => {
              const isOverdue = invoice.status !== "paid" && invoice.dueDate && new Date(invoice.dueDate) < new Date();
              return (
                <tr key={invoice.id} style={{ borderBottom: "1px solid var(--nv-border-light)" }}>
                  <td style={{ padding: "1rem", fontWeight: "bold" }}>{invoice.number}</td>
                  <td style={{ padding: "1rem" }}>
                    <div style={{ fontWeight: 600 }}>{new Date(invoice.createdAt).toLocaleDateString()}</div>
                    {invoice.dueDate && (
                      <div style={{ fontSize: "0.85rem", color: isOverdue ? "var(--nv-error)" : "var(--nv-text-secondary)", fontWeight: isOverdue ? "bold" : "normal" }}>
                        Échéance: {new Date(invoice.dueDate).toLocaleDateString()}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <div style={{ fontWeight: 600 }}>{invoice.client.companyName}</div>
                    <div style={{ fontSize: "0.85rem", color: "var(--nv-text-secondary)" }}>{invoice.client.firstName} {invoice.client.lastName}</div>
                  </td>
                  <td style={{ padding: "1rem", fontWeight: 600 }}>{invoice.amountTTC.toFixed(2)} €</td>
                  <td style={{ padding: "1rem" }}>
                    <form action={async () => { "use server"; await updateInvoiceStatus(invoice.id, invoice.status === "paid" ? "sent" : "paid"); }}>
                      <button type="submit" className="nv-badge" style={{ 
                        background: invoice.status === "paid" ? "rgba(27, 138, 78, 0.12)" : isOverdue ? "rgba(198, 40, 40, 0.12)" : "rgba(230, 92, 0, 0.12)",
                        color: invoice.status === "paid" ? "var(--nv-success)" : isOverdue ? "var(--nv-error)" : "var(--nv-warning)",
                        border: "none", cursor: "pointer"
                      }}>
                        {invoice.status === "paid" ? "Payée" : isOverdue ? "En retard" : "Envoyée"}
                      </button>
                    </form>
                  </td>
                  <td style={{ padding: "1rem", textAlign: "right", display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                    {invoice.status !== "paid" && (
                      <form action={async () => { "use server"; await sendInvoiceReminder(invoice.id); }}>
                        <button type="submit" className="nv-btn" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", background: "rgba(255,255,255,0.05)" }}>
                          Relancer
                        </button>
                      </form>
                    )}
                    <a href={`/api/invoices/${invoice.id}/pdf`} target="_blank" className="nv-btn" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", background: "rgba(255,255,255,0.05)" }}>
                      PDF
                    </a>
                    <form action={async () => { "use server"; await deleteInvoice(invoice.id); }}>
                      <button type="submit" className="nv-btn" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", background: "rgba(198, 40, 40, 0.12)", color: "var(--nv-error)" }}>
                        Suppr.
                      </button>
                    </form>
                  </td>
                </tr>
              );
            })}
            {invoices.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: "2rem", textAlign: "center", color: "var(--nv-text-muted)" }}>
                  Aucune facture trouvée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
