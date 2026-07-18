import { getSession } from "@/lib/auth";
import ClientSidebar from "./components/ClientSidebar";
import styles from "./portal.module.css";

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    // Render without sidebar for auth pages (login, register, etc.)
    return <div style={{ minHeight: "100vh", background: "var(--nv-bg-primary)" }}>{children}</div>;
  }

  return (
    <div className={styles.shell}>
      <ClientSidebar user={session} />
      <main className={styles.main}>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
}
