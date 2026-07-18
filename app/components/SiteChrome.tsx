"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isWorkspaceRoute =
    pathname.startsWith("/client") || pathname.startsWith("/admin");

  if (isWorkspaceRoute) {
    return children;
  }

  return (
    <>
      <Header />
      <main style={{ position: "relative", zIndex: 10 }}>{children}</main>
      <Footer />
    </>
  );
}
