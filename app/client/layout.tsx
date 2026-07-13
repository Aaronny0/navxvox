import { getSession } from "@/lib/auth";
import ClientSidebar from "./components/ClientSidebar";

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
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--nv-bg-primary)" }}>
      <ClientSidebar user={session} />
      <main
        style={{
          flex: 1,
          marginLeft: "280px", // Match sidebar width
          padding: "3rem",
          minHeight: "100vh",
        }}
      >
        {children}
      </main>
    </div>
  );
}
