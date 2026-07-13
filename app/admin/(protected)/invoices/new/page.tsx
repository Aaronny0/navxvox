import { db } from "@/lib/db";
import Link from "next/link";
import { InvoiceForm } from "../../../components/InvoiceForm";

export default async function NewInvoicePage() {
  const clients = await db.user.findMany({
    where: { role: "CLIENT" },
    select: { id: true, companyName: true, firstName: true, lastName: true },
    orderBy: { companyName: "asc" }
  });

  return (
    <div style={{ maxWidth: "800px" }}>
      <div style={{ marginBottom: "2rem" }}>
        <Link href="/admin/invoices" style={{ color: "var(--nv-text-secondary)", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Retour aux factures
        </Link>
        <h1 style={{ fontSize: "2rem", marginTop: "0.5rem" }}>Créer une Facture</h1>
      </div>

      <InvoiceForm clients={clients as any} />
    </div>
  );
}
