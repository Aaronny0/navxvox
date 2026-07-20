import type { Metadata } from "next";
import LegalDocument from "@/app/components/LegalDocument";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et protection des données personnelles sur le site NOVAVOX.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalDocument
      eyebrow="Vos données"
      title="Politique de confidentialité"
      intro="Cette politique explique quelles données NOVAVOX utilise, pourquoi elles sont nécessaires et comment exercer vos droits."
    >
      <section>
        <h2>1. Responsable du traitement</h2>
        <p>
          NOVAVOX, agence créative et digitale située à Cotonou, Bénin, détermine les finalités des
          traitements réalisés sur ce site. Pour toute question relative à vos données, écrivez à
          <a href="mailto:novavox30@gmail.com"> novavox30@gmail.com</a>.
        </p>
      </section>

      <section>
        <h2>2. Données concernées</h2>
        <ul>
          <li>Données de compte : nom, prénom, adresse électronique, entreprise, téléphone et mot de passe chiffré.</li>
          <li>Données de projet : brief, budget indicatif, échéance, messages, fichiers, devis et factures.</li>
          <li>Données de contact : informations transmises volontairement lors d’une prise de contact.</li>
          <li>Données techniques nécessaires à la sécurité, à l’authentification et au fonctionnement du service.</li>
        </ul>
      </section>

      <section>
        <h2>3. Finalités</h2>
        <ul>
          <li>Créer et sécuriser l’espace client.</li>
          <li>Répondre aux demandes et préparer une proposition adaptée.</li>
          <li>Gérer les commandes, projets, échanges, devis et factures.</li>
          <li>Envoyer les notifications utiles au suivi de la relation client.</li>
          <li>Prévenir les abus et maintenir la sécurité du site.</li>
          <li>Respecter les obligations légales, comptables et administratives applicables.</li>
        </ul>
      </section>

      <section>
        <h2>4. Fondements et minimisation</h2>
        <p>
          Les traitements reposent, selon le cas, sur les démarches précontractuelles demandées par
          l’utilisateur, l’exécution de la relation contractuelle, le respect d’une obligation légale,
          le consentement ou l’intérêt légitime de NOVAVOX à sécuriser et améliorer ses services.
        </p>
        <p>
          NOVAVOX limite la collecte aux informations pertinentes pour une finalité déterminée, explicite
          et légitime, conformément au Code du numérique béninois.
        </p>
      </section>

      <section>
        <h2>5. Destinataires et transferts</h2>
        <p>
          Les données sont accessibles aux personnes habilitées de NOVAVOX et, lorsque cela est nécessaire,
          aux prestataires techniques ou professionnels intervenant pour l’hébergement, la maintenance,
          l’envoi de courriels, la facturation ou la sécurité. Elles ne sont ni vendues ni cédées à des fins
          publicitaires.
        </p>
        <p>
          Si un prestataire traite des données hors du Bénin, NOVAVOX veille à l’existence d’un niveau de
          protection adéquat ou de garanties appropriées, conformément aux règles applicables.
        </p>
      </section>

      <section>
        <h2>6. Durée de conservation</h2>
        <p>
          Les données sont conservées pendant la durée nécessaire au traitement de la demande, à la gestion
          du compte et à la réalisation du projet, puis archivées pendant les délais imposés par les obligations
          légales ou nécessaires à la défense des droits de NOVAVOX. Elles sont ensuite supprimées ou anonymisées.
        </p>
      </section>

      <section>
        <h2>7. Cookies et session</h2>
        <p>
          Le site utilise un cookie de session strictement nécessaire pour authentifier l’utilisateur et
          protéger l’accès à l’espace client. Aucun dispositif publicitaire ou de profilage n’est actuellement
          intégré. Si de nouveaux outils de mesure ou de marketing sont ajoutés, cette politique et le mécanisme
          de consentement seront adaptés avant leur activation.
        </p>
      </section>

      <section>
        <h2>8. Sécurité</h2>
        <p>
          NOVAVOX met en œuvre des mesures techniques et organisationnelles proportionnées pour limiter les
          accès non autorisés, la perte, l’altération ou la divulgation des données. Aucun système ne pouvant
          offrir une sécurité absolue, chaque utilisateur doit conserver ses identifiants confidentiels.
        </p>
      </section>

      <section>
        <h2>9. Vos droits</h2>
        <p>
          Vous pouvez demander l’accès, la rectification, la mise à jour, le verrouillage ou l’effacement de
          vos données, et vous opposer à certains traitements pour un motif légitime. Vous pouvez également
          vous opposer sans justification à la prospection commerciale.
        </p>
        <p>
          Adressez votre demande à <a href="mailto:novavox30@gmail.com">novavox30@gmail.com</a>, avec les
          éléments permettant de vérifier votre identité. Vous pouvez aussi saisir l’Autorité de Protection
          des Données à caractère Personnel du Bénin via
          <a href="https://service.apdp.bj/" target="_blank" rel="noreferrer"> service.apdp.bj</a>.
        </p>
      </section>

      <section>
        <h2>10. Références et évolution</h2>
        <p>
          Cette politique s’appuie sur le livre V de la loi n° 2017-20 du 20 avril 2018 portant Code du
          numérique en République du Bénin. Elle peut être modifiée pour suivre l’évolution du service ou
          du cadre juridique. La date affichée en tête de page indique la dernière version.
        </p>
      </section>
    </LegalDocument>
  );
}
