import Link from "next/link";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import styles from "../portal.module.css";

const statuses = {
  received: { label: "Étude en cours", short: "En étude", className: styles.received, step: 1 },
  converted: { label: "Commande approuvée", short: "Approuvée", className: styles.converted, step: 3 },
  refused: { label: "Ajustements demandés", short: "À ajuster", className: styles.refused, step: 3 },
} as const;

export default async function OrdersPage() {
  const session = await getSession();
  if (!session) return null;
  const orders = await db.brief.findMany({ where: { clientId: session.userId }, orderBy: { createdAt: "desc" } });
  const pending = orders.filter((order) => order.status === "received").length;
  const approved = orders.filter((order) => order.status === "converted").length;
  const toAdjust = orders.filter((order) => order.status === "refused").length;

  return (
    <div>
      <header className={styles.pageHeaderRefined}>
        <div>
          <p className={styles.eyebrow}>Demandes & décisions</p>
          <h1 className={styles.pageTitle}>Mes commandes</h1>
          <p className={styles.pageIntro}>Un suivi transparent, de votre demande initiale jusqu’à l’ouverture du projet.</p>
        </div>
        <Link href="/client/brief/new" className={styles.primaryButton}>Nouvelle commande <span>+</span></Link>
      </header>

      <section className={styles.orderCommandBar}>
        <div className={styles.orderCommandIntro}><span className={styles.commandPulse} /><div><small>État du pipeline</small><strong>{pending ? `${pending} demande${pending > 1 ? "s" : ""} en cours d’analyse` : "Toutes les demandes sont traitées"}</strong></div></div>
        <div className={styles.orderCommandStats}>
          <div><strong>{orders.length}</strong><span>Total</span></div>
          <div><strong>{pending}</strong><span>En étude</span></div>
          <div><strong>{approved}</strong><span>Approuvées</span></div>
          <div><strong>{toAdjust}</strong><span>À ajuster</span></div>
        </div>
      </section>

      {orders.length ? (
        <section className={styles.orderBoard}>
          <div className={styles.sectionHeaderRow}><div><p className={styles.sectionKicker}>Historique des demandes</p><h2 className={styles.sectionTitle}>Toutes les commandes</h2></div><span>Triées de la plus récente à la plus ancienne</span></div>
          <div className={styles.orderListPremium}>
            {orders.map((order, index) => {
              const status = statuses[order.status as keyof typeof statuses] ?? statuses.received;
              return (
                <article className={styles.orderCardPremium} key={order.id}>
                  <div className={styles.orderCardRail}><span>{String(orders.length - index).padStart(2, "0")}</span><i /></div>
                  <div className={styles.orderCardContent}>
                    <div className={styles.orderCardHeader}>
                      <div><span className={styles.orderRef}>CMD-{order.id.slice(-7).toUpperCase()}</span><h3>{order.projectName || order.serviceType}</h3><p>{order.serviceType}</p></div>
                      <span className={`${styles.status} ${status.className}`}>{status.label}</span>
                    </div>
                    <p className={styles.orderDescriptionPremium}>{order.description}</p>
                    <div className={styles.orderTimeline} aria-label={`Statut : ${status.label}`}>
                      {["Demande reçue", "Analyse NOVAVOX", order.status === "converted" ? "Projet ouvert" : order.status === "refused" ? "Retour envoyé" : "Décision"].map((label, stepIndex) => {
                        const done = stepIndex + 1 <= status.step;
                        return <div key={label} className={done ? styles.timelineDone : ""}><i>{done ? "✓" : stepIndex + 1}</i><span>{label}</span></div>;
                      })}
                    </div>
                    <div className={styles.orderMetaPremium}>
                      <div><span>Budget indicatif</span><strong>{order.budget || "À définir ensemble"}</strong></div>
                      <div><span>Échéance souhaitée</span><strong>{order.deadline || "Planning flexible"}</strong></div>
                      <div><span>Envoyée le</span><strong>{order.createdAt.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}</strong></div>
                    </div>
                    {order.refusalReason && <div className={styles.orderFeedback}><span>Retour de l’équipe</span><p>{order.refusalReason}</p><Link href="/client/brief/new">Soumettre une nouvelle version →</Link></div>}
                    {order.status === "converted" && <div className={styles.orderApprovedNote}><span>✓</span><p>Cette commande a été transformée en projet. Retrouvez son suivi dans votre espace de production.</p><Link href="/client/projects">Voir mes projets →</Link></div>}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : (
        <section className={styles.emptyPremium}>
          <div className={styles.emptyVisual}><span>01</span><i /></div>
          <div><h2>Une idée à concrétiser ?</h2><p>Présentez votre besoin en quelques minutes. L’équipe l’analyse puis vous donne une réponse claire.</p><Link href="/client/brief/new" className={styles.primaryButton}>Décrire mon projet</Link></div>
        </section>
      )}
    </div>
  );
}
