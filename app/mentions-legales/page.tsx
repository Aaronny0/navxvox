import type { Metadata } from "next";
import LegalDocument from "@/app/components/LegalDocument";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site NOVAVOX, agence créative et digitale à Cotonou, Bénin.",
};

export default function MentionsLegalesPage() {
  return (
    <LegalDocument
      eyebrow="Cadre juridique"
      title="Mentions légales"
      intro="Les informations essentielles concernant l’éditeur, le fonctionnement et les contenus du site NOVAVOX."
    >
      <div className={styles.notice}>
        Avant la mise en production, NOVAVOX doit encore renseigner son statut juridique, son RCCM/IFU,
        l’identité du responsable de publication, l’hébergeur et, le cas échéant, le numéro de déclaration APDP.
        Ces informations factuelles ne sont pas inventées ici.
      </div>

      <section>
        <h2>1. Éditeur du site</h2>
        <div className={styles.factGrid}>
          <div className={styles.fact}><span>Nom commercial</span><strong>NOVAVOX</strong></div>
          <div className={styles.fact}><span>Activité</span><strong>Agence créative et digitale</strong></div>
          <div className={styles.fact}><span>Adresse</span><strong>Cotonou, Bénin</strong></div>
          <div className={styles.fact}><span>Téléphone</span><strong>01 62 08 91 61</strong></div>
          <div className={styles.fact}><span>Courriel</span><strong>novavox30@gmail.com</strong></div>
          <div className={styles.fact}><span>Site</span><strong>novavox.fr</strong></div>
        </div>
        <p>Statut juridique, capital social, RCCM et IFU : à compléter par l’éditeur.</p>
        <p>Responsable de la publication : à compléter par l’éditeur.</p>
      </section>

      <section>
        <h2>2. Hébergement</h2>
        <p>
          L’identité, l’adresse et les coordonnées de l’hébergeur doivent être ajoutées dès que le prestataire
          de mise en production est définitivement choisi.
        </p>
      </section>

      <section>
        <h2>3. Propriété intellectuelle</h2>
        <p>
          La structure du site, les textes, créations graphiques, photographies, vidéos, illustrations,
          marques et éléments visuels présentés par NOVAVOX sont protégés par les règles applicables à la
          propriété intellectuelle. Certains projets restent la propriété de leurs clients ou de leurs auteurs
          et sont présentés avec les droits d’usage correspondants.
        </p>
        <p>
          Toute reproduction, adaptation, diffusion ou exploitation, totale ou partielle, sans autorisation
          écrite préalable de NOVAVOX ou du titulaire des droits concerné est interdite, hors usages autorisés
          par la loi.
        </p>
      </section>

      <section>
        <h2>4. Informations et responsabilité</h2>
        <p>
          NOVAVOX s’efforce de fournir des informations exactes et à jour. Les contenus ont une vocation
          générale et ne constituent pas un conseil juridique, financier ou technique individualisé.
          L’utilisateur reste responsable de ses décisions et de la protection de son équipement.
        </p>
        <p>
          La disponibilité continue du site ne peut être garantie, notamment pendant les opérations de
          maintenance, les mises à jour ou en cas d’événement indépendant de NOVAVOX.
        </p>
      </section>

      <section>
        <h2>5. Liens externes</h2>
        <p>
          Les liens vers des services tiers sont proposés à titre pratique. NOVAVOX ne contrôle pas leur
          contenu, leur disponibilité ni leurs pratiques de confidentialité et ne saurait en répondre.
        </p>
      </section>

      <section>
        <h2>6. Droit applicable et contact</h2>
        <p>
          Le site est exploité depuis le Bénin et relève du droit béninois, notamment de la loi n° 2017-20
          du 20 avril 2018 portant Code du numérique en République du Bénin.
        </p>
        <address>
          Pour toute question : <a href="mailto:novavox30@gmail.com">novavox30@gmail.com</a> —
          <a href="tel:0162089161"> 01 62 08 91 61</a>.
        </address>
      </section>
    </LegalDocument>
  );
}
