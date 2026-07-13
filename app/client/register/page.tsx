"use client";

import { useActionState } from "react";
import Link from "next/link";
import { register } from "../actions/auth";

export default function RegisterPage() {
  const [state, action, pending] = useActionState(register, undefined);

  if (state?.success) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div className="nv-card" style={{ width: "100%", maxWidth: "500px", padding: "3rem 2rem", textAlign: "center" }}>
          <span style={{ fontSize: "3rem", display: "block", marginBottom: "1.5rem" }}>✉️</span>
          <h2 style={{ marginBottom: "1rem" }}>Vérifiez votre email</h2>
          <p style={{ color: "var(--nv-text-secondary)", lineHeight: 1.6, marginBottom: "2rem" }}>
            {state.message}
          </p>
          <Link href="/client/login" className="nv-btn nv-btn-ghost">
            Retour à la connexion
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div className="nv-card" style={{ width: "100%", maxWidth: "600px", padding: "3rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h1 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Créer un compte</h1>
          <p style={{ color: "var(--nv-text-secondary)", fontSize: "0.95rem" }}>
            Rejoignez l'espace client pour gérer vos projets.
          </p>
        </div>

        <form action={action} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label htmlFor="firstName" className="nv-label">Prénom *</label>
              <input type="text" id="firstName" name="firstName" className="nv-input" required />
              {state?.errors?.firstName && <span style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.25rem", display: "block" }}>{state.errors.firstName[0]}</span>}
            </div>
            <div>
              <label htmlFor="lastName" className="nv-label">Nom *</label>
              <input type="text" id="lastName" name="lastName" className="nv-input" required />
              {state?.errors?.lastName && <span style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.25rem", display: "block" }}>{state.errors.lastName[0]}</span>}
            </div>
          </div>

          <div>
            <label htmlFor="companyName" className="nv-label">Nom de l'entreprise *</label>
            <input type="text" id="companyName" name="companyName" className="nv-input" required />
            {state?.errors?.companyName && <span style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.25rem", display: "block" }}>{state.errors.companyName[0]}</span>}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label htmlFor="email" className="nv-label">Email professionnel *</label>
              <input type="email" id="email" name="email" className="nv-input" required />
              {state?.errors?.email && <span style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.25rem", display: "block" }}>{state.errors.email[0]}</span>}
            </div>
            <div>
              <label htmlFor="phone" className="nv-label">Téléphone</label>
              <input type="tel" id="phone" name="phone" className="nv-input" />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="nv-label">Mot de passe *</label>
            <input type="password" id="password" name="password" className="nv-input" required />
            {state?.errors?.password && (
              <ul style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.5rem", paddingLeft: "1.2rem" }}>
                {state.errors.password.map(e => <li key={e}>{e}</li>)}
              </ul>
            )}
          </div>

          <button
            type="submit"
            className="nv-btn nv-btn-primary"
            style={{ width: "100%", justifyContent: "center", marginTop: "1rem" }}
            disabled={pending}
          >
            {pending ? "Création en cours..." : "Créer mon compte"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <p style={{ fontSize: "0.9rem", color: "var(--nv-text-secondary)" }}>
            Déjà un compte ?{" "}
            <Link href="/client/login" style={{ color: "var(--nv-accent-violet)", textDecoration: "none", fontWeight: 600 }}>
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
