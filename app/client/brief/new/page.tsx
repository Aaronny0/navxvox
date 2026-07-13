"use client";

import { useState, useActionState } from "react";
import Link from "next/link";
import { submitBrief } from "../../actions/auth";

export default function NewBriefPage() {
  const [step, setStep] = useState(1);
  const [state, action, pending] = useActionState(submitBrief, undefined);

  if (state?.success) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 2rem", maxWidth: "600px", margin: "0 auto" }}>
        <span style={{ fontSize: "4rem", display: "block", marginBottom: "1.5rem" }}>🚀</span>
        <h1 style={{ marginBottom: "1rem" }}>Brief envoyé avec succès !</h1>
        <p style={{ color: "var(--nv-text-secondary)", marginBottom: "2rem", lineHeight: 1.6 }}>
          {state.message}
        </p>
        <Link href="/client/dashboard" className="nv-btn nv-btn-primary">
          Retour au tableau de bord
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Nouveau Brief</h1>
        <p style={{ color: "var(--nv-text-secondary)", margin: 0 }}>Parlez-nous de votre projet pour obtenir un devis.</p>
      </div>

      {/* Progress Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3rem", position: "relative" }}>
        <div style={{ position: "absolute", top: "16px", left: "10%", right: "10%", height: "2px", background: "rgba(255,255,255,0.1)", zIndex: 0 }} />
        {[1, 2, 3].map((s) => (
          <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 1, gap: "0.5rem" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: step >= s ? "var(--nv-accent-violet)" : "var(--nv-bg-secondary)",
                color: step >= s ? "#fff" : "var(--nv-text-muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                border: step >= s ? "none" : "2px solid rgba(255,255,255,0.1)",
                transition: "all 0.3s ease",
              }}
            >
              {s}
            </div>
            <span style={{ fontSize: "0.8rem", color: step >= s ? "var(--nv-text-primary)" : "var(--nv-text-muted)", fontWeight: step >= s ? 600 : 400 }}>
              {s === 1 ? "Prestation" : s === 2 ? "Détails" : "Fichiers"}
            </span>
          </div>
        ))}
      </div>

      <form action={action} className="nv-card" style={{ padding: "3rem" }}>
        
        {/* STEP 1 */}
        <div style={{ display: step === 1 ? "block" : "none" }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}>Type de prestation</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {["Site Vitrine", "Application Web", "E-commerce", "Refonte UI/UX", "Identité Visuelle", "Autre"].map((service) => (
              <label key={service} style={{
                padding: "1.5rem",
                border: "1px solid var(--nv-border-light)",
                borderRadius: "var(--nv-radius-md)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                background: "rgba(255,255,255,0.02)",
              }}>
                <input type="radio" name="serviceType" value={service} required style={{ transform: "scale(1.2)" }} />
                <span style={{ fontWeight: 500 }}>{service}</span>
              </label>
            ))}
          </div>
          
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "2rem" }}>
            <button type="button" onClick={() => setStep(2)} className="nv-btn nv-btn-primary">
              Suivant →
            </button>
          </div>
        </div>

        {/* STEP 2 */}
        <div style={{ display: step === 2 ? "block" : "none" }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}>Détails du projet</h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <label htmlFor="projectName" className="nv-label">Nom du projet</label>
              <input type="text" id="projectName" name="projectName" className="nv-input" placeholder="Ex: Refonte site corporate" />
            </div>

            <div>
              <label htmlFor="description" className="nv-label">Description détaillée *</label>
              <textarea id="description" name="description" className="nv-input" rows={6} placeholder="Objectifs, fonctionnalités attendues, cible..." required></textarea>
              {state?.errors?.description && <span style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.25rem", display: "block" }}>{state.errors.description[0]}</span>}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              <div>
                <label htmlFor="budget" className="nv-label">Budget indicatif</label>
                <select id="budget" name="budget" className="nv-input">
                  <option value="">Sélectionner...</option>
                  <option value="< 5k€">Moins de 5 000 €</option>
                  <option value="5k-15k">Entre 5 000 € et 15 000 €</option>
                  <option value="15k-30k">Entre 15 000 € et 30 000 €</option>
                  <option value="> 30k€">Plus de 30 000 €</option>
                </select>
              </div>
              <div>
                <label htmlFor="deadline" className="nv-label">Délai souhaité</label>
                <input type="date" id="deadline" name="deadline" className="nv-input" />
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
            <button type="button" onClick={() => setStep(1)} className="nv-btn nv-btn-ghost">
              ← Précédent
            </button>
            <button type="button" onClick={() => setStep(3)} className="nv-btn nv-btn-primary">
              Suivant →
            </button>
          </div>
        </div>

        {/* STEP 3 */}
        <div style={{ display: step === 3 ? "block" : "none" }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}>Ressources (Optionnel)</h2>
          
          <div style={{
            border: "2px dashed var(--nv-border-light)",
            borderRadius: "var(--nv-radius-md)",
            padding: "3rem 2rem",
            textAlign: "center",
            background: "rgba(255,255,255,0.01)",
            marginBottom: "2rem"
          }}>
            <span style={{ fontSize: "2rem", display: "block", marginBottom: "1rem" }}>📁</span>
            <p style={{ margin: "0 0 1rem", fontWeight: 500 }}>Glissez vos fichiers ici ou cliquez pour parcourir</p>
            <p style={{ fontSize: "0.85rem", color: "var(--nv-text-muted)", margin: "0 0 1.5rem" }}>Max 50 Mo par fichier. Formats : PDF, PNG, JPG, AI, PSD, ZIP.</p>
            {/* Note: In a real implementation we would use a file input and upload to S3 here. 
                For the MVP, we just add a visual placeholder. */}
            <label className="nv-btn nv-btn-ghost" style={{ cursor: "pointer", display: "inline-block" }}>
              Parcourir...
              <input type="file" multiple style={{ display: "none" }} />
            </label>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid var(--nv-border-light)" }}>
            <button type="button" onClick={() => setStep(2)} className="nv-btn nv-btn-ghost">
              ← Précédent
            </button>
            <button type="submit" className="nv-btn nv-btn-primary" disabled={pending}>
              {pending ? "Envoi en cours..." : "Envoyer le brief"}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
