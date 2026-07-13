"use client";

import { useActionState } from "react";
import { updateProfile, changePassword } from "../actions/auth";

export function ProfileForm({ user }: { user: any }) {
  const [state, action, pending] = useActionState(updateProfile, undefined);

  return (
    <form action={action} className="nv-card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <h2 style={{ fontSize: "1.25rem", margin: 0 }}>Informations de l'entreprise</h2>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        <div>
          <label htmlFor="companyName" className="nv-label">Nom de l'entreprise</label>
          <input type="text" id="companyName" name="companyName" defaultValue={user.companyName} className="nv-input" />
        </div>
        <div>
          <label htmlFor="siret" className="nv-label">SIRET</label>
          <input type="text" id="siret" name="siret" defaultValue={user.siret || ""} className="nv-input" />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        <div>
          <label htmlFor="phone" className="nv-label">Téléphone</label>
          <input type="tel" id="phone" name="phone" defaultValue={user.phone || ""} className="nv-input" />
        </div>
        <div>
          <label htmlFor="address" className="nv-label">Adresse postale</label>
          <input type="text" id="address" name="address" defaultValue={user.address || ""} className="nv-input" />
        </div>
      </div>

      <div style={{ marginTop: "1rem", paddingTop: "1.5rem", borderTop: "1px solid var(--nv-border-light)" }}>
        <h3 style={{ fontSize: "1rem", marginBottom: "1rem" }}>Préférences de notification</h3>
        
        <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer", marginBottom: "0.75rem" }}>
          <input type="checkbox" name="notifEmail" defaultChecked={user.notifEmail} style={{ width: "1.2rem", height: "1.2rem" }} />
          <span>Recevoir les notifications par email (nouveaux messages, devis, factures)</span>
        </label>
        
        <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
          <input type="checkbox" name="notifInApp" defaultChecked={user.notifInApp} style={{ width: "1.2rem", height: "1.2rem" }} />
          <span>Afficher les notifications sur le tableau de bord</span>
        </label>
      </div>

      {state?.message && (
        <div style={{ padding: "1rem", background: state.success ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", color: state.success ? "#22c55e" : "#ef4444", borderRadius: "var(--nv-radius-md)", fontSize: "0.85rem", textAlign: "center" }}>
          {state.message}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button type="submit" className="nv-btn nv-btn-primary" disabled={pending}>
          {pending ? "Enregistrement..." : "Enregistrer les modifications"}
        </button>
      </div>
    </form>
  );
}

export function PasswordForm() {
  const [state, action, pending] = useActionState(changePassword, undefined);

  return (
    <form action={action} className="nv-card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <h2 style={{ fontSize: "1.25rem", margin: 0 }}>Sécurité</h2>
      
      <div>
        <label htmlFor="currentPassword" className="nv-label">Mot de passe actuel</label>
        <input type="password" id="currentPassword" name="currentPassword" className="nv-input" required />
        {state?.errors?.currentPassword && <span style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.25rem", display: "block" }}>{state.errors.currentPassword[0]}</span>}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        <div>
          <label htmlFor="newPassword" className="nv-label">Nouveau mot de passe</label>
          <input type="password" id="newPassword" name="newPassword" className="nv-input" required minLength={8} />
          {state?.errors?.newPassword && <span style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.25rem", display: "block" }}>{state.errors.newPassword[0]}</span>}
        </div>
        <div>
          <label htmlFor="confirmPassword" className="nv-label">Confirmer le nouveau mot de passe</label>
          <input type="password" id="confirmPassword" name="confirmPassword" className="nv-input" required minLength={8} />
          {state?.errors?.confirmPassword && <span style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.25rem", display: "block" }}>{state.errors.confirmPassword[0]}</span>}
        </div>
      </div>

      {state?.message && (
        <div style={{ padding: "1rem", background: state.success ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", color: state.success ? "#22c55e" : "#ef4444", borderRadius: "var(--nv-radius-md)", fontSize: "0.85rem", textAlign: "center" }}>
          {state.message}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button type="submit" className="nv-btn nv-btn-primary" disabled={pending}>
          {pending ? "Modification..." : "Modifier le mot de passe"}
        </button>
      </div>
    </form>
  );
}
