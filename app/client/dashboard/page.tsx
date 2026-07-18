import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import styles from "../portal.module.css";

const orderStatus = {
  received: { label: "À l’étude", className: styles.received },
  converted: { label: "Approuvée", className: styles.converted },
  refused: { label: "À ajuster", className: styles.refused },
} as const;

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) return null;

  const [activeProjects, deliveredProjects, pendingQuotes, openInvoices, recentNotifications, recentOrders, pendingOrders] = await Promise.all([
    db.project.count({ where: { clientId: session.userId, status: { in: ["pending", "active", "revision"] } } }),
    db.project.count({ where: { clientId: session.userId, status: "delivered" } }),
    db.quote.count({ where: { project: { clientId: session.userId }, status: "pending" } }),
    db.invoice.count({ where: { clientId: session.userId, status: { not: "paid" } } }),
    db.notification.findMany({ where: { userId: session.userId }, orderBy: { createdAt: "desc" }, take: 5 }),
    db.brief.findMany({ where: { clientId: session.userId }, orderBy: { createdAt: "desc" }, take: 4 }),
    db.brief.count({ where: { clientId: session.userId, status: "received" } }),
  ]);

  const firstName = session.firstName.charAt(0).toUpperCase() + session.firstName.slice(1).toLowerCase();

  return (
    <div>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.heroKicker}><span className={styles.liveDot} />Votre espace est à jour</div>
          <h1 className={styles.heroTitle}>Bonjour {firstName}, faisons avancer vos idées.</h1>
          <p className={styles.heroText}>Suivez vos demandes, retrouvez vos livrables et échangez avec l’équipe NOVAVOX depuis un point central.</p>
          <Link href="/client/brief/new" className={styles.heroAction}>Démarrer une commande&nbsp; →</Link>
        </div>
        <div className={styles.heroAside}>
          <div className={styles.heroMetric}>
            <div className={styles.metricNumber}>{activeProjects}</div>
            <div className={styles.metricLabel}>projet{activeProjects > 1 ? "s" : ""} en mouvement</div>
          </div>
        </div>
      </section>

      <section className={styles.statGrid} aria-label="Indicateurs clés">
        {[
          { value: activeProjects, label: "Projets en cours", tag: "ACTIF" },
          { value: deliveredProjects, label: "Projets livrés", tag: "LIVRÉ" },
          { value: pendingQuotes, label: "Devis à valider", tag: "DEVIS" },
          { value: openInvoices, label: "Factures ouvertes", tag: "FINANCE" },
        ].map((stat) => (
          <article className={styles.statCard} key={stat.label}>
            <div className={styles.statTop}><span className={styles.statValue}>{stat.value}</span><span className={styles.statTag}>{stat.tag}</span></div>
            <div className={styles.statLabel}>{stat.label}</div>
          </article>
        ))}
      </section>

      <div className={styles.gridMain}>
        <section className={styles.panel}>
          <header className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>Dernières commandes</h2>
            <Link className={styles.panelLink} href="/client/orders">Tout consulter →</Link>
          </header>
          {recentOrders.length ? (
            <ul className={styles.list}>
              {recentOrders.map((order) => {
                const status = orderStatus[order.status as keyof typeof orderStatus] ?? orderStatus.received;
                return (
                  <li className={styles.listRow} key={order.id}>
                    <div>
                      <p className={styles.itemTitle}>{order.projectName || order.serviceType}</p>
                      <p className={styles.itemMeta}>{order.serviceType} · envoyée le {order.createdAt.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })}</p>
                    </div>
                    <span className={`${styles.status} ${status.className}`}>{status.label}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className={styles.empty}>
              <div className={styles.emptyMark}>CO</div>
              <div className={styles.emptyTitle}>Aucune commande pour le moment</div>
              <p className={styles.emptyText}>Décrivez votre besoin, nous l’étudions et revenons vers vous avec une réponse claire.</p>
            </div>
          )}
        </section>

        <aside className={styles.panel}>
          <header className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>Fil d’activité</h2>
            <span className={styles.statTag}>{pendingOrders ? `${pendingOrders} EN ATTENTE` : "À JOUR"}</span>
          </header>
          {recentNotifications.length ? recentNotifications.map((note) => (
            <div key={note.id} className={`${styles.notification} ${!note.read ? styles.notificationUnread : ""}`}>
              <div className={styles.notificationTitle}>{note.title}</div>
              <p className={styles.notificationBody}>{note.body}</p>
              <div className={styles.notificationDate}>{note.createdAt.toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}</div>
            </div>
          )) : (
            <div className={styles.empty}><div className={styles.emptyMark}>OK</div><div className={styles.emptyTitle}>Tout est calme</div><p className={styles.emptyText}>Les nouvelles importantes apparaîtront ici.</p></div>
          )}
        </aside>
      </div>
    </div>
  );
}
