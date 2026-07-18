"use client";

import { useActionState } from "react";
import { updateProfile, changePassword } from "../actions/auth";
import styles from "../portal.module.css";

type ProfileUser = {
  companyName: string;
  siret: string | null;
  phone: string | null;
  address: string | null;
  notifEmail: boolean;
  notifInApp: boolean;
};

function Feedback({ state }: { state?: { success?: boolean; message?: string } }) {
  if (!state?.message) return null;
  return <div className={`${styles.formFeedback} ${state.success ? styles.formFeedbackSuccess : styles.formFeedbackError}`} role="status">{state.message}</div>;
}

export function ProfileForm({ user }: { user: ProfileUser }) {
  const [state, action, pending] = useActionState(updateProfile, undefined);

  return (
    <form action={action} className={styles.settingsCard}>
      <header className={styles.settingsHeader}>
        <div className={styles.settingsIndex}>01</div>
        <div><h2>Informations de l’entreprise</h2><p>Ces données apparaissent sur vos devis et factures.</p></div>
      </header>
      <div className={styles.settingsBody}>
        <div className={styles.accountFieldGrid}>
          <div className={styles.accountFieldFull}>
            <label className={styles.accountLabel} htmlFor="companyName">Raison sociale</label>
            <input className={styles.accountInput} type="text" id="companyName" name="companyName" defaultValue={user.companyName} placeholder="Nom de votre entreprise" required />
          </div>
          <div>
            <label className={styles.accountLabel} htmlFor="siret">Numéro SIRET</label>
            <input className={styles.accountInput} type="text" id="siret" name="siret" defaultValue={user.siret || ""} placeholder="000 000 000 00000" inputMode="numeric" />
          </div>
          <div>
            <label className={styles.accountLabel} htmlFor="phone">Téléphone</label>
            <input className={styles.accountInput} type="tel" id="phone" name="phone" defaultValue={user.phone || ""} placeholder="+33 6 00 00 00 00" />
          </div>
          <div className={styles.accountFieldFull}>
            <label className={styles.accountLabel} htmlFor="address">Adresse de facturation</label>
            <input className={styles.accountInput} type="text" id="address" name="address" defaultValue={user.address || ""} placeholder="Numéro, rue, code postal et ville" />
          </div>
        </div>

        <div className={styles.preferenceBlock}>
          <div className={styles.preferenceHeading}><span>Notifications</span><small>Choisissez les canaux que nous pouvons utiliser.</small></div>
          <label className={styles.preferenceRow}>
            <span><strong>Alertes par email</strong><small>Nouveaux messages, devis et factures.</small></span>
            <input className={styles.toggleInput} type="checkbox" name="notifEmail" defaultChecked={user.notifEmail} /><i className={styles.toggle} />
          </label>
          <label className={styles.preferenceRow}>
            <span><strong>Alertes dans l’espace client</strong><small>Activité récente visible sur le tableau de bord.</small></span>
            <input className={styles.toggleInput} type="checkbox" name="notifInApp" defaultChecked={user.notifInApp} /><i className={styles.toggle} />
          </label>
        </div>
        <Feedback state={state} />
      </div>
      <footer className={styles.settingsFooter}>
        <span>Dernière mise à jour enregistrée automatiquement après validation.</span>
        <button type="submit" className={styles.saveButton} disabled={pending}>{pending ? "Enregistrement…" : "Enregistrer les modifications"}</button>
      </footer>
    </form>
  );
}

export function PasswordForm() {
  const [state, action, pending] = useActionState(changePassword, undefined);

  return (
    <form action={action} className={styles.settingsCard}>
      <header className={styles.settingsHeader}>
        <div className={styles.settingsIndex}>02</div>
        <div><h2>Sécurité du compte</h2><p>Renouvelez régulièrement votre mot de passe.</p></div>
        <span className={styles.securityBadge}>Connexion protégée</span>
      </header>
      <div className={styles.settingsBody}>
        <div className={styles.accountFieldGrid}>
          <div className={styles.accountFieldFull}>
            <label className={styles.accountLabel} htmlFor="currentPassword">Mot de passe actuel</label>
            <input className={styles.accountInput} type="password" id="currentPassword" name="currentPassword" autoComplete="current-password" required />
            {state?.errors?.currentPassword && <span className={styles.fieldError}>{state.errors.currentPassword[0]}</span>}
          </div>
          <div>
            <label className={styles.accountLabel} htmlFor="newPassword">Nouveau mot de passe</label>
            <input className={styles.accountInput} type="password" id="newPassword" name="newPassword" autoComplete="new-password" required minLength={8} />
            {state?.errors?.newPassword && <span className={styles.fieldError}>{state.errors.newPassword[0]}</span>}
          </div>
          <div>
            <label className={styles.accountLabel} htmlFor="confirmPassword">Confirmation</label>
            <input className={styles.accountInput} type="password" id="confirmPassword" name="confirmPassword" autoComplete="new-password" required minLength={8} />
            {state?.errors?.confirmPassword && <span className={styles.fieldError}>{state.errors.confirmPassword[0]}</span>}
          </div>
        </div>
        <div className={styles.passwordHint}><strong>Conseil</strong><span>Utilisez au moins 8 caractères, avec chiffres et caractères spéciaux.</span></div>
        <Feedback state={state} />
      </div>
      <footer className={styles.settingsFooter}>
        <span>La modification ne déconnecte pas vos appareils actuels.</span>
        <button type="submit" className={styles.saveButton} disabled={pending}>{pending ? "Modification…" : "Mettre à jour le mot de passe"}</button>
      </footer>
    </form>
  );
}
