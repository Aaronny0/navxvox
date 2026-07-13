import { db } from "@/lib/db";
import { PortfolioManager } from "../../components/PortfolioManager";

export default async function AdminPortfolioPage() {
  const projects = await db.portfolioProject.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Portfolio</h1>
      <PortfolioManager projects={projects} />
    </div>
  );
}
