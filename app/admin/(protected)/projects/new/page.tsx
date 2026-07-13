import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function NewProjectPage() {
  const clients = await db.user.findMany({
    where: { role: "CLIENT", isActive: true },
    select: { id: true, companyName: true, firstName: true, lastName: true },
    orderBy: { companyName: "asc" }
  });

  async function createProject(formData: FormData) {
    "use server";
    const clientId = formData.get("clientId") as string;
    const name = formData.get("name") as string;
    const serviceType = formData.get("serviceType") as string;
    const estimatedAt = formData.get("estimatedAt") as string;

    const project = await db.project.create({
      data: {
        clientId,
        name,
        serviceType,
        status: "active",
        progress: 0,
        estimatedAt: estimatedAt ? new Date(estimatedAt) : null,
      }
    });

    redirect(`/admin/projects/${project.id}`);
  }

  return (
    <div style={{ maxWidth: "600px" }}>
      <div style={{ marginBottom: "2rem" }}>
        <Link href="/admin/projects" style={{ color: "var(--nv-text-secondary)", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Retour aux projets
        </Link>
        <h1 style={{ fontSize: "2rem", marginTop: "0.5rem" }}>Nouveau Projet</h1>
      </div>

      <form action={createProject} className="nv-card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <label className="nv-label">Client</label>
          <select name="clientId" className="nv-input" required>
            <option value="">Sélectionner un client...</option>
            {clients.map(c => (
              <option key={c.id} value={c.id}>{c.companyName} ({c.firstName} {c.lastName})</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="nv-label">Nom du projet</label>
          <input type="text" name="name" className="nv-input" required placeholder="Ex: Refonte Site E-commerce" />
        </div>
        
        <div>
          <label className="nv-label">Type de service</label>
          <select name="serviceType" className="nv-input" required>
            <option value="">Sélectionner un service...</option>
            <option value="Développement Web">Développement Web</option>
            <option value="Design UI/UX">Design UI/UX</option>
            <option value="Branding">Branding</option>
            <option value="Marketing Digital">Marketing Digital</option>
            <option value="Autre">Autre</option>
          </select>
        </div>

        <div>
          <label className="nv-label">Date de livraison estimée (optionnel)</label>
          <input type="date" name="estimatedAt" className="nv-input" />
        </div>

        <button type="submit" className="nv-btn nv-btn-primary" style={{ marginTop: "1rem" }}>
          Créer le projet
        </button>
      </form>
    </div>
  );
}
