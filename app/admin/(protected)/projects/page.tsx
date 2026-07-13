import { db } from "@/lib/db";
import { ProjectsTable } from "../../components/ProjectsTable";

export default async function AdminProjectsPage() {
  const projects = await db.project.findMany({
    include: { client: { select: { companyName: true } } },
    orderBy: { updatedAt: "desc" }
  });

  return (
    <div>
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Gestion des Projets</h1>
      <ProjectsTable projects={projects} />
    </div>
  );
}
