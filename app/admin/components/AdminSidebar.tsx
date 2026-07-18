"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SessionPayload } from "@/lib/auth";
import { adminLogout } from "../actions/auth";
import styles from "../admin-shell.module.css";

const sections = [
  {
    label: "Pilotage",
    items: [
      { label: "Vue générale", href: "/admin/dashboard", code: "VG" },
      { label: "Commandes clients", href: "/admin/briefs", code: "CO" },
      { label: "Projets", href: "/admin/projects", code: "PR" },
      { label: "Clients", href: "/admin/clients", code: "CL" },
      { label: "Devis", href: "/admin/quotes", code: "DE" },
      { label: "Factures", href: "/admin/invoices", code: "FA" },
    ],
  },
  {
    label: "Contenus",
    items: [
      { label: "Services", href: "/admin/services", code: "SE" },
      { label: "Portfolio", href: "/admin/portfolio", code: "PO" },
      { label: "Blog", href: "/admin/blog", code: "BL" },
    ],
  },
  {
    label: "Administration",
    items: [
      { label: "Équipe", href: "/admin/team", code: "EQ" },
      { label: "Paramètres", href: "/admin/settings", code: "PA" },
    ],
  },
];

export default function AdminSidebar({ user }: { user: SessionPayload }) {
  const pathname = usePathname();
  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();

  return (
    <aside className={styles.sidebar}>
      <Link href="/admin/dashboard" className={styles.brand}>NOVAVOX</Link>
      <div className={styles.workspace}><span>Console</span><strong>Administration</strong></div>

      <nav className={styles.navigation} aria-label="Navigation administrateur">
        {sections.map((section) => (
          <div className={styles.navSection} key={section.label}>
            <div className={styles.navLabel}>{section.label}</div>
            <div className={styles.navItems}>
              {section.items.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link key={item.href} href={item.href} className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`}>
                    <span className={styles.navCode}>{item.code}</span>
                    <span>{item.label}</span>
                    {active && <i aria-hidden="true" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className={styles.account}>
        <div className={styles.accountIdentity}>
          <span className={styles.avatar}>{initials}</span>
          <span className={styles.accountText}><strong>{user.firstName} {user.lastName}</strong><small>{user.role.replaceAll("_", " ")}</small></span>
        </div>
        <form action={adminLogout}>
          <button type="submit" className={styles.logout}>Se déconnecter</button>
        </form>
      </div>
    </aside>
  );
}
