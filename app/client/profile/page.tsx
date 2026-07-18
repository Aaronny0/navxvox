import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { ProfileForm, PasswordForm } from "../components/ProfileForms";
import styles from "../portal.module.css";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) return null;
  const user = await db.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      companyName: true,
      phone: true,
      address: true,
      siret: true,
      emailVerified: true,
      notifEmail: true,
      notifInApp: true,
      createdAt: true,
    },
  });
  if (!user) return null;

  const fields = [user.companyName, user.phone, user.address, user.siret];
  const completion = Math.round((fields.filter(Boolean).length / fields.length) * 100);
  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();

  return (
    <div>
      <header className={styles.pageHeaderRefined}>
        <div>
          <p className={styles.eyebrow}>Identité & préférences</p>
          <h1 className={styles.pageTitle}>Mon compte</h1>
          <p className={styles.pageIntro}>Les informations utilisées pour vos projets, devis et documents.</p>
        </div>
        <div className={styles.headerPill}>Client depuis {user.createdAt.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}</div>
      </header>

      <div className={styles.profileLayout}>
        <aside className={styles.profileCard}>
          <div className={styles.profileAccent} />
          <div className={styles.profileAvatarLarge}>{initials}<span className={styles.profileOnline} /></div>
          <h2 className={styles.profileName}>{user.firstName} {user.lastName}</h2>
          <p className={styles.profileCompany}>{user.companyName}</p>
          <span className={styles.profileRole}>Compte client</span>

          <div className={styles.completionBlock}>
            <div className={styles.completionTop}><span>Profil complété</span><strong>{completion}%</strong></div>
            <div className={styles.completionTrack}><div style={{ width: `${completion}%` }} /></div>
            <p>{completion === 100 ? "Votre dossier est complet." : "Complétez vos coordonnées pour accélérer la préparation des documents."}</p>
          </div>

          <dl className={styles.profileFacts}>
            <div><dt>Email</dt><dd>{user.email}</dd></div>
            <div><dt>Vérification</dt><dd className={user.emailVerified ? styles.verified : styles.unverified}>{user.emailVerified ? "Email vérifié" : "À vérifier"}</dd></div>
            <div><dt>Référence</dt><dd>NV-{user.id.slice(-6).toUpperCase()}</dd></div>
          </dl>
        </aside>

        <div className={styles.settingsStack}>
          <ProfileForm user={user} />
          <PasswordForm />
        </div>
      </div>
    </div>
  );
}
