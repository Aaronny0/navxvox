import { db } from "@/lib/db";
import { BriefsList } from "../../components/BriefsList";

export default async function AdminBriefsPage() {
  const briefs = await db.brief.findMany({
    where: { status: "received" },
    include: { client: true },
    orderBy: { createdAt: "asc" }
  });

  return (
    <div>
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Briefs en attente</h1>
      <BriefsList briefs={briefs} />
    </div>
  );
}
