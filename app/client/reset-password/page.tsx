"use client";

import { useActionState, Suspense } from "react";
import Link from "next/link";
import { resetPassword } from "../actions/auth";
import { useSearchParams } from "next/navigation";

function ResetPasswordForm() {
  const [state, action, pending] = useActionState(resetPassword, undefined);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (state?.success) {
    return (
      <div style={{ textAlign: "center" }}>
        <span style={{ fontSize: "3rem", display: "block", marginBottom: "1.5rem" }}>✅</span>
        <h2 style={{ marginBottom: "1rem" }}>Mot de passe modifié</h2>
        <p style={{ color: "var(--nv-text-secondary)", lineHeight: 1.6, marginBottom: "2rem" }}>
          {state.message}
        </p>
        <Link href="/client/login" className="nv-btn nv-btn-primary" style={{ justifyContent: "center" }}>
          Se connecter
        </Link>
      </div>
    );
  }

  if (!token) {
    return (
      <div style={{ textAlign: "center" }}>
        <p style={{ color: "var(--nv-error)" }}>Lien invalide ou expiré.</p>
        <Link href="/client/forgot-password" style={{ color: "var(--nv-accent-violet)", textDecoration: "none" }}>
          Demander un nouveau lien
        </Link>
      </div>
    );
  }

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Nouveau mot de passe</h1>
        <p style={{ color: "var(--nv-text-secondary)", fontSize: "0.95rem" }}>
          Choisissez un nouveau mot de passe sécurisé.
        </p>
      </div>

      <form action={action} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <input type="hidden" name="token" value={token} />
        
        <div>
          <label htmlFor="password" className="nv-label">Nouveau mot de passe</label>
          <input type="password" id="password" name="password" className="nv-input" required minLength={8} />
          {state?.errors?.password && <span style={{ color: "var(--nv-error)", fontSize: "0.8rem", marginTop: "0.25rem", display: "block" }}>{state.errors.password[0]}</span>}
        </div>

        <div>
          <label htmlFor="confirm" className="nv-label">Confirmer le mot de passe</label>
          <input type="password" id="confirm" name="confirm" className="nv-input" required minLength={8} />
          {state?.errors?.confirm && <span style={{ color: "var(--nv-error)", fontSize: "0.8rem", marginTop: "0.25rem", display: "block" }}>{state.errors.confirm[0]}</span>}
        </div>

        {state?.message && !state?.success && (
          <div style={{ padding: "1rem", background: "rgba(198,40,40,0.12)", color: "var(--nv-error)", borderRadius: "var(--nv-radius-md)", fontSize: "0.85rem", textAlign: "center" }}>
            {state.message}
          </div>
        )}

        <button
          type="submit"
          className="nv-btn nv-btn-primary"
          style={{ width: "100%", justifyContent: "center", marginTop: "1rem" }}
          disabled={pending}
        >
          {pending ? "Modification..." : "Modifier le mot de passe"}
        </button>
      </form>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div className="nv-card" style={{ width: "100%", maxWidth: "450px", padding: "3rem 2rem" }}>
        <Suspense fallback={<div style={{ textAlign: "center" }}>Chargement...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
