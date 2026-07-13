import { db } from "@/lib/db";
import { ClientsTable } from "../../components/ClientsTable";

export default async function AdminClientsPage() {
  const users = await db.user.findMany({
    where: { role: "CLIENT" },
    include: {
      _count: {
        select: { projects: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  const clients = users.map(user => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    companyName: user.companyName,
    email: user.email,
    isActive: user.isActive,
    createdAt: user.createdAt,
    projectsCount: user._count.projects
  }));

  return (
    <div>
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Gestion des Clients</h1>
      <ClientsTable clients={clients} />
    </div>
  );
}
