import { verifyEmail } from "../actions/auth";
import Link from "next/link";

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const token = resolvedParams.token as string | undefined;

  let success = false;
  let message = "Lien invalide ou expiré.";

  if (token) {
    const result = await verifyEmail(token);
    success = result.success ?? false;
    message = result.message ?? message;
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div className="nv-card" style={{ width: "100%", maxWidth: "450px", padding: "3rem 2rem", textAlign: "center" }}>
        <span style={{ fontSize: "3rem", display: "block", marginBottom: "1.5rem" }}>
          {success ? "✅" : "❌"}
        </span>
        <h2 style={{ marginBottom: "1rem" }}>
          {success ? "Email vérifié !" : "Échec de la vérification"}
        </h2>
        <p style={{ color: "var(--nv-text-secondary)", lineHeight: 1.6, marginBottom: "2rem" }}>
          {message}
        </p>
        <Link href="/client/login" className="nv-btn nv-btn-primary" style={{ justifyContent: "center", width: "100%" }}>
          Aller à la connexion
        </Link>
      </div>
    </div>
  );
}
