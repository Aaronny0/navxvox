"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login } from "../actions/auth";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, null);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        className="nv-card"
        style={{ 
          width: "100%", 
          maxWidth: "450px", 
          padding: "3rem 2rem",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h1 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Connexion</h1>
          <p style={{ color: "var(--nv-text-secondary)", fontSize: "0.95rem" }}>
            Accédez à votre espace client NOVAVOX
          </p>
        </div>

        <form action={action} style={{ display: "flex", flexDirection: "column", gap: "1.25rem", position: "relative", zIndex: 20 }}>
          <div style={{ position: "relative", zIndex: 20 }}>
            <label htmlFor="email" className="nv-label">Email professionnel</label>
            <input
              type="text"
              id="email"
              name="email"
              className="nv-input"
              placeholder="vous@entreprise.com"
              required
              style={{ position: "relative", zIndex: 20 }}
            />
            {state?.errors?.email && (
              <span style={{ color: "var(--nv-error)", fontSize: "0.8rem", marginTop: "0.25rem", display: "block" }}>
                {state.errors.email[0]}
              </span>
            )}
          </div>

          <div style={{ position: "relative", zIndex: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label htmlFor="password" className="nv-label" style={{ margin: 0 }}>Mot de passe</label>
              <Link href="/client/forgot-password" style={{ fontSize: "0.8rem", color: "var(--nv-accent-violet)", textDecoration: "none" }}>
                Oublié ?
              </Link>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              className="nv-input"
              style={{ marginTop: "0.5rem", position: "relative", zIndex: 20 }}
              required
            />
            {state?.errors?.password && (
              <span style={{ color: "var(--nv-error)", fontSize: "0.8rem", marginTop: "0.25rem", display: "block" }}>
                {state.errors.password[0]}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="nv-btn nv-btn-primary"
            style={{ width: "100%", justifyContent: "center", marginTop: "1rem" }}
            disabled={pending}
          >
            {pending ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <p style={{ fontSize: "0.9rem", color: "var(--nv-text-secondary)" }}>
            Pas encore de compte ?{" "}
            <Link href="/client/register" style={{ color: "var(--nv-accent-violet)", textDecoration: "none", fontWeight: 600 }}>
              Inscrivez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
