"use client";

import { useActionState } from "react";
import { adminLogin } from "../actions/auth";

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(adminLogin, null);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background: "var(--nv-bg-primary)"
      }}
    >
      <div
        className="nv-card"
        style={{ width: "100%", maxWidth: "450px", padding: "3rem 2rem" }}
      >
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h1 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>NOVAVOX</h1>
          <p style={{ color: "var(--nv-text-secondary)", fontSize: "0.95rem" }}>
            Administration & Back-Office
          </p>
        </div>

        <form action={action} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label htmlFor="email" className="nv-label">Email administrateur</label>
            <input
              type="text"
              id="email"
              name="email"
              className="nv-input"
              placeholder="admin@novavox.fr"
              required
            />
            {state?.errors?.email && (
              <span style={{ color: "var(--nv-error)", fontSize: "0.8rem", marginTop: "0.25rem", display: "block" }}>
                {state.errors.email[0]}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="password" className="nv-label" style={{ margin: 0 }}>Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              className="nv-input"
              style={{ marginTop: "0.5rem" }}
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
            {pending ? "Connexion..." : "Accéder au Back-Office"}
          </button>
        </form>

      </div>
    </div>
  );
}
