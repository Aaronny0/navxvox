"use client";

import { useActionState } from "react";
import Link from "next/link";
import { forgotPassword } from "../actions/auth";

export default function ForgotPasswordPage() {
  const [state, action, pending] = useActionState(forgotPassword, undefined);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        className="nv-card"
        style={{ width: "100%", maxWidth: "450px", padding: "3rem 2rem" }}
      >
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h1 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Mot de passe oublié</h1>
          <p style={{ color: "var(--nv-text-secondary)", fontSize: "0.95rem" }}>
            Saisissez votre email pour recevoir un lien de réinitialisation.
          </p>
        </div>

        <form action={action} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label htmlFor="email" className="nv-label">Email professionnel</label>
            <input
              type="email"
              id="email"
              name="email"
              className="nv-input"
              placeholder="vous@entreprise.com"
              required
            />
            {state?.errors?.email && (
              <span style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.25rem", display: "block" }}>
                {state.errors.email[0]}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="nv-btn nv-btn-primary"
            style={{ width: "100%", justifyContent: "center", marginTop: "1rem" }}
            disabled={pending}
          >
            {pending ? "Envoi..." : "Recevoir le lien"}
          </button>
        </form>

        {state?.success && (
          <div style={{ marginTop: "1.5rem", padding: "1rem", background: "rgba(16, 185, 129, 0.1)", color: "#10b981", borderRadius: "8px", fontSize: "0.9rem", textAlign: "center" }}>
            {state.message}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link href="/client/login" style={{ color: "var(--nv-text-secondary)", textDecoration: "none", fontSize: "0.9rem" }}>
            ← Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
}
