import type { ReactNode } from "react";
import Link from "next/link";
import styles from "../legal.module.css";

type LegalDocumentProps = {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
};

const legalLinks = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/politique-de-confidentialite", label: "Confidentialité" },
  { href: "/conditions-generales-utilisation", label: "CGU" },
];

export default function LegalDocument({ eyebrow, title, intro, children }: LegalDocumentProps) {
  return (
    <main className={styles.page}>
      <div className={styles.glow} aria-hidden="true" />
      <header className={styles.hero}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1>{title}</h1>
          <p className={styles.intro}>{intro}</p>
          <p className={styles.updated}>Dernière mise à jour : 20 juillet 2026</p>
        </div>
      </header>

      <div className={`${styles.container} ${styles.layout}`}>
        <aside className={styles.sidebar} aria-label="Documents juridiques">
          <span>Documents juridiques</span>
          <nav>
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href}>{link.label}</Link>
            ))}
          </nav>
          <a className={styles.contactLink} href="mailto:novavox30@gmail.com">
            Une question ? Écrivez-nous ↗
          </a>
        </aside>

        <article className={styles.document}>{children}</article>
      </div>
    </main>
  );
}
