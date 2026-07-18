"use client";

import { useMemo, useState, useTransition } from "react";
import { acceptBrief, refuseBrief } from "../actions/briefs";
import styles from "../admin-orders.module.css";

type Brief = {
  id: string; serviceType: string; projectName: string | null; budget: string | null; deadline: string | null;
  description: string; status: string; refusalReason: string | null; createdAt: Date;
  client: { companyName: string; firstName: string; lastName: string; email: string };
};

const statusMap = {
  received: { label: "À décider", className: styles.received }, converted: { label: "Approuvée", className: styles.converted }, refused: { label: "Rejetée", className: styles.refused },
} as const;

export function BriefsList({ briefs }: { briefs: Brief[] }) {
  const [filter, setFilter] = useState("received");
  const [refusingId, setRefusingId] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [isPending, startTransition] = useTransition();
  const visible = useMemo(() => filter === "all" ? briefs : briefs.filter((brief) => brief.status === filter), [briefs, filter]);

  function approve(id: string) {
    setFeedback(""); setPendingId(id);
    startTransition(async () => {
      try { await acceptBrief(id); } catch (error) { setFeedback(error instanceof Error ? error.message : "Impossible d’approuver la commande"); }
      finally { setPendingId(null); }
    });
  }

  function reject(id: string) {
    if (reason.trim().length < 8) { setFeedback("Précisez le motif du rejet en au moins 8 caractères."); return; }
    setFeedback(""); setPendingId(id);
    startTransition(async () => {
      try { await refuseBrief(id, reason); setRefusingId(null); setReason(""); }
      catch (error) { setFeedback(error instanceof Error ? error.message : "Impossible de rejeter la commande"); }
      finally { setPendingId(null); }
    });
  }

  return (
    <div>
      <div className={styles.toolbar}>
        <div className={styles.tabs} role="tablist" aria-label="Filtrer les commandes">
          {[["received", "À décider"], ["converted", "Approuvées"], ["refused", "Rejetées"], ["all", "Toutes"]].map(([value, label]) => (
            <button key={value} className={`${styles.tab} ${filter === value ? styles.tabActive : ""}`} onClick={() => setFilter(value)} role="tab" aria-selected={filter === value}>{label}</button>
          ))}
        </div>
        <span className={styles.count}>{visible.length} commande{visible.length > 1 ? "s" : ""}</span>
      </div>
      <p className={styles.feedback} aria-live="polite">{feedback}</p>

      <div className={styles.list}>
        {visible.map((brief) => {
          const status = statusMap[brief.status as keyof typeof statusMap] ?? statusMap.received;
          const busy = isPending && pendingId === brief.id;
          return (
            <article className={styles.card} key={brief.id}>
              <div className={styles.cardMain}>
                <div>
                  <div className={styles.orderTop}><h2 className={styles.orderName}>{brief.projectName || brief.serviceType}</h2><span className={`${styles.status} ${status.className}`}>{status.label}</span></div>
                  <p className={styles.client}>{brief.client.companyName} · {brief.client.firstName} {brief.client.lastName}</p>
                  <p className={styles.description}>{brief.description}</p>
                </div>
                <div className={styles.facts}>
                  <div><div className={styles.factLabel}>Prestation</div><div className={styles.factValue}>{brief.serviceType}</div></div>
                  <div><div className={styles.factLabel}>Budget</div><div className={styles.factValue}>{brief.budget || "Non défini"}</div></div>
                  <div><div className={styles.factLabel}>Échéance</div><div className={styles.factValue}>{brief.deadline || "Flexible"}</div></div>
                  <div><div className={styles.factLabel}>Reçue le</div><div className={styles.factValue}>{new Date(brief.createdAt).toLocaleDateString("fr-FR")}</div></div>
                  <div><div className={styles.factLabel}>Contact</div><div className={styles.factValue}>{brief.client.email}</div></div>
                  <div><div className={styles.factLabel}>Référence</div><div className={styles.factValue}>{brief.id.slice(-7).toUpperCase()}</div></div>
                </div>
                {brief.status === "received" && <div className={styles.actions}><button className={styles.approve} disabled={busy} onClick={() => approve(brief.id)}>{busy ? "Traitement…" : "Approuver"}</button><button className={styles.reject} disabled={busy} onClick={() => { setRefusingId(brief.id); setFeedback(""); }}>Rejeter</button></div>}
              </div>
              {refusingId === brief.id && (
                <div className={styles.rejectPanel}>
                  <label className={styles.rejectLabel} htmlFor={`reason-${brief.id}`}>Motif transmis au client</label>
                  <textarea id={`reason-${brief.id}`} className={styles.rejectInput} value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Expliquez clairement ce qui doit être ajusté ou pourquoi la demande ne peut pas être retenue…" autoFocus />
                  <div className={styles.rejectActions}><button className={styles.cancel} onClick={() => { setRefusingId(null); setReason(""); }}>Annuler</button><button className={styles.confirm} disabled={busy} onClick={() => reject(brief.id)}>Confirmer le rejet</button></div>
                </div>
              )}
              {brief.refusalReason && <div className={styles.reason}>Motif communiqué : {brief.refusalReason}</div>}
            </article>
          );
        })}
        {!visible.length && <div className={styles.empty}>Aucune commande dans cette catégorie.</div>}
      </div>
    </div>
  );
}
