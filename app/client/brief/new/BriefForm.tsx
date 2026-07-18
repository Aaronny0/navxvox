"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { submitBrief } from "../../actions/auth";
import styles from "../../portal.module.css";

interface Service { id: string; title: string; slug: string; icon?: string | null; shortDesc: string; }

export default function BriefForm({ services }: { services: Service[] }) {
  const [step, setStep] = useState(1);
  const [service, setService] = useState("");
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [state, action, pending] = useActionState(submitBrief, undefined);

  if (state?.success) {
    return (
      <section className={styles.successCard}>
        <div className={styles.successMark}>✓</div>
        <h1 className={styles.formTitle}>Commande bien reçue</h1>
        <p className={styles.pageIntro} style={{ marginInline: "auto" }}>L’équipe va étudier votre demande. Sa décision apparaîtra dans votre espace et vous recevrez une notification.</p>
        <Link href="/client/orders" className={styles.primaryButton} style={{ marginTop: 24 }}>Suivre ma commande</Link>
      </section>
    );
  }

  return (
    <div className={styles.formWrap}>
      <header>
        <p className={styles.eyebrow}>Nouvelle demande</p>
        <h1 className={styles.pageTitle}>Parlez-nous de votre projet.</h1>
        <p className={styles.pageIntro}>Un parcours court et précis pour permettre à l’équipe de vous répondre utilement.</p>
      </header>

      <div className={styles.steps} aria-label={`Étape ${step} sur 3`}>
        {["Prestation", "Votre besoin", "Vérification"].map((label, index) => (
          <div key={label} className={`${styles.step} ${step === index + 1 ? styles.stepActive : ""}`}>
            <span className={styles.stepNumber}>0{index + 1}</span>{label}
          </div>
        ))}
      </div>

      <form action={action} className={styles.formCard}>
        {step === 1 && (
          <section>
            <h2 className={styles.formTitle}>Quel accompagnement recherchez-vous ?</h2>
            <p className={styles.formHelp}>Choisissez la catégorie la plus proche de votre besoin.</p>
            <div className={styles.serviceGrid}>
              {services.map((item) => (
                <label className={styles.serviceChoice} key={item.id}>
                  <input type="radio" name="serviceType" value={item.title} checked={service === item.title} onChange={() => setService(item.title)} required />
                  <span className={styles.serviceName}>{item.title}</span>
                  <span className={styles.serviceDesc}>{item.shortDesc}</span>
                </label>
              ))}
              {!services.length && <p className={styles.formHelp}>Aucune prestation n’est disponible actuellement.</p>}
            </div>
            <div className={styles.formActions}>
              <button className={`${styles.formButton} ${styles.formButtonPrimary}`} type="button" disabled={!service} onClick={() => setStep(2)}>Continuer →</button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section>
            <input type="hidden" name="serviceType" value={service} />
            <h2 className={styles.formTitle}>Donnez-nous le bon niveau de contexte.</h2>
            <p className={styles.formHelp}>Objectif, cible, résultat attendu : allez à l’essentiel, nous approfondirons ensemble.</p>
            <div className={styles.fieldGrid}>
              <div className={styles.fieldFull}>
                <label className={styles.fieldLabel} htmlFor="projectName">Nom de la commande</label>
                <input className={styles.fieldInput} id="projectName" name="projectName" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Ex. Refonte de notre site corporate" />
              </div>
              <div className={styles.fieldFull}>
                <label className={styles.fieldLabel} htmlFor="description">Votre besoin *</label>
                <textarea className={styles.fieldInput} id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Contexte, objectifs, public visé, contraintes et livrables attendus…" required />
                {state?.errors?.description && <span style={{ color: "#bb3f3f", fontSize: 10 }}>{state.errors.description[0]}</span>}
              </div>
              <div>
                <label className={styles.fieldLabel} htmlFor="budget">Budget indicatif</label>
                <select className={styles.fieldInput} id="budget" name="budget" value={budget} onChange={(e) => setBudget(e.target.value)}>
                  <option value="">À définir ensemble</option><option value="Moins de 5 000 €">Moins de 5 000 €</option><option value="5 000 € – 15 000 €">5 000 € – 15 000 €</option><option value="15 000 € – 30 000 €">15 000 € – 30 000 €</option><option value="Plus de 30 000 €">Plus de 30 000 €</option>
                </select>
              </div>
              <div>
                <label className={styles.fieldLabel} htmlFor="deadline">Échéance souhaitée</label>
                <input className={styles.fieldInput} type="date" id="deadline" name="deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
              </div>
            </div>
            <div className={styles.formActions}>
              <button className={`${styles.formButton} ${styles.formButtonSecondary}`} type="button" onClick={() => setStep(1)}>← Retour</button>
              <button className={`${styles.formButton} ${styles.formButtonPrimary}`} type="button" disabled={description.trim().length < 10} onClick={() => setStep(3)}>Vérifier →</button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section>
            <input type="hidden" name="serviceType" value={service} />
            <input type="hidden" name="projectName" value={projectName} />
            <input type="hidden" name="budget" value={budget} />
            <input type="hidden" name="deadline" value={deadline} />
            <input type="hidden" name="description" value={description} />
            <h2 className={styles.formTitle}>Tout est prêt.</h2>
            <p className={styles.formHelp}>Après envoi, la commande reste modifiable via un échange avec l’équipe.</p>
            <div className={styles.reviewBox}>
              <div className={styles.reviewRow}><span>Prestation</span><strong>{service}</strong></div>
              <div className={styles.reviewRow}><span>Commande</span><strong>{projectName || "Sans titre"}</strong></div>
              <div className={styles.reviewRow}><span>Budget</span><strong>{budget || "À définir ensemble"}</strong></div>
              <div className={styles.reviewRow}><span>Échéance</span><strong>{deadline || "Flexible"}</strong></div>
            </div>
            <div className={styles.formActions}>
              <button className={`${styles.formButton} ${styles.formButtonSecondary}`} type="button" onClick={() => setStep(2)}>← Modifier</button>
              <button className={`${styles.formButton} ${styles.formButtonPrimary}`} type="submit" disabled={pending}>{pending ? "Envoi…" : "Envoyer la commande"}</button>
            </div>
          </section>
        )}
      </form>
    </div>
  );
}
