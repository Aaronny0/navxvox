import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { TeamManager } from "../../components/TeamManager";

export default async function AdminTeamPage() {
  const session = await getSession();
  
  if (!session || session.role !== "SUPER_ADMIN") {
    redirect("/admin/dashboard");
  }

  const members = await db.user.findMany({
    where: { role: { in: ["ADMIN", "SUPER_ADMIN", "EMPLOYEE"] } },
    orderBy: [
      { role: "asc" },
      { createdAt: "asc" }
    ]
  });

  const formattedMembers = members.map(m => ({
    id: m.id,
    firstName: m.firstName,
    lastName: m.lastName,
    email: m.email,
    role: m.role,
    isActive: m.isActive,
  }));

  return (
    <div>
      <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Équipe NOVAVOX</h1>
      <p style={{ color: "var(--nv-text-secondary)", marginBottom: "2rem" }}>Gérez les accès administrateurs et employés au Back-Office.</p>
      
      <TeamManager members={formattedMembers} currentUserId={session.userId} />
    </div>
  );
}
