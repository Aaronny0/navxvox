import { db } from "@/lib/db";
import Link from "next/link";
import { QuoteForm } from "../../../components/QuoteForm";

export default async function NewQuotePage({ searchParams }: { searchParams: Promise<{ projectId?: string }> }) {
  const params = await searchParams;
  const projects = await db.project.findMany({
    where: { status: { notIn: ["archived"] } },
    include: { client: { select: { companyName: true } } },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div style={{ maxWidth: "800px" }}>
      <div style={{ marginBottom: "2rem" }}>
        <Link href="/admin/quotes" style={{ color: "var(--nv-text-secondary)", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Retour aux devis
        </Link>
        <h1 style={{ fontSize: "2rem", marginTop: "0.5rem" }}>Créer un Devis</h1>
      </div>

      <QuoteForm projects={projects} preselectedProjectId={params.projectId} />
    </div>
  );
}
