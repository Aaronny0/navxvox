import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import BriefForm from "./BriefForm";

export default async function NewBriefPage() {
  const session = await getSession();
  if (!session) return null;

  const services = await db.service.findMany({
    where: { isActive: true },
    orderBy: { title: "asc" },
  });

  return <BriefForm services={services} />;
}
