import { db } from "@/lib/db";
import { ServicesManager } from "../../components/ServicesManager";

export default async function AdminServicesPage() {
  const services = await db.service.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Catalogue de Services</h1>
      <ServicesManager services={services} />
    </div>
  );
}
