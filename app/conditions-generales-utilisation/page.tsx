import type { Metadata } from "next";
import LegalDocument from "@/app/components/LegalDocument";

export const metadata: Metadata = {
  title: "Conditions générales d’utilisation",
  description: "Conditions générales d’utilisation du site et de l’espace client NOVAVOX.",
};

export default function ConditionsGeneralesUtilisationPage() {
  return (
    <LegalDocument
      eyebrow="Utilisation du site"
      title="Conditions générales d’utilisation"
      intro="Les présentes CGU encadrent l’accès au site NOVAVOX et à ses fonctionnalités, notamment l’espace client."
    >
      <section>
        <h2>1. Objet et acceptation</h2>
        <p>
          L’accès ou l’utilisation du site implique l’acceptation des présentes conditions. Si vous n’y
          consentez pas, vous devez cesser d’utiliser les fonctionnalités concernées. Les propositions,
          devis, contrats ou conditions particulières acceptés pour un projet prévalent sur les CGU en cas
          de contradiction.
        </p>
      </section>

      <section>
        <h2>2. Services accessibles</h2>
        <p>
          Le site présente l’agence, ses services, ses réalisations et ses contenus éditoriaux. L’espace
          client permet notamment de transmettre un brief, suivre une commande ou un projet, échanger des
          messages, consulter des documents et gérer certaines informations de compte.
        </p>
        <p>
          La présentation d’un service ou l’envoi d’un brief ne vaut pas acceptation automatique d’une
          commande. L’engagement de NOVAVOX résulte des documents contractuels validés entre les parties.
        </p>
      </section>

      <section>
        <h2>3. Compte client</h2>
        <ul>
          <li>L’utilisateur fournit des informations exactes, complètes et à jour.</li>
          <li>Il protège ses identifiants et signale sans délai toute utilisation non autorisée.</li>
          <li>Il reste responsable des actions effectuées depuis son compte, sauf preuve d’un accès frauduleux.</li>
          <li>NOVAVOX peut suspendre un compte en cas de risque de sécurité, de fraude ou de violation des CGU.</li>
        </ul>
      </section>

      <section>
        <h2>4. Comportements interdits</h2>
        <p>L’utilisateur s’interdit notamment de :</p>
        <ul>
          <li>contourner les dispositifs de sécurité ou tenter d’accéder à des données qui ne lui appartiennent pas ;</li>
          <li>introduire un programme malveillant ou perturber le fonctionnement du site ;</li>
          <li>publier un contenu illicite, trompeur, haineux, diffamatoire ou portant atteinte aux droits d’un tiers ;</li>
          <li>transmettre des fichiers dont il ne possède pas les droits d’utilisation nécessaires ;</li>
          <li>utiliser le site à des fins de prospection automatisée, d’extraction massive ou de fraude.</li>
        </ul>
      </section>

      <section>
        <h2>5. Contenus et droits</h2>
        <p>
          Les contenus fournis par l’utilisateur restent sous sa responsabilité. Il garantit disposer des
          autorisations nécessaires pour permettre à NOVAVOX de les utiliser dans le cadre du projet demandé.
          Les droits portant sur les livrables sont déterminés par le devis, le contrat ou les conditions
          particulières du projet.
        </p>
        <p>
          Hors autorisation expresse, les éléments du site NOVAVOX ne peuvent pas être reproduits, modifiés,
          distribués ou exploités commercialement.
        </p>
      </section>

      <section>
        <h2>6. Disponibilité et maintenance</h2>
        <p>
          NOVAVOX peut interrompre temporairement tout ou partie du site pour maintenance, amélioration,
          sécurité ou en cas de force majeure. L’agence s’efforce de rétablir le service dans un délai
          raisonnable, sans garantir une disponibilité permanente ou exempte d’erreur.
        </p>
      </section>

      <section>
        <h2>7. Responsabilité</h2>
        <p>
          Dans les limites autorisées par la loi, NOVAVOX répond des dommages directs démontrés résultant
          d’un manquement qui lui est imputable. L’agence ne saurait répondre d’une mauvaise utilisation du
          site, d’un fait d’un tiers, d’une indisponibilité externe ou d’un dommage indirect.
        </p>
      </section>

      <section>
        <h2>8. Données personnelles</h2>
        <p>
          Les traitements de données liés au site et à l’espace client sont décrits dans la
          <a href="/politique-de-confidentialite"> politique de confidentialité</a>.
        </p>
      </section>

      <section>
        <h2>9. Modification, droit applicable et contact</h2>
        <p>
          NOVAVOX peut faire évoluer les CGU ; la nouvelle version s’applique dès sa publication pour les
          usages futurs. Les présentes conditions relèvent du droit béninois. Les parties rechercheront une
          solution amiable avant de saisir les juridictions compétentes.
        </p>
        <p>
          Pour toute question : <a href="mailto:novavox30@gmail.com">novavox30@gmail.com</a>.
        </p>
      </section>
    </LegalDocument>
  );
}
