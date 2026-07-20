// lib/data.ts — Données mockées NOVAVOX

/* ============================================================
   TYPES
   ============================================================ */

export interface Service {
  id: string;
  slug: string;
  icon: string;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  delay?: string;
  price?: string;
  color: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  categorySlug: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  year?: number;
  featured: boolean;
  results?: string[];
  link?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  project?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  categorySlug: string;
  tags: string[];
  author: string;
  authorRole: string;
  authorAvatar: string;
  date: string;
  readTime: number;
  featured: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  skills: string[];
  socials: { linkedin?: string; twitter?: string; github?: string };
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

export interface TimelineStep {
  step: number;
  icon: string;
  title: string;
  description: string;
  duration: string;
}

/* ============================================================
   SERVICES
   ============================================================ */

export const services: Service[] = [
  {
    id: "s1",
    slug: "communication-strategie",
    icon: "📣",
    title: "Communication & Stratégie",
    description:
      "Stratégies de communication cohérentes pour renforcer votre visibilité, votre réputation et votre impact.",
    longDescription:
      "Nous définissons une communication claire et adaptée à vos publics, de votre positionnement jusqu'au déploiement de vos campagnes sur les canaux les plus pertinents.",
    features: [
      "Audit et positionnement",
      "Plan de communication",
      "Conception de campagnes",
      "Calendrier éditorial",
      "Communication digitale",
      "Suivi des performances",
    ],
    delay: "Ponctuel ou continu",
    color: "#2ec4b6",
  },
  {
    id: "s2",
    slug: "branding-identite-visuelle",
    icon: "✦",
    title: "Branding & Identité Visuelle",
    description:
      "Des identités de marque distinctives, cohérentes et mémorables qui traduisent clairement votre positionnement.",
    longDescription:
      "Nous construisons l'univers complet de votre marque afin qu'elle soit immédiatement reconnaissable et cohérente sur chaque point de contact.",
    features: [
      "Stratégie et plateforme de marque",
      "Création ou refonte de logo",
      "Charte graphique complète",
      "Palette, typographies et iconographie",
      "Déclinaisons de marque",
      "Guidelines d'utilisation",
    ],
    delay: "1–4 semaines",
    color: "#2ec4b6",
  },
  {
    id: "s3",
    slug: "creation-graphique-contenus",
    icon: "🎨",
    title: "Création Graphique & Contenus",
    description:
      "Des supports visuels professionnels conçus pour informer, séduire et faire vivre votre communication.",
    longDescription:
      "Notre équipe créative transforme vos messages en supports visuels forts, adaptés au digital, à l'impression et à vos campagnes de communication.",
    features: [
      "Affiches, flyers et brochures",
      "Visuels pour réseaux sociaux",
      "Présentations commerciales",
      "Packaging et mockups",
      "Direction artistique",
      "Déclinaisons multi-formats",
    ],
    delay: "Selon le projet",
    color: "#2ec4b6",
  },
  {
    id: "s4",
    slug: "sites-web-e-commerce",
    icon: "🌐",
    title: "Sites Web & E-commerce",
    description:
      "Sites vitrines et boutiques en ligne rapides, responsives et pensés pour convertir vos visiteurs.",
    longDescription:
      "De la maquette à la mise en ligne, nous créons des expériences web sur mesure qui valorisent votre activité et facilitent le parcours de vos clients.",
    features: [
      "Site vitrine et landing page",
      "Boutique et catalogue en ligne",
      "Design responsive sur mesure",
      "Paiement et gestion des commandes",
      "Référencement technique",
      "Hébergement et déploiement",
    ],
    delay: "2–8 semaines",
    color: "#2ec4b6",
  },
  {
    id: "s5",
    slug: "applications-solutions-digitales",
    icon: "⚡",
    title: "Applications & Solutions Digitales",
    description:
      "Applications métier et plateformes personnalisées pour simplifier vos processus et soutenir votre croissance.",
    longDescription:
      "Nous concevons des outils digitaux robustes adaptés à votre fonctionnement : espaces sécurisés, tableaux de bord, gestion interne et automatisations.",
    features: [
      "Applications web métier",
      "Tableaux de bord",
      "Authentification et rôles",
      "API et intégrations",
      "Bases de données",
      "Maintenance évolutive",
    ],
    delay: "4–12 semaines",
    color: "#2ec4b6",
  },
  {
    id: "s6",
    slug: "securite-informatique",
    icon: "🛡️",
    title: "Sécurité Informatique",
    description:
      "Protection de vos sites, applications et données grâce à des mesures de sécurité adaptées à vos risques.",
    longDescription:
      "Nous vous aidons à identifier les vulnérabilités, renforcer vos accès et mettre en place de bonnes pratiques pour réduire durablement les risques numériques.",
    features: [
      "Audit de sécurité",
      "Sécurisation des sites et applications",
      "Protection des accès et des données",
      "Sauvegardes et plan de reprise",
      "Sensibilisation des équipes",
      "Accompagnement en cas d'incident",
    ],
    delay: "Audit ou accompagnement",
    color: "#2ec4b6",
  },
];

/* ============================================================
   PROJETS PORTFOLIO
   ============================================================ */

export const projects: Project[] = [
  {
    id: "p1",
    slug: "sbc-shop",
    title: "sbc.shop",
    client: "SBC Shop",
    category: "E-commerce",
    categorySlug: "e-commerce",
    description:
      "Boutique en ligne d'électronique et de gadgets tech pensée pour découvrir les nouveautés aux meilleurs prix.",
    longDescription:
      "sbc.shop est une boutique en ligne dédiée aux produits électroniques et aux gadgets technologiques. La plateforme met en avant les nouveautés, les meilleurs prix et un catalogue clair d'écouteurs, de tablettes et d'accessoires. La recherche intégrée et le panier facilitent le parcours d'achat sur ordinateur comme sur mobile.",
    image: "/portfolio/sbc-shop.png",
    technologies: ["Catalogue produits", "Recherche", "Panier", "Responsive"],
    featured: true,
    link: "https://gocart-navy-psi.vercel.app/",
  },
  {
    id: "p2",
    slug: "portfolio-kegbe-arsene",
    title: "Portfolio KEGBE Arsène",
    client: "KEGBE Arsène",
    category: "Site Vitrine",
    categorySlug: "site-vitrine",
    description:
      "Portfolio professionnel consacré à l'architecture et au génie civil, avec une approche sobre et technique.",
    longDescription:
      "Ce portfolio professionnel met en valeur l'expertise de KEGBE Arsène en architecture et en génie civil, ainsi que son approche axée sur la conception durable de projets d'envergure. Son interface sombre et élégante permet de découvrir les réalisations, d'explorer les services et de télécharger directement le CV depuis la page d'accueil.",
    image: "/portfolio/architech.png",
    technologies: ["Portfolio", "Galerie de projets", "Services", "CV téléchargeable"],
    featured: true,
    link: "https://architech-sepia.vercel.app/",
  },
  {
    id: "p3",
    slug: "ycate-luxury",
    title: "YCATE Luxury",
    client: "YCATE",
    category: "E-commerce",
    categorySlug: "e-commerce",
    description:
      "Boutique en ligne de produits ésotériques et spirituels inspirée par la Sagesse des Anciens.",
    longDescription:
      "YCATE est une boutique en ligne spécialisée dans les produits ésotériques et spirituels : encens, lotions, pierres, bijoux, bougies, amulettes, pentacles et ouvrages. Son interface épurée organise clairement les différents univers spirituels afin de faciliter l'exploration du catalogue et le parcours d'achat.",
    image: "/portfolio/ycate.png",
    technologies: ["Catalogue", "Catégories", "Recherche", "E-commerce"],
    featured: true,
    link: "https://ycate-com.vercel.app/",
  },
  {
    id: "p4",
    slug: "vortex-gestion-boutique",
    title: "VORTEX",
    client: "VORTEX — Gestion de Boutique",
    category: "Application Web",
    categorySlug: "application-web",
    description:
      "Application sécurisée de gestion commerciale pour piloter les stocks, les ventes et les opérations financières.",
    longDescription:
      "VORTEX est une application web de gestion de boutique conçue pour optimiser le suivi des stocks et des opérations financières. Son espace personnel sécurisé donne accès à des outils de pilotage commercial et administratif destinés à simplifier la gestion quotidienne des activités de vente.",
    image: "/portfolio/vortex.png",
    technologies: ["Espace sécurisé", "Gestion des stocks", "Ventes", "Suivi financier"],
    featured: false,
    link: "https://gestion-stock-finance.vercel.app/",
  },
  {
    id: "p5",
    slug: "gksmobile-world",
    title: "GKSMOBILE WORLD",
    client: "GKSMOBILE WORLD Sikecodji",
    category: "E-commerce",
    categorySlug: "e-commerce",
    description:
      "Plateforme de vente de smartphones et d'accessoires technologiques avec consultation rapide du stock.",
    longDescription:
      "GKSMOBILE WORLD est une plateforme de vente spécialisée dans les smartphones et accessoires technologiques. Elle met en avant une sélection de modèles récents, notamment les dernières générations d'iPhone, et permet aux clients de parcourir le catalogue, de consulter les produits disponibles et de contacter rapidement la boutique pour finaliser une transaction.",
    image: "/portfolio/gksmobile.png",
    technologies: ["Catalogue mobile", "Stock disponible", "Fiches produits", "Contact direct"],
    featured: false,
    link: "https://gks-mobile-world.vercel.app/",
  },
];

export const projectCategories = [
  "Tous",
  "Site Vitrine",
  "E-commerce",
  "Application Web",
  "Design UX/UI",
];

/* ============================================================
   TÉMOIGNAGES
   ============================================================ */

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sophie Marchetti",
    role: "Directrice Marketing",
    company: "LuxeMaison SAS",
    avatar: "SM",
    content:
      "NOVAVOX a transformé notre présence en ligne. Leur sens du détail et leur maîtrise du design premium ont parfaitement traduit l'identité de notre marque. Le résultat a dépassé toutes nos attentes — notre taux de conversion a explosé !",
    rating: 5,
    project: "LuxeMaison Paris",
  },
  {
    id: "t2",
    name: "Dr. Pierre Lefebvre",
    role: "Médecin Fondateur",
    company: "VitalDoc SAS",
    avatar: "PL",
    content:
      "L'équipe NOVAVOX a compris les enjeux complexes de notre secteur médical dès le premier échange. Ils ont livré une plateforme robuste, sécurisée et intuitive, bien avant le délai prévu. Un partenaire de confiance.",
    rating: 5,
    project: "VitalDoc Platform",
  },
  {
    id: "t3",
    name: "Émile Fontaine",
    role: "Chef & Propriétaire",
    company: "Restaurant Gastronomia",
    avatar: "EF",
    content:
      "Je voulais un site à la hauteur de ma cuisine. NOVAVOX a créé quelque chose d'exceptionnel — élégant, rapide et qui donne envie de réserver immédiatement. Mes réservations en ligne ont doublé en trois mois.",
    rating: 5,
    project: "Gastronomia",
  },
  {
    id: "t4",
    name: "Camille Durand",
    role: "CEO",
    company: "Bloom Cosmetics",
    avatar: "CD",
    content:
      "Du premier appel à la mise en ligne, l'expérience NOVAVOX est irréprochable. Ils ont su traduire notre vision en une boutique e-commerce qui performe vraiment. Notre chiffre d'affaires a progressé de 120% !",
    rating: 5,
    project: "Bloom Skincare",
  },
  {
    id: "t5",
    name: "Antoine Bernard",
    role: "DSI",
    company: "TechFlow Industries",
    avatar: "AB",
    content:
      "Projet technique exigeant, délais serrés — NOVAVOX a relevé le défi avec brio. Leur équipe est réactive, transparente et livre un travail de haute qualité. Je les recommande sans hésitation pour tout projet web ambitieux.",
    rating: 5,
    project: "TechFlow Dashboard",
  },
];

/* ============================================================
   ARTICLES DE BLOG
   ============================================================ */

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    slug: "tendances-web-design-2025",
    title: "Identité visuelle : 7 principes pour rendre votre marque mémorable",
    excerpt:
      "Une belle marque ne repose pas uniquement sur un logo. Découvrez les principes qui rendent une identité cohérente, reconnaissable et durable.",
    content: `
# Identité visuelle : 7 principes pour rendre votre marque mémorable

Une identité visuelle ne sert pas seulement à embellir une entreprise. Elle permet à une marque d'être reconnue, comprise et choisie. Lorsqu'elle est bien construite, elle crée un fil conducteur entre une enseigne, une affiche, un emballage, un site web et une publication sur les réseaux sociaux.

Chez NOVAVOX, nous considérons l'identité comme un système vivant. Le logo en est une pièce importante, mais il ne peut pas porter seul toute la personnalité d'une organisation. Voici les principes qui donnent à une marque une présence réellement mémorable.

## 1. Commencer par une idée claire

Avant de choisir une couleur ou une police, il faut pouvoir répondre simplement à trois questions : qui êtes-vous, à qui vous adressez-vous et quelle impression souhaitez-vous laisser ? Une marque qui veut rassurer ne s'exprime pas comme une marque qui veut provoquer. Cette intention guide toutes les décisions visuelles qui suivent.

La clarté évite aussi de courir après toutes les tendances. Une direction artistique devient pertinente lorsqu'elle traduit une réalité de l'entreprise, pas lorsqu'elle imite ce qui fonctionne chez les autres.

## 2. Concevoir un logo qui fonctionne partout

Un bon logo doit rester lisible sur une carte de visite, un profil social, une devanture ou un emballage. Il doit exister en couleur, en noir et blanc, dans une version horizontale et parfois dans une version compacte. Tester ces usages dès la création évite les mauvaises surprises au moment de produire les supports.

La simplicité ne signifie pas l'absence de personnalité. Elle signifie que chaque forme a une fonction et que rien ne dépend d'un effet fragile pour être reconnaissable.

## 3. Construire une palette avec des rôles précis

Une palette efficace ne se limite pas à deux couleurs jolies côte à côte. Elle prévoit une couleur principale, des accents, des tons neutres, des fonds et des règles de contraste. Cette hiérarchie permet de savoir quelle couleur attire l'attention, laquelle organise l'information et laquelle facilite la lecture.

Les couleurs doivent également être testées sur écran et à l'impression. Un turquoise lumineux sur un téléphone peut perdre beaucoup de force sur un papier mal choisi. Anticiper les supports réels fait partie du travail de direction artistique.

## 4. Donner une voix à la marque par la typographie

La typographie influence la perception avant même que le texte soit lu. Une police géométrique peut évoquer la précision et la modernité ; une police plus organique peut transmettre la proximité ou l'artisanat. L'association de deux familles bien choisies suffit généralement à créer une hiérarchie riche et cohérente.

Il faut ensuite définir des tailles, des graisses et des espacements reproductibles. Ces règles évitent que chaque nouvelle affiche ou publication semble provenir d'une marque différente.

## 5. Créer un langage d'images reconnaissable

Photographies, illustrations, motifs et pictogrammes doivent partager une même intention. Une marque peut choisir des portraits très lumineux, des cadrages proches et des textures naturelles ; une autre préférera des compositions graphiques, des ombres fortes et des couleurs franches.

Dans un contexte africain, l'inspiration culturelle peut enrichir une identité à condition d'être précise et respectueuse. Utiliser systématiquement des motifs traditionnels sans lien avec le projet produit rapidement un décor générique. La culture devient forte lorsqu'elle est comprise, contextualisée et intégrée avec mesure.

## 6. Répéter sans devenir monotone

La reconnaissance naît de la répétition. Réutiliser les mêmes couleurs, principes de composition et traitements d'images permet au public d'identifier la marque sans voir son logo. Mais un système doit rester assez souple pour s'adapter à une promotion, un événement, un rapport ou une campagne digitale.

Une charte graphique utile montre donc des règles et des exemples concrets. Elle ne fige pas la création ; elle donne un cadre qui accélère les décisions.

## 7. Penser l'identité comme un investissement

Une identité cohérente réduit les hésitations, améliore la qualité des supports et renforce la confiance. Elle aide aussi les équipes, partenaires et prestataires à produire plus vite, car la direction est connue.

Avant de refaire votre logo une nouvelle fois, observez l'ensemble de votre présence : vos visuels racontent-ils la même histoire ? Vos couleurs sont-elles constantes ? Vos documents donnent-ils la même impression que votre site ? C'est souvent dans cette cohérence globale que se trouve le véritable potentiel d'une marque.
    `,
    image: "/blog/tendances-design.jpg",
    category: "Branding",
    categorySlug: "branding",
    tags: ["Identité visuelle", "Branding", "Logo", "Direction artistique"],
    author: "Marie Leblanc",
    authorRole: "Lead Designer",
    authorAvatar: "ML",
    date: "2026-02-12",
    readTime: 8,
    featured: true,
  },
  {
    id: "b2",
    slug: "nextjs-performance-2025",
    title: "Site web performant : transformer votre présence digitale en outil commercial",
    excerpt:
      "Un site efficace ne se contente pas d'être joli. Il guide, rassure et transforme les visiteurs en prospects grâce à une expérience rapide et structurée.",
    content: `
# Site web performant : transformer votre présence digitale en outil commercial

Votre site est souvent le premier échange entre votre entreprise et un futur client. En quelques secondes, ce visiteur cherche à comprendre ce que vous proposez, si vous êtes crédible et quelle action il doit effectuer. Un site performant répond à ces questions sans effort.

La performance ne désigne donc pas uniquement la vitesse technique. Elle réunit la clarté du message, la qualité de l'interface, la rapidité d'affichage et la capacité du site à produire un résultat utile pour l'entreprise.

## Définir la mission du site

Un site vitrine peut chercher à générer des demandes de devis, présenter un catalogue, rassurer des partenaires ou faciliter la prise de rendez-vous. Tant que cette mission n'est pas formulée, la page d'accueil accumule des informations sans hiérarchie.

Commencez par choisir une action principale. Chaque page doit ensuite aider le visiteur à avancer vers cette action, sans multiplier les boutons concurrents.

## Organiser le contenu selon les questions du client

L'entreprise pense souvent en services, en départements et en historique. Le visiteur, lui, pense en problème, en confiance et en résultat. Une structure efficace présente rapidement la promesse, les preuves, les offres, la méthode et le moyen de contacter l'équipe.

Les titres doivent pouvoir être compris en parcourant seulement la page. Les paragraphes complètent l'information, mais ils ne doivent pas porter seuls le message.

## Concevoir d'abord pour le mobile

Une grande partie du public découvre une marque depuis un téléphone, parfois avec une connexion instable. Sur mobile, le menu doit être évident, les boutons faciles à toucher et les textes confortables à lire. Les images doivent conserver leur impact sans ralentir la page.

Concevoir le mobile dès le départ oblige à faire des choix. Cette contrainte améliore généralement la version ordinateur, car elle élimine les éléments secondaires.

## Faire de la vitesse une qualité visible

Une page lente donne une impression d'amateurisme avant même d'avoir affiché son contenu. La compression des images, le chargement progressif, une architecture moderne et la réduction des scripts inutiles améliorent directement l'expérience.

La vitesse doit être contrôlée sur des appareils réels et pas uniquement sur l'ordinateur du développeur. Un site fluide dans un bureau équipé de fibre peut devenir pénible dans les conditions quotidiennes de ses utilisateurs.

## Rassurer avec des preuves concrètes

Les visiteurs accordent plus de valeur à des réalisations, des témoignages précis et une méthode claire qu'à de longues déclarations générales. Montrez le travail, expliquez le contexte et présentez le résultat obtenu. Les informations pratiques — adresse, délais, contact, garanties ou modalités — réduisent aussi l'incertitude.

## Guider vers une action simple

Un bon appel à l'action décrit la suite : demander un devis, planifier un échange, recevoir une proposition ou consulter un catalogue. Il doit apparaître au bon moment, être visible et conduire vers un formulaire court.

Après l'envoi, le visiteur doit savoir ce qui va se passer. Une confirmation claire et un délai de réponse annoncé prolongent la qualité de l'expérience.

## Mesurer pour améliorer

Un site n'est pas terminé le jour de sa mise en ligne. Il faut observer les pages consultées, les points d'abandon, les demandes reçues et les questions récurrentes. Ces informations permettent d'améliorer les textes, l'ordre des sections et les parcours.

Un site performant est donc un outil vivant. Lorsqu'il relie une stratégie claire, une identité forte et une réalisation technique soignée, il devient un véritable membre de l'équipe commerciale.
    `,
    image: "/blog/nextjs-performance.jpg",
    category: "Digital",
    categorySlug: "digital",
    tags: ["Site web", "Performance", "Conversion", "Expérience mobile"],
    author: "Thomas Girard",
    authorRole: "Lead Developer",
    authorAvatar: "TG",
    date: "2026-03-04",
    readTime: 9,
    featured: true,
  },
  {
    id: "b3",
    slug: "seo-local-strategies",
    title: "Visibilité locale : faire trouver votre entreprise à Cotonou et au-delà",
    excerpt:
      "Fiche établissement, contenus locaux, réputation et cohérence des informations : les bases pour être visible au moment où un client vous cherche.",
    content: `
# Visibilité locale : faire trouver votre entreprise à Cotonou et au-delà

Lorsqu'une personne cherche un restaurant, une boutique, une agence ou un prestataire près d'elle, sa décision se construit souvent avant le premier appel. Elle compare les informations disponibles, observe les photos, lit les avis et vérifie si l'entreprise semble active.

La visibilité locale consiste à rendre votre présence numérique aussi fiable que votre présence physique. Elle concerne les moteurs de recherche, les cartes, les réseaux sociaux et tous les endroits où votre nom, votre adresse ou votre numéro apparaissent.

## Stabiliser les informations essentielles

Le nom de l'entreprise, l'adresse, les horaires, le téléphone et le lien vers le site doivent être identiques partout. Une ancienne adresse sur une page sociale ou des horaires différents selon les plateformes créent de la confusion pour les clients et pour les moteurs de recherche.

Préparez une fiche de référence interne contenant la formulation exacte de ces informations. Chaque nouveau support doit reprendre cette base.

## Soigner la fiche établissement

Une fiche établissement complète peut devenir une mini-page d'accueil. Choisissez la bonne catégorie, rédigez une description concrète, ajoutez vos services et publiez des photos récentes de l'espace, des produits, de l'équipe ou des réalisations.

Les images authentiques sont plus utiles que des visuels génériques. Elles permettent au client de reconnaître le lieu, de comprendre la qualité du travail et de se projeter avant sa visite.

## Parler de sa zone avec naturel

Pour apparaître dans des recherches locales, votre site doit expliquer où vous intervenez. Une page de contact détaillée, des études de cas situées et des articles liés aux réalités du marché local donnent un contexte clair.

Il ne s'agit pas de répéter « Cotonou » dans chaque phrase. Il s'agit de produire des informations réellement utiles aux personnes de la zone : conditions de livraison, quartiers desservis, modalités de rendez-vous ou exemples de projets menés sur place.

## Transformer les avis en conversation

Les avis rassurent parce qu'ils montrent des expériences vécues. Demandez un retour après une prestation terminée, au moment où la satisfaction est encore fraîche. Facilitez la démarche avec un lien direct et une demande personnalisée.

Répondez ensuite à chaque avis avec sobriété. Une réponse professionnelle à une critique peut renforcer la confiance, car elle montre votre capacité à écouter et à résoudre un problème.

## Relier réseaux sociaux et recherche locale

Les réseaux sociaux ne remplacent pas un site ou une fiche établissement, mais ils prouvent que l'activité est vivante. Publiez des réalisations, des coulisses, des nouveautés et des informations pratiques. Indiquez clairement la ville et facilitez le passage vers WhatsApp, le téléphone ou le formulaire de contact.

## Créer une réputation cohérente

La visibilité ne sert à rien si les différents points de contact ne racontent pas la même histoire. Une identité visuelle reconnaissable, des photos de qualité et un ton constant rendent l'entreprise plus crédible sur chaque plateforme.

## Suivre les demandes réelles

Demandez aux nouveaux clients comment ils vous ont trouvé. Observez les appels, demandes d'itinéraire, clics vers le site et messages reçus. Ces signaux simples permettent d'identifier les plateformes qui produisent réellement des contacts.

La visibilité locale se construit avec régularité. Des informations fiables, des preuves récentes et une expérience de contact fluide permettent à une entreprise d'être trouvée, puis surtout d'être choisie.
    `,
    image: "/blog/seo-local.jpg",
    category: "SEO",
    categorySlug: "seo",
    tags: ["SEO", "Local", "Google", "Marketing"],
    author: "Laura Simon",
    authorRole: "SEO Strategist",
    authorAvatar: "LS",
    date: "2026-03-21",
    readTime: 8,
    featured: false,
  },
  {
    id: "b4",
    slug: "ux-conversion-rate-optimization",
    title: "Expérience utilisateur : transformer les visiteurs en clients sans les brusquer",
    excerpt:
      "Une interface qui convertit réduit les doutes, organise l'information et rend la prochaine étape évidente. Voici comment concevoir ce parcours.",
    content: `
# Expérience utilisateur : transformer les visiteurs en clients sans les brusquer

Attirer du trafic ne suffit pas. Si les visiteurs ne comprennent pas l'offre, hésitent devant le formulaire ou ne trouvent pas l'information recherchée, le site perd des opportunités déjà acquises.

L'expérience utilisateur et l'optimisation de la conversion poursuivent le même objectif : rendre la décision plus simple. Il ne s'agit pas de manipuler, mais d'enlever les obstacles entre une intention et une action utile.

## Comprendre ce que le visiteur veut accomplir

Chaque page correspond à une intention. Sur une page service, le visiteur veut vérifier si l'offre correspond à son problème. Sur une fiche produit, il évalue la qualité, le prix et les conditions. Sur une page contact, il veut savoir si l'échange sera simple.

Définir cette intention permet d'éliminer les blocs qui distraient et de renforcer les informations qui aident à décider.

## Construire une hiérarchie immédiatement lisible

Un écran doit indiquer où regarder en premier, puis en second. Le titre porte la promesse, le visuel donne le contexte et le bouton indique la suite. Si tous les éléments ont la même taille ou la même couleur, aucune priorité ne se dégage.

Les espaces vides jouent un rôle important. Ils séparent les idées et donnent aux contenus importants la place nécessaire pour être perçus.

## Répondre aux objections avant le formulaire

Un client hésite souvent pour des raisons prévisibles : le prix, le délai, la qualité, la livraison, la sécurité ou l'accompagnement. Les réponses peuvent apparaître sous forme de preuves, de questions fréquentes, de témoignages ou d'explications de méthode.

Plus ces éléments sont précis, moins le visiteur doit fournir d'effort pour se rassurer.

## Simplifier les formulaires

Chaque champ supplémentaire augmente l'effort demandé. Ne collectez au premier contact que les informations nécessaires pour répondre correctement. Un nom, un moyen de contact et une description libre suffisent souvent à lancer la conversation.

Les erreurs doivent être expliquées près du champ concerné et le message de confirmation doit annoncer clairement la prochaine étape.

## Adapter l'expérience au téléphone

Sur mobile, les boutons trop proches, les textes petits et les fenêtres envahissantes deviennent immédiatement pénibles. Les actions principales doivent rester accessibles au pouce et les formulaires doivent utiliser les claviers adaptés au type d'information attendu.

Il faut aussi vérifier les usages réels : ouverture d'un lien WhatsApp, appel direct, téléchargement d'un document ou consultation d'une carte.

## Utiliser les données sans perdre le bon sens

Les outils d'analyse montrent où les visiteurs quittent une page ou quels boutons sont utilisés. Ils ne disent pas toujours pourquoi. Complétez les chiffres par des retours clients, des tests simples et l'observation de personnes qui découvrent le site.

Une question posée régulièrement au téléphone indique souvent qu'une information manque sur la page.

## Améliorer par petites étapes

Changez un élément important à la fois : le titre, l'ordre des preuves, le formulaire ou l'appel à l'action. Observez ensuite l'effet sur les demandes et la qualité des contacts reçus.

Une bonne conversion est la conséquence d'une expérience honnête et fluide. Lorsque le visiteur comprend la valeur, trouve les réponses et sait quoi faire, l'action devient naturelle.
    `,
    image: "/blog/ux-cro.jpg",
    category: "UX/UI",
    categorySlug: "ux-ui",
    tags: ["UX", "CRO", "Conversion", "Analytics"],
    author: "Marie Leblanc",
    authorRole: "Lead Designer",
    authorAvatar: "ML",
    date: "2026-04-09",
    readTime: 8,
    featured: false,
  },
  {
    id: "b5",
    slug: "ecommerce-tunnel-vente",
    title: "E-commerce en Afrique de l'Ouest : concevoir un parcours de vente qui rassure",
    excerpt:
      "Mobile, paiement, livraison, WhatsApp et confiance : les décisions essentielles pour transformer une boutique en ligne en véritable canal de vente.",
    content: `
# E-commerce en Afrique de l'Ouest : concevoir un parcours de vente qui rassure

Une boutique en ligne ne réussit pas simplement parce qu'elle affiche des produits. Elle doit remplacer une partie des échanges qui se déroulent habituellement en magasin : voir le produit, poser une question, vérifier le prix, comprendre la livraison et décider comment payer.

Dans de nombreux marchés d'Afrique de l'Ouest, le téléphone et la messagerie occupent une place centrale. L'enjeu n'est pas de copier un parcours étranger, mais de créer une expérience adaptée aux habitudes réelles des clients.

## Commencer par un catalogue clair

Les catégories doivent correspondre au vocabulaire du public. Une recherche utile, des filtres simples et des photos cohérentes permettent de trouver rapidement le bon produit. Chaque fiche doit préciser les dimensions, variantes, disponibilité et conditions importantes.

Plus la fiche est complète, moins l'équipe reçoit de questions répétitives avant chaque commande.

## Investir dans les images produit

Le client ne peut ni toucher ni essayer le produit. Les images doivent donc montrer plusieurs angles, les détails, l'échelle et l'usage. Un éclairage constant et un fond cohérent donnent immédiatement une impression plus professionnelle.

Pour les vêtements, les accessoires ou les produits alimentaires, une mise en situation complète utilement les vues descriptives.

## Afficher le coût réel suffisamment tôt

Un prix incomplet crée de la frustration. Les frais de livraison, les zones desservies et les éventuels minimums de commande doivent être compréhensibles avant la dernière étape. Si le tarif dépend de la destination, expliquez clairement comment il sera calculé.

## Proposer des moyens de paiement adaptés

Le choix du paiement dépend du marché, du montant et du niveau de confiance. Mobile money, carte, paiement à la livraison ou virement peuvent coexister. Chaque option doit expliquer son fonctionnement et confirmer immédiatement que la commande a été prise en compte.

La sécurité ne se résume pas à un cadenas dans le navigateur. Une identité claire, des coordonnées vérifiables et une politique de retour accessible rassurent également.

## Utiliser WhatsApp comme accompagnement

WhatsApp facilite la question rapide et la confirmation d'une commande. Il devient toutefois difficile à gérer lorsqu'il remplace totalement le catalogue, le stock et le suivi. Le site doit structurer l'information ; la messagerie intervient ensuite pour accompagner les cas qui ont besoin d'un échange humain.

Un bouton peut transmettre automatiquement le nom du produit ou la référence afin d'éviter une conversation sans contexte.

## Rendre la livraison prévisible

Le client veut savoir où, quand et comment il recevra son achat. Présentez les zones, délais, tarifs et étapes de suivi avec des mots simples. Après la commande, envoyez des confirmations aux moments importants : validation, préparation, départ et livraison.

## Préparer le service après-vente

Les conditions d'échange ou de retour doivent être visibles avant l'achat. Même lorsqu'elles sont strictes, leur clarté inspire davantage confiance que le silence. Donnez un canal précis pour signaler un problème et annoncez un délai de réponse réaliste.

## Piloter la boutique avec les bonnes informations

Suivez les produits consultés, les recherches sans résultat, les paniers interrompus et les questions reçues. Ces données révèlent les problèmes de stock, de présentation ou de compréhension.

Un e-commerce efficace associe technologie et proximité. Il automatise ce qui doit l'être, tout en laissant une place claire à l'accompagnement humain lorsque le client en a besoin.
    `,
    image: "/blog/ecommerce-tunnel.jpg",
    category: "E-commerce",
    categorySlug: "e-commerce",
    tags: ["E-commerce", "Conversion", "UX", "Ventes"],
    author: "Thomas Girard",
    authorRole: "Lead Developer",
    authorAvatar: "TG",
    date: "2026-05-02",
    readTime: 9,
    featured: false,
  },
  {
    id: "b6",
    slug: "choisir-agence-web",
    title: "Comment choisir une agence de communication et digitale : le guide pratique",
    excerpt:
      "Portfolio, méthode, budget, droits et accompagnement : les questions qui permettent de choisir un partenaire adapté à votre projet.",
    content: `
# Comment choisir une agence de communication et digitale : le guide pratique

Choisir une agence engage du temps, un budget et une partie de l'image de l'entreprise. Une présentation séduisante ne suffit donc pas. Le bon partenaire doit comprendre le problème, proposer une méthode claire et être capable de produire des supports cohérents avec vos objectifs.

Ce guide permet de préparer la consultation et de comparer les propositions sur des critères utiles.

## Clarifier le besoin avant de contacter une agence

Décrivez le contexte, le public, l'objectif et les supports nécessaires. Un besoin formulé comme « refaire notre communication » reste trop large. Souhaitez-vous être mieux identifié, lancer un produit, générer des demandes, professionnaliser vos documents ou créer un site ?

Indiquez également les contraintes : date de lancement, validations internes, contenus disponibles et enveloppe budgétaire. Une agence sérieuse pourra alors proposer un périmètre réaliste.

## Lire un portfolio avec attention

Ne cherchez pas uniquement un projet identique au vôtre. Observez la capacité de l'agence à changer de registre, à respecter une marque et à maintenir une qualité constante. Les études de cas qui expliquent le problème, la démarche et le résultat sont plus révélatrices qu'une simple galerie.

Vérifiez aussi la qualité des détails : lisibilité, cohérence, adaptation mobile, préparation à l'impression et soin apporté aux contenus.

## Évaluer la qualité des questions posées

Une bonne agence ne commence pas par imposer une solution. Elle cherche à comprendre l'activité, les clients, les concurrents et les contraintes. Les questions posées pendant le premier échange révèlent souvent la profondeur de l'accompagnement futur.

Méfiez-vous des promesses immédiates faites avant toute analyse ou des offres identiques pour chaque entreprise.

## Demander une méthode de travail claire

Le devis doit expliquer les étapes : cadrage, recherche, concepts, validations, production, tests et livraison. Il doit également préciser le nombre de propositions, les cycles de correction et les responsabilités de chacun.

Un calendrier utile contient des jalons et tient compte du temps nécessaire à vos retours. Les retards proviennent souvent de validations non anticipées plutôt que de la seule production.

## Comparer le périmètre, pas seulement le prix

Deux montants différents peuvent couvrir des réalités très différentes. L'un inclut la stratégie, la rédaction, la photographie et l'accompagnement ; l'autre concerne uniquement l'exécution graphique. Comparez les livrables, le niveau de recherche, le nombre de formats et le suivi après livraison.

Le choix le moins cher devient coûteux s'il faut recommencer le travail ou acheter séparément des éléments indispensables.

## Clarifier les droits et les fichiers livrés

Demandez qui possède les créations, quelles licences sont utilisées et quels fichiers seront remis. Pour une identité visuelle, vous devez recevoir les formats adaptés au web et à l'impression, ainsi qu'un document expliquant leur usage.

Pour un site, clarifiez l'accès au nom de domaine, à l'hébergement, aux comptes d'analyse et à l'administration. L'entreprise doit pouvoir conserver le contrôle de ses actifs.

## Prévoir l'après-livraison

Une marque et un site évoluent. Demandez si l'agence propose la maintenance, la création de nouveaux supports, la formation ou un accompagnement ponctuel. Il est également utile de connaître les délais habituels de réponse après le lancement.

## Choisir une relation de confiance

La compétence technique compte, mais la qualité de la communication quotidienne est tout aussi importante. Les décisions doivent être expliquées, les difficultés signalées et les retours accueillis sans perdre l'objectif du projet.

Le bon partenaire n'est pas celui qui dit oui à tout. C'est celui qui protège la cohérence du projet, explique ses recommandations et construit avec vous une solution que votre équipe pourra réellement utiliser.
    `,
    image: "/blog/choisir-agence.jpg",
    category: "Conseils",
    categorySlug: "conseils",
    tags: ["Conseils", "Agence", "Digital", "Projet Web"],
    author: "Laura Simon",
    authorRole: "SEO Strategist",
    authorAvatar: "LS",
    date: "2026-05-27",
    readTime: 10,
    featured: false,
  },
];

export const blogCategories = [
  "Tous",
  "Branding",
  "Digital",
  "SEO",
  "UX/UI",
  "E-commerce",
  "Conseils",
];

/* ============================================================
   ÉQUIPE
   ============================================================ */

export const teamMembers: TeamMember[] = [
  {
    id: "tm1",
    name: "CATRAYE Aaron",
    role: "Responsable administratif et financier",
    bio: "Supervise la gestion administrative, financière et le suivi des opérations de NOVAVOX.",
    avatar: "CA",
    skills: ["Administration", "Finance", "Pilotage", "Suivi opérationnel"],
    socials: {},
  },
  {
    id: "tm2",
    name: "BESSANVI Précieux",
    role: "Directeur d'agence",
    bio: "Coordonne la vision, les activités et le développement de l'agence NOVAVOX.",
    avatar: "BP",
    skills: ["Direction", "Stratégie", "Développement", "Coordination"],
    socials: {},
  },
  {
    id: "tm3",
    name: "KPEHOUNDJE Conania",
    role: "Responsable administratif et financier adjoint",
    bio: "Assiste le responsable administratif et financier dans le suivi opérationnel et budgétaire.",
    avatar: "KC",
    skills: ["Administration", "Budget", "Reporting", "Appui opérationnel"],
    socials: {},
  },
];
/* ============================================================
   STATISTIQUES CLÉS
   ============================================================ */

export const stats: Stat[] = [
  { value: 20, suffix: "+", label: "Projets livrés", icon: "🚀" },
  { value: 98, suffix: "%", label: "Clients satisfaits", icon: "⭐" },
  { value: 3, suffix: " ans", label: "D'expertise", icon: "🏆" },
  { value: 5, suffix: "", label: "Partenaires actifs", icon: "🤝" },
];

/* ============================================================
   PROCESSUS / TIMELINE
   ============================================================ */

export const processSteps: TimelineStep[] = [
  {
    step: 1,
    icon: "💬",
    title: "Brief & Découverte",
    description:
      "Un premier échange approfondi pour comprendre vos objectifs, votre cible et votre vision. On pose les bases d'un projet réussi.",
    duration: "Jour 1",
  },
  {
    step: 2,
    icon: "📋",
    title: "Devis & Planification",
    description:
      "Un devis détaillé et transparent, accompagné d'un planning précis. Pas de surprise — seulement des engagements tenus.",
    duration: "2–3 jours",
  },
  {
    step: 3,
    icon: "🎨",
    title: "Design & Création",
    description:
      "Maquettes, prototypes et développement. Vous validez chaque étape et gardez la main sur le résultat final.",
    duration: "Selon projet",
  },
  {
    step: 4,
    icon: "🔄",
    title: "Révisions & Tests",
    description:
      "2 à 3 cycles de révisions inclus, tests multi-navigateurs et validation des performances avant mise en ligne.",
    duration: "1–2 semaines",
  },
  {
    step: 5,
    icon: "🚀",
    title: "Livraison & Suivi",
    description:
      "Mise en ligne soignée, formation si besoin et suivi post-lancement. On reste disponibles pour vous accompagner.",
    duration: "Continu",
  },
];

/* ============================================================
   FONCTIONS UTILITAIRES
   ============================================================ */

export function getProjectsByCategory(category: string): Project[] {
  if (category === "Tous") return projects;
  return projects.filter((p) => p.category === category);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return blogPosts.filter((p) => p.featured);
}

export function searchBlogPosts(query: string): BlogPost[] {
  const q = query.toLowerCase();
  return blogPosts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q)
  );
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  if (category === "Tous") return blogPosts;
  return blogPosts.filter((p) => p.category === category);
}

export function getRelatedProjects(current: Project, count = 3): Project[] {
  return projects
    .filter((p) => p.id !== current.id && p.category === current.category)
    .slice(0, count);
}

export function getRelatedBlogPosts(current: BlogPost, count = 3): BlogPost[] {
  return blogPosts
    .filter(
      (p) =>
        p.id !== current.id &&
        (p.category === current.category ||
          p.tags.some((t) => current.tags.includes(t)))
    )
    .slice(0, count);
}
