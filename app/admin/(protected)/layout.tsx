import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "../components/AdminSidebar";
import styles from "../admin-shell.module.css";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session || session.role === "CLIENT") {
    redirect("/admin/login");
  }

  return (
    <div className={styles.shell}>
      <AdminSidebar user={session} />
      <main className={styles.main}>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
}
