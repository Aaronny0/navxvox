import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import styles from "../portal.module.css";

const statusMap = {
  paid: { label: "Réglée", className: styles.invoicePaid },
  viewed: { label: "Consultée", className: styles.invoiceViewed },
  sent: { label: "À régler", className: styles.invoiceSent },
} as const;

function money(value: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(value);
}

export default async function InvoicesPage() {
  const session = await getSession();
  if (!session) return null;

  const invoices = await db.invoice.findMany({
    where: { clientId: session.userId },
    include: { lines: true },
    orderBy: { createdAt: "desc" },
  });

  const paidTotal = invoices.filter((invoice) => invoice.status === "paid").reduce((sum, invoice) => sum + invoice.amountTTC, 0);
  const outstanding = invoices.filter((invoice) => invoice.status !== "paid").reduce((sum, invoice) => sum + invoice.amountTTC, 0);
  const nextDue = invoices
    .filter((invoice) => invoice.status !== "paid" && invoice.dueDate)
    .sort((a, b) => a.dueDate!.getTime() - b.dueDate!.getTime())[0];

  return (
    <div>
      <header className={styles.pageHeaderRefined}>
        <div>
          <p className={styles.eyebrow}>Centre financier</p>
          <h1 className={styles.pageTitle}>Factures</h1>
          <p className={styles.pageIntro}>Votre situation financière, lisible en quelques secondes.</p>
        </div>
        <div className={styles.headerPill}>{invoices.length.toString().padStart(2, "0")} document{invoices.length > 1 ? "s" : ""}</div>
      </header>

      <section className={styles.financeHero}>
        <div className={styles.financeHeroPrimary}>
          <div className={styles.heroMiniLabel}>Solde à régler</div>
          <div className={styles.financeAmount}>{money(outstanding)}</div>
          <p className={styles.financeCaption}>{outstanding > 0 ? "Retrouvez le détail et les échéances ci-dessous." : "Vous êtes parfaitement à jour. Aucun règlement en attente."}</p>
          {nextDue ? (
            <div className={styles.nextDue}>
              <span>Prochaine échéance</span>
              <strong>{nextDue.dueDate!.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}</strong>
            </div>
          ) : <div className={styles.nextDue}><span>Situation</span><strong>Compte à jour</strong></div>}
        </div>
        <div className={styles.financeHeroStats}>
          <div className={styles.financeHeroStat}><span>Total réglé</span><strong>{money(paidTotal)}</strong><small>depuis votre arrivée</small></div>
          <div className={styles.financeHeroStat}><span>Documents</span><strong>{invoices.length}</strong><small>{invoices.filter((invoice) => invoice.status === "paid").length} facture{invoices.filter((invoice) => invoice.status === "paid").length > 1 ? "s" : ""} réglée{invoices.filter((invoice) => invoice.status === "paid").length > 1 ? "s" : ""}</small></div>
        </div>
      </section>

      <section className={styles.ledger}>
        <div className={styles.ledgerHeader}>
          <div><p className={styles.sectionKicker}>Historique</p><h2 className={styles.sectionTitle}>Vos documents</h2></div>
          <span className={styles.secureNote}><span className={styles.secureDot} />Documents sécurisés</span>
        </div>

        {invoices.length ? (
          <div className={styles.invoiceList}>
            {invoices.map((invoice) => {
              const status = statusMap[invoice.status as keyof typeof statusMap] ?? statusMap.sent;
              const overdue = invoice.status !== "paid" && invoice.dueDate && invoice.dueDate < new Date();
              return (
                <article className={styles.invoiceRow} key={invoice.id}>
                  <div className={styles.documentMark}><span>PDF</span></div>
                  <div className={styles.invoiceIdentity}>
                    <div className={styles.invoiceNumber}>{invoice.number}</div>
                    <div className={styles.invoiceSub}>{invoice.lines.length || 1} prestation{invoice.lines.length > 1 ? "s" : ""} · émise le {invoice.createdAt.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })}</div>
                  </div>
                  <div className={styles.invoiceDue}>
                    <span>{invoice.status === "paid" ? "Réglée le" : "Échéance"}</span>
                    <strong className={overdue ? styles.overdue : ""}>{invoice.status === "paid" && invoice.paidAt ? invoice.paidAt.toLocaleDateString("fr-FR") : invoice.dueDate?.toLocaleDateString("fr-FR") || "À réception"}</strong>
                  </div>
                  <div className={styles.invoicePrice}><strong>{money(invoice.amountTTC)}</strong><span>{money(invoice.amountHT)} HT</span></div>
                  <div className={styles.invoiceActions}>
                    <span className={`${styles.status} ${status.className}`}>{status.label}</span>
                    {invoice.pdfUrl ? <a className={styles.pdfButton} href={invoice.pdfUrl} target="_blank" rel="noreferrer" aria-label={`Ouvrir la facture ${invoice.number}`}>Ouvrir <span>↗</span></a> : <span className={styles.preparing}>Préparation</span>}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className={styles.emptyPremium}>
            <div className={styles.emptyVisual}><span>0</span><i /></div>
            <div><h2>Aucune facture à classer</h2><p>Vos prochains documents financiers apparaîtront ici, prêts à être consultés et téléchargés.</p></div>
          </div>
        )}
      </section>
    </div>
  );
}
