import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import type { CSSProperties } from "react";
import styles from "../portal.module.css";

const statusMap = {
  pending: { label: "Préparation", className: styles.pending },
  active: { label: "En production", className: styles.active },
  revision: { label: "En révision", className: styles.revision },
  delivered: { label: "Livré", className: styles.delivered },
  archived: { label: "Archivé", className: styles.archived },
} as const;

export default async function ProjectsPage() {
  const session = await getSession();
  if (!session) return null;

  const projects = await db.project.findMany({
    where: { clientId: session.userId },
    include: { _count: { select: { files: true, messages: true, quotes: true } } },
    orderBy: { updatedAt: "desc" },
  });

  const featured = projects.find((project) => ["active", "revision", "pending"].includes(project.status)) || projects[0];
  const remaining = projects.filter((project) => project.id !== featured?.id);
  const activeCount = projects.filter((project) => ["pending", "active", "revision"].includes(project.status)).length;
  const deliveredCount = projects.filter((project) => project.status === "delivered").length;

  return (
    <div>
      <header className={styles.pageHeaderRefined}>
        <div>
          <p className={styles.eyebrow}>Studio de production</p>
          <h1 className={styles.pageTitle}>Mes projets</h1>
          <p className={styles.pageIntro}>L’avancement réel, les prochaines échéances et tous vos échanges au même endroit.</p>
        </div>
        <Link href="/client/brief/new" className={styles.primaryButton}>Lancer un nouveau projet <span>+</span></Link>
      </header>

      {featured ? (
        <>
          <section className={styles.projectSpotlight}>
            <div className={styles.spotlightCopy}>
              <div className={styles.spotlightTopline}>
                <span>Projet à la une</span>
                <span className={`${styles.status} ${statusMap[featured.status as keyof typeof statusMap]?.className || styles.pending}`}>{statusMap[featured.status as keyof typeof statusMap]?.label || featured.status}</span>
              </div>
              <p className={styles.spotlightService}>{featured.serviceType}</p>
              <h2>{featured.name}</h2>
              <p className={styles.spotlightText}>{featured.progress >= 100 ? "Le projet est finalisé. Vos livrables restent accessibles dans le dossier." : "Votre équipe NOVAVOX fait avancer ce projet. Ouvrez le dossier pour consulter les derniers échanges et documents."}</p>
              <Link href={`/client/projects/${featured.id}`} className={styles.spotlightButton}>Ouvrir le dossier <span>↗</span></Link>
            </div>
            <div className={styles.spotlightProgress}>
              <div className={styles.progressRing} style={{ "--project-progress": `${featured.progress * 3.6}deg` } as CSSProperties}>
                <div><strong>{featured.progress}%</strong><span>accompli</span></div>
              </div>
              <div className={styles.spotlightMetrics}>
                <div><strong>{featured._count.messages}</strong><span>messages</span></div>
                <div><strong>{featured._count.files}</strong><span>fichiers</span></div>
                <div><strong>{featured._count.quotes}</strong><span>devis</span></div>
              </div>
              <div className={styles.spotlightDeadline}><span>Livraison estimée</span><strong>{featured.estimatedAt ? featured.estimatedAt.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" }) : "À confirmer avec l’équipe"}</strong></div>
            </div>
          </section>

          <section className={styles.projectSummaryStrip}>
            <div><strong>{projects.length.toString().padStart(2, "0")}</strong><span>projets au total</span></div>
            <div><strong>{activeCount.toString().padStart(2, "0")}</strong><span>en mouvement</span></div>
            <div><strong>{deliveredCount.toString().padStart(2, "0")}</strong><span>livrés</span></div>
            <div><strong>{projects.reduce((sum, project) => sum + project._count.files, 0).toString().padStart(2, "0")}</strong><span>fichiers partagés</span></div>
          </section>

          {remaining.length > 0 && (
            <section className={styles.projectArchive}>
              <div className={styles.sectionHeaderRow}><div><p className={styles.sectionKicker}>Tous les dossiers</p><h2 className={styles.sectionTitle}>Autres projets</h2></div><span>{remaining.length} résultat{remaining.length > 1 ? "s" : ""}</span></div>
              <div className={styles.projectGridPremium}>
                {remaining.map((project, index) => {
                  const status = statusMap[project.status as keyof typeof statusMap] ?? statusMap.pending;
                  return (
                    <Link href={`/client/projects/${project.id}`} className={styles.projectCardPremium} key={project.id}>
                      <div className={styles.projectCardNumber}>{String(index + 2).padStart(2, "0")}</div>
                      <div className={styles.projectCardTop}><span>{project.serviceType}</span><span className={`${styles.status} ${status.className}`}>{status.label}</span></div>
                      <h3>{project.name}</h3>
                      <div className={styles.projectCardProgress}><div><span>Avancement</span><strong>{project.progress}%</strong></div><i><b style={{ width: `${project.progress}%` }} /></i></div>
                      <div className={styles.projectCardFooter}><span>{project._count.files} fichier{project._count.files > 1 ? "s" : ""}</span><span>Mis à jour {project.updatedAt.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })}</span><b>↗</b></div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </>
      ) : (
        <section className={styles.emptyPremium}>
          <div className={styles.emptyVisual}><span>01</span><i /></div>
          <div><h2>Votre prochain projet mérite un beau départ.</h2><p>Décrivez votre besoin. Une fois la commande approuvée, son espace de production apparaîtra ici.</p><Link href="/client/brief/new" className={styles.primaryButton}>Créer ma première commande</Link></div>
        </section>
      )}
    </div>
  );
}
