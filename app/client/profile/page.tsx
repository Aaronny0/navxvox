import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { ProfileForm, PasswordForm } from "../components/ProfileForms";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) return null;

  const user = await db.user.findUnique({
    where: { id: session.userId },
  });

  if (!user) return null;

  return (
    <div style={{ maxWidth: "800px" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", margin: "0 0 0.5rem" }}>Mon Profil</h1>
        <p style={{ color: "var(--nv-text-secondary)", margin: 0 }}>
          Gérez vos informations et préférences.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <ProfileForm user={user} />
        <PasswordForm />
      </div>
    </div>
  );
}
