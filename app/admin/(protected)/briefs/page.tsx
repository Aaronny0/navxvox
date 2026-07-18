import { db } from "@/lib/db";
import { BriefsList } from "../../components/BriefsList";
import styles from "../../admin-orders.module.css";

export default async function AdminBriefsPage() {
  const briefs = await db.brief.findMany({ include: { client: true }, orderBy: { createdAt: "desc" } });
  const pending = briefs.filter((brief) => brief.status === "received").length;
  const approved = briefs.filter((brief) => brief.status === "converted").length;
  const rejected = briefs.filter((brief) => brief.status === "refused").length;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Pilotage commercial</p>
          <h1 className={styles.title}>Commandes clients</h1>
          <p className={styles.intro}>Analysez chaque demande, approuvez-la pour ouvrir automatiquement un projet, ou rejetez-la avec un motif transmis au client.</p>
        </div>
        <div className={styles.summary}>
          <div className={styles.summaryCard}><div className={styles.summaryValue}>{pending}</div><div className={styles.summaryLabel}>À décider</div></div>
          <div className={styles.summaryCard}><div className={styles.summaryValue}>{approved}</div><div className={styles.summaryLabel}>Approuvées</div></div>
          <div className={styles.summaryCard}><div className={styles.summaryValue}>{rejected}</div><div className={styles.summaryLabel}>Rejetées</div></div>
        </div>
      </header>
      <BriefsList briefs={briefs} />
    </div>
  );
}
