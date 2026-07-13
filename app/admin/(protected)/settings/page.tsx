import { db } from "@/lib/db";
import { updateSettings } from "../../actions/settings";

export default async function AdminSettingsPage() {
  const settings = await db.settings.findFirst();

  return (
    <div style={{ maxWidth: "800px" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Paramètres Globaux</h1>
      <p style={{ color: "var(--nv-text-secondary)", marginBottom: "2rem" }}>Ces informations sont utilisées dans la génération des devis, factures et autres documents officiels.</p>

      <form action={updateSettings} className="nv-card" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        
        <div>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem", borderBottom: "1px solid var(--nv-border-light)", paddingBottom: "0.5rem" }}>Informations de l'Agence</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div><label className="nv-label">Nom de l'entreprise</label><input type="text" name="agencyName" className="nv-input" defaultValue={settings?.agencyName || "NOVAVOX"} required /></div>
            <div><label className="nv-label">SIRET</label><input type="text" name="agencySiret" className="nv-input" defaultValue={settings?.agencySiret || ""} /></div>
            <div><label className="nv-label">Email de contact</label><input type="email" name="agencyEmail" className="nv-input" defaultValue={settings?.agencyEmail || "contact@novavox.fr"} required /></div>
            <div><label className="nv-label">Téléphone</label><input type="text" name="agencyPhone" className="nv-input" defaultValue={settings?.agencyPhone || ""} /></div>
            <div style={{ gridColumn: "1 / -1" }}><label className="nv-label">Adresse postale</label><input type="text" name="agencyAddress" className="nv-input" defaultValue={settings?.agencyAddress || ""} /></div>
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem", borderBottom: "1px solid var(--nv-border-light)", paddingBottom: "0.5rem" }}>Facturation</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
            <div>
              <label className="nv-label">Taux de TVA (%)</label>
              <input type="number" name="defaultTva" className="nv-input" defaultValue={settings?.defaultTva || 0} step="0.1" min="0" />
              <p style={{ fontSize: "0.8rem", color: "var(--nv-text-muted)", marginTop: "0.25rem" }}>Mettre 0 pour auto-entrepreneur (TVA non applicable).</p>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button type="submit" className="nv-btn nv-btn-primary">Enregistrer les paramètres</button>
        </div>

      </form>
    </div>
  );
}
