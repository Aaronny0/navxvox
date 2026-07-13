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
  year: number;
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
    slug: "creation-site-web",
    icon: "🌐",
    title: "Création de Site Web",
    description:
      "Sites vitrines, landing pages et portails web sur mesure, alliant esthétique premium et performances techniques optimales.",
    longDescription:
      "De la maquette à la mise en ligne, nous concevons des sites web qui captivent vos visiteurs et convertissent. Chaque projet est unique, responsive, rapide et optimisé pour le référencement.",
    features: [
      "Design UI/UX personnalisé",
      "Responsive mobile-first",
      "Optimisation Core Web Vitals",
      "CMS intégré (si souhaité)",
      "Formulaires et interactions",
      "Hébergement et déploiement",
    ],
    delay: "2–4 semaines",
    price: "À partir de 1 500 €",
    color: "#8b5cf6",
  },
  {
    id: "s2",
    slug: "developpement-application-web",
    icon: "⚡",
    title: "Application Web",
    description:
      "Applications web complexes, SaaS et plateformes métier avec des architectures modernes et évolutives.",
    longDescription:
      "Nous développons des applications web robustes et scalables adaptées à vos processus métier. Tableaux de bord, espaces membres, outils collaboratifs — nous maîtrisons les stacks les plus modernes.",
    features: [
      "Architecture scalable",
      "Authentification & rôles",
      "API REST / GraphQL",
      "Tableau de bord admin",
      "Tests automatisés",
      "CI/CD & DevOps",
    ],
    delay: "4–12 semaines",
    price: "À partir de 5 000 €",
    color: "#6366f1",
  },
  {
    id: "s3",
    slug: "design-ux-ui",
    icon: "🎨",
    title: "Design UX/UI",
    description:
      "Interfaces élégantes centrées utilisateur : wireframes, prototypes Figma et design systems cohérents.",
    longDescription:
      "Notre approche UX part de vos utilisateurs pour créer des interfaces intuitives et esthétiques. Nous livrons des maquettes haute-fidélité et des design systems documentés.",
    features: [
      "Audit UX existant",
      "Wireframes & prototypage",
      "Maquettes haute-fidélité",
      "Design system Figma",
      "Tests utilisateurs",
      "Livraison assets",
    ],
    delay: "1–3 semaines",
    price: "À partir de 800 €",
    color: "#22d3ee",
  },
  {
    id: "s4",
    slug: "e-commerce",
    icon: "🛒",
    title: "E-commerce",
    description:
      "Boutiques en ligne performantes et personnalisées qui maximisent vos ventes et offrent une expérience d'achat fluide.",
    longDescription:
      "Que vous lanciez votre première boutique ou migriez vers une solution sur mesure, nous créons des e-commerces optimisés : tunnel de vente optimisé, paiement sécurisé, gestion des stocks.",
    features: [
      "Catalogue produits",
      "Panier & paiement sécurisé",
      "Gestion des commandes",
      "Intégrations logistique",
      "Fiches produits SEO",
      "Analytics & conversions",
    ],
    delay: "3–8 semaines",
    price: "À partir de 2 500 €",
    color: "#ec4899",
  },
  {
    id: "s5",
    slug: "seo-optimisation",
    icon: "📈",
    title: "SEO & Visibilité",
    description:
      "Référencement naturel sur mesure pour propulser votre site en première page Google et attirer un trafic qualifié.",
    longDescription:
      "Audit technique, stratégie de contenu, netlinking — nous déployons une méthodologie SEO éprouvée pour améliorer durablement votre positionnement sur les moteurs de recherche.",
    features: [
      "Audit SEO complet",
      "Optimisation on-page",
      "Stratégie de contenu",
      "Netlinking éthique",
      "Suivi rankings",
      "Reporting mensuel",
    ],
    delay: "Dès 3 mois",
    price: "À partir de 400 €/mois",
    color: "#f59e0b",
  },
  {
    id: "s6",
    slug: "maintenance-support",
    icon: "🛡️",
    title: "Maintenance & Support",
    description:
      "Contrats de maintenance proactifs pour garder votre site rapide, sécurisé et toujours disponible.",
    longDescription:
      "Mises à jour de sécurité, sauvegardes automatiques, monitoring 24/7 et support réactif. Nous veillons sur votre présence en ligne afin que vous puissiez vous concentrer sur votre activité.",
    features: [
      "Mises à jour régulières",
      "Sauvegardes quotidiennes",
      "Monitoring uptime 24/7",
      "Support prioritaire",
      "Rapport mensuel",
      "Évolutions mineures incluses",
    ],
    delay: "Contrat mensuel",
    price: "À partir de 150 €/mois",
    color: "#10b981",
  },
];

/* ============================================================
   PROJETS PORTFOLIO
   ============================================================ */

export const projects: Project[] = [
  {
    id: "p1",
    slug: "luxe-maison-paris",
    title: "LuxeMaison Paris",
    client: "LuxeMaison SAS",
    category: "E-commerce",
    categorySlug: "e-commerce",
    description:
      "Boutique en ligne haut de gamme pour une marque de décoration d'intérieur parisienne.",
    longDescription:
      "Refonte complète de l'expérience e-commerce pour LuxeMaison. Nous avons conçu une plateforme de vente en ligne reflétant l'ADN premium de la marque : visuels immersifs, navigation fluide et tunnel d'achat optimisé, résultant en une hausse significative du taux de conversion.",
    image: "/portfolio/luxemaison.jpg",
    technologies: ["Next.js", "Shopify API", "Tailwind CSS", "Stripe", "Vercel"],
    year: 2024,
    featured: true,
    results: [
      "+45% taux de conversion",
      "-30% taux de rebond",
      "+60% panier moyen",
    ],
    link: "https://example.com",
  },
  {
    id: "p2",
    slug: "vitaldoc-plateforme",
    title: "VitalDoc Platform",
    client: "VitalDoc SAS",
    category: "Application Web",
    categorySlug: "application-web",
    description:
      "Plateforme SaaS de gestion documentaire pour cabinets médicaux.",
    longDescription:
      "VitalDoc est une application de gestion de documents médicaux conçue pour simplifier le quotidien des praticiens. Tableau de bord intuitif, partage sécurisé, signature électronique et historique des accès.",
    image: "/portfolio/vitaldoc.jpg",
    technologies: ["React", "Node.js", "PostgreSQL", "AWS S3", "OAuth 2.0"],
    year: 2024,
    featured: true,
    results: [
      "500+ utilisateurs actifs",
      "99.9% uptime",
      "RGPD compliant",
    ],
  },
  {
    id: "p3",
    slug: "gastronomia-restaurant",
    title: "Gastronomia",
    client: "Restaurant Gastronomia",
    category: "Site Vitrine",
    categorySlug: "site-vitrine",
    description:
      "Site vitrine et réservation en ligne pour un restaurant gastronomique étoilé.",
    longDescription:
      "Création d'un site vitrine élégant pour un restaurant gastronomique 2 étoiles Michelin. Intégration d'un système de réservation en ligne, menu interactif et galerie photo immersive.",
    image: "/portfolio/gastronomia.jpg",
    technologies: ["Next.js", "Framer Motion", "Sanity CMS", "Vercel"],
    year: 2025,
    featured: true,
    results: [
      "+80% réservations en ligne",
      "Score Lighthouse 98/100",
      "Présence 1ère page Google",
    ],
  },
  {
    id: "p4",
    slug: "techflow-dashboard",
    title: "TechFlow Dashboard",
    client: "TechFlow Industries",
    category: "Application Web",
    categorySlug: "application-web",
    description:
      "Dashboard analytique temps réel pour monitoring d'infrastructures industrielles.",
    longDescription:
      "Interface de monitoring industriel avec visualisations temps réel, alertes intelligentes et rapports automatisés. Traitement de milliers de points de données par minute.",
    image: "/portfolio/techflow.jpg",
    technologies: ["React", "D3.js", "WebSocket", "Node.js", "InfluxDB"],
    year: 2025,
    featured: false,
    results: [
      "10 000+ métriques/minute",
      "Alertes < 500ms",
      "-40% coûts opérationnels",
    ],
  },
  {
    id: "p5",
    slug: "bloom-skincare",
    title: "Bloom Skincare",
    client: "Bloom Cosmetics",
    category: "E-commerce",
    categorySlug: "e-commerce",
    description:
      "Boutique e-commerce skincare avec quiz personnalisé et abonnement récurrent.",
    longDescription:
      "Plateforme e-commerce avec quiz de diagnostic peau, recommandations personnalisées et abonnement. Intégration d'une expérience d'achat guidée qui améliore la satisfaction client.",
    image: "/portfolio/bloom.jpg",
    technologies: ["Next.js", "Stripe", "Prisma", "PostgreSQL", "Resend"],
    year: 2025,
    featured: false,
    results: [
      "+35% rétention clients",
      "4.8/5 satisfaction",
      "+120% chiffre d'affaires",
    ],
  },
  {
    id: "p6",
    slug: "aqualux-spa",
    title: "AquaLux Spa",
    client: "AquaLux Group",
    category: "Site Vitrine",
    categorySlug: "site-vitrine",
    description:
      "Site vitrine premium pour une chaîne de spas de luxe avec booking intégré.",
    longDescription:
      "Refonte digitale complète pour AquaLux Group. Nouveau site vitrine premium, système de réservation multi-établissements et programme de fidélité en ligne.",
    image: "/portfolio/aqualux.jpg",
    technologies: ["Next.js", "TypeScript", "Supabase", "Stripe"],
    year: 2026,
    featured: false,
    results: [
      "+200% trafic organique",
      "+55% réservations",
      "NPS 72",
    ],
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
    name: "Alexandre Renaud",
    role: "Fondateur & Directeur Créatif",
    bio: "10 ans d'expérience en design et stratégie digitale. Passionné par les interfaces qui allient beauté et performance.",
    avatar: "AR",
    skills: ["Direction créative", "UX Strategy", "Branding", "Next.js"],
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    id: "tm2",
    name: "Marie Leblanc",
    role: "Lead Designer",
    bio: "Spécialiste UX/UI avec une approche centrée sur l'humain. Experte Figma et design systems.",
    avatar: "ML",
    skills: ["Figma", "Design System", "UX Research", "Motion Design"],
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    id: "tm3",
    name: "Thomas Girard",
    role: "Lead Developer",
    bio: "Full-stack engineer spécialisé React/Next.js. Obsédé par les performances et le code propre.",
    avatar: "TG",
    skills: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    socials: { linkedin: "#", github: "#" },
  },
  {
    id: "tm4",
    name: "Laura Simon",
    role: "SEO & Growth Strategist",
    bio: "Experte en référencement naturel et acquisition digitale. Certifiée Google Analytics & Search Console.",
    avatar: "LS",
    skills: ["SEO Technique", "Content Strategy", "Analytics", "SEM"],
    socials: { linkedin: "#", twitter: "#" },
  },
];

/* ============================================================
   STATISTIQUES CLÉS
   ============================================================ */

export const stats: Stat[] = [
  { value: 120, suffix: "+", label: "Projets livrés", icon: "🚀" },
  { value: 98, suffix: "%", label: "Clients satisfaits", icon: "⭐" },
  { value: 5, suffix: " ans", label: "D'expertise", icon: "🏆" },
  { value: 50, suffix: "+", label: "Partenaires actifs", icon: "🤝" },
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
