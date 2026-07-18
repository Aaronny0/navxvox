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
    title: "Les 7 Tendances Web Design qui Dominent 2025",
    excerpt:
      "Glassmorphism, IA générative, animations micro-détail… découvrez les tendances design qui redéfinissent l'expérience web cette année.",
    content: `
# Les 7 Tendances Web Design qui Dominent 2025

Le monde du web design évolue à une vitesse fulgurante. En 2025, plusieurs tendances s'imposent comme des incontournables pour les agences et les marques qui souhaitent rester pertinentes.

## 1. Le Glassmorphism évolué

Le glassmorphism — cet effet de verre givré — a muri. En 2025, il s'associe à des arrière-plans gradient dynamiques pour créer des interfaces d'une profondeur visuelle saisissante.

## 2. Les animations pilotées par le scroll

Le scroll-triggered animation est devenu un standard d'excellence. Les utilisateurs s'attendent désormais à des récits visuels qui se déroulent au fur et à mesure de leur lecture.

## 3. La typographie expressive

Les grandes typographies en gras, les polices variables et les titres animés prennent une place centrale dans la composition des pages.

## 4. L'IA générative dans le design

Les outils d'IA accélèrent la création d'assets visuels, de palettes de couleurs et même de variations de layouts — libérant les designers pour se concentrer sur la stratégie.

## 5. Le mode sombre premium

Le dark mode n'est plus une option — c'est une identité. Les marques premium adoptent des palettes sombres sophistiquées avec des accents lumineux soigneusement choisis.

## 6. Les micro-interactions enrichies

Chaque clic, hover et transition doit raconter quelque chose. Les micro-animations deviennent un langage à part entière pour communiquer la qualité et le soin.

## 7. Les interfaces 3D légères

WebGL et Three.js permettent d'intégrer des éléments 3D interactifs sans compromettre les performances — une nouvelle frontière pour les sites premium.
    `,
    image: "/blog/tendances-design.jpg",
    category: "Design",
    categorySlug: "design",
    tags: ["Design", "Tendances", "UX/UI", "Animation"],
    author: "Marie Leblanc",
    authorRole: "Lead Designer",
    authorAvatar: "ML",
    date: "2025-03-15",
    readTime: 6,
    featured: true,
  },
  {
    id: "b2",
    slug: "nextjs-performance-2025",
    title: "Next.js 15 : Comment Atteindre un Score Lighthouse Parfait",
    excerpt:
      "Stratégies avancées d'optimisation Next.js — Server Components, Image Optimization, et les nouvelles APIs de caching pour des sites ultra-rapides.",
    content: `
# Next.js 15 : Comment Atteindre un Score Lighthouse Parfait

La performance web n'est plus un luxe — c'est un impératif SEO et commercial. Voici nos meilleures pratiques pour maximiser vos Core Web Vitals.

## Server Components first

Adoptez une architecture Server Components par défaut et ne descendez vers les Client Components que lorsque l'interactivité l'exige réellement.

## Optimisation des images

Utilisez systématiquement next/image avec les attributs width, height, et priority pour les images above-the-fold.

## Stratégie de caching intelligente

Les nouvelles APIs de caching de Next.js 15 permettent un contrôle granulaire — tirez-en parti pour servir du contenu quasi-instantanément.
    `,
    image: "/blog/nextjs-performance.jpg",
    category: "Développement",
    categorySlug: "developpement",
    tags: ["Next.js", "Performance", "SEO", "Web Vitals"],
    author: "Thomas Girard",
    authorRole: "Lead Developer",
    authorAvatar: "TG",
    date: "2025-04-02",
    readTime: 8,
    featured: true,
  },
  {
    id: "b3",
    slug: "seo-local-strategies",
    title: "SEO Local : 5 Stratégies pour Dominer les Recherches de Proximité",
    excerpt:
      "Google My Business, données structurées, mentions locales — maîtrisez le référencement local pour attirer des clients dans votre zone géographique.",
    content: `
# SEO Local : 5 Stratégies pour Dominer les Recherches de Proximité

Le SEO local est l'un des leviers les plus efficaces pour les entreprises ayant une présence physique. Voici comment maximiser votre visibilité locale.
    `,
    image: "/blog/seo-local.jpg",
    category: "SEO",
    categorySlug: "seo",
    tags: ["SEO", "Local", "Google", "Marketing"],
    author: "Laura Simon",
    authorRole: "SEO Strategist",
    authorAvatar: "LS",
    date: "2025-04-18",
    readTime: 5,
    featured: false,
  },
  {
    id: "b4",
    slug: "ux-conversion-rate-optimization",
    title: "UX & CRO : Comment Doubler Votre Taux de Conversion",
    excerpt:
      "Tests A/B, heatmaps, parcours utilisateur optimisés — les méthodes UX qui transforment vos visiteurs en clients fidèles.",
    content: `
# UX & CRO : Comment Doubler Votre Taux de Conversion

L'optimisation du taux de conversion (CRO) est l'art de transformer davantage de visiteurs en clients sans augmenter votre budget publicitaire.
    `,
    image: "/blog/ux-cro.jpg",
    category: "UX/UI",
    categorySlug: "ux-ui",
    tags: ["UX", "CRO", "Conversion", "Analytics"],
    author: "Marie Leblanc",
    authorRole: "Lead Designer",
    authorAvatar: "ML",
    date: "2025-05-03",
    readTime: 7,
    featured: false,
  },
  {
    id: "b5",
    slug: "ecommerce-tunnel-vente",
    title: "E-commerce : Optimiser Son Tunnel de Vente en 2025",
    excerpt:
      "Réduire l'abandon panier, simplifier le checkout, personnaliser l'expérience — un guide pratique pour booster vos ventes en ligne.",
    content: `
# E-commerce : Optimiser Son Tunnel de Vente en 2025

L'abandon de panier représente en moyenne 70% des ventes potentielles. Voici comment récupérer ces prospects perdus.
    `,
    image: "/blog/ecommerce-tunnel.jpg",
    category: "E-commerce",
    categorySlug: "e-commerce",
    tags: ["E-commerce", "Conversion", "UX", "Ventes"],
    author: "Thomas Girard",
    authorRole: "Lead Developer",
    authorAvatar: "TG",
    date: "2025-05-20",
    readTime: 6,
    featured: false,
  },
  {
    id: "b6",
    slug: "choisir-agence-web",
    title: "Comment Choisir Son Agence Web en 2025 : Le Guide Complet",
    excerpt:
      "Portfolio, processus, tarifs, références — les critères essentiels pour sélectionner le bon partenaire digital pour votre projet.",
    content: `
# Comment Choisir Son Agence Web en 2025 : Le Guide Complet

Le marché des agences web est saturé. Comment identifier le partenaire qui saura véritablement faire progresser votre business ?
    `,
    image: "/blog/choisir-agence.jpg",
    category: "Conseils",
    categorySlug: "conseils",
    tags: ["Conseils", "Agence", "Digital", "Projet Web"],
    author: "Laura Simon",
    authorRole: "SEO Strategist",
    authorAvatar: "LS",
    date: "2025-06-08",
    readTime: 9,
    featured: false,
  },
];

export const blogCategories = [
  "Tous",
  "Design",
  "Développement",
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
