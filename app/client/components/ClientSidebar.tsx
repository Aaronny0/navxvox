"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "../actions/auth";
import type { SessionPayload } from "@/lib/auth";
import styles from "../portal.module.css";

export default function ClientSidebar({ user }: { user: SessionPayload }) {
  const pathname = usePathname();

  const links = [
    { href: "/client/dashboard", label: "Vue d’ensemble", icon: "VE" },
    { href: "/client/orders", label: "Mes commandes", icon: "CO" },
    { href: "/client/projects", label: "Mes projets", icon: "PR" },
    { href: "/client/invoices", label: "Facturation", icon: "FA" },
    { href: "/client/profile", label: "Mon compte", icon: "MC" },
  ];

  return (
    <aside className={styles.sidebar}>
      <Link href="/client/dashboard" className={styles.brand}>
        <span
          className={styles.brandName}
          style={{
            display: "block",
            color: "#ffffff",
            fontFamily: "Outfit, Inter, Arial, sans-serif",
            fontSize: "22px",
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "0.12em",
            opacity: 1,
            visibility: "visible",
          }}
        >
          NOVAVOX
        </span>
      </Link>

      <div className={styles.navLabel}>Navigation</div>
      <nav className={styles.nav} aria-label="Navigation de l’espace client">
        {links.map((link) => {
          const active = pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <Link key={link.href} href={link.href} className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`}>
              <span className={styles.navIcon} aria-hidden="true">{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className={styles.sideBottom}>
        <Link href="/client/brief/new" className={styles.primaryButton} style={{ width: "100%", marginBottom: 16 }}>
          Nouvelle commande
        </Link>
        <div className={styles.identity}>
          <div className={styles.avatar}>{user.firstName[0]}{user.lastName[0]}</div>
          <div style={{ minWidth: 0 }}>
            <div className={styles.company}>{user.companyName}</div>
            <div className={styles.person}>{user.firstName} {user.lastName}</div>
          </div>
        </div>
        <button className={styles.logout} onClick={() => logout()}>Se déconnecter</button>
      </div>
    </aside>
  );
}
