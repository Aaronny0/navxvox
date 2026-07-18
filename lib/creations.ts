export interface GraphicCreation {
  id: string;
  title: string;
  client: string;
  category: string;
  image: string;
  alt: string;
  width: number;
  height: number;
}

export const graphicCreations: GraphicCreation[] = [
  {
    id: "gc1",
    title: "Tontine de pagne",
    client: "Nisso Shop Lance",
    category: "Affiche promotionnelle",
    image: "/realisations/01-nisso-shop-tontine-pagne.jpeg",
    alt: "Affiche promotionnelle Tontine de pagne pour Nisso Shop Lance",
    width: 1097,
    height: 1280,
  },
  {
    id: "gc2",
    title: "Karaoké Night",
    client: "Fruitz",
    category: "Communication événementielle",
    image: "/realisations/02-karaoke-night-fruitiz.jpeg",
    alt: "Affiche Karaoké Night conçue pour Fruitz",
    width: 992,
    height: 1240,
  },
  {
    id: "gc3",
    title: "Packaging Z-Afro Yaourt",
    client: "Z-Afro Yaourt",
    category: "Packaging",
    image: "/realisations/03-z-afro-yaourt-packaging.jpeg",
    alt: "Présentation du packaging de pot Z-Afro Yaourt",
    width: 1280,
    height: 960,
  },
  {
    id: "gc4",
    title: "Ose & viens montrer ton talent",
    client: "DODJI FC",
    category: "Affiche sportive",
    image: "/realisations/04-dodji-fc-talent.jpeg",
    alt: "Affiche de recrutement sportif Ose et viens montrer ton talent pour DODJI FC",
    width: 1075,
    height: 750,
  },
  {
    id: "gc5",
    title: "Packaging Marco Farine",
    client: "Marco Farine",
    category: "Packaging",
    image: "/realisations/05-marco-farine-packaging.jpeg",
    alt: "Mise en situation du packaging Marco Farine",
    width: 1024,
    height: 1280,
  },
  {
    id: "gc6",
    title: "Gamme Z-Afro Yaourt",
    client: "Z-Afro Yaourt",
    category: "Affiche produit",
    image: "/realisations/06-z-afro-yaourt-gamme.jpeg",
    alt: "Affiche présentant la gamme de produits Z-Afro Yaourt",
    width: 1012,
    height: 1280,
  },
  {
    id: "gc7",
    title: "La vraie farine",
    client: "Marco Farine",
    category: "Affiche publicitaire",
    image: "/realisations/07-marco-farine-affiche.jpeg",
    alt: "Affiche publicitaire Goûtez la vraie farine pour Marco Farine",
    width: 1027,
    height: 1280,
  },
  {
    id: "gc8",
    title: "Campagne La Béninoise",
    client: "La Béninoise",
    category: "Affichage urbain",
    image: "/realisations/08-beninoise-affichage.jpeg",
    alt: "Mise en situation d'une campagne d'affichage urbain pour La Béninoise",
    width: 571,
    height: 1280,
  },
  {
    id: "gc9",
    title: "Yaji Frost — Banane",
    client: "Yaji & Co",
    category: "Étiquette produit",
    image: "/realisations/10-yaji-co-banane.jpeg",
    alt: "Étiquette panoramique Yaji Frost à la banane pour Yaji et Co",
    width: 1181,
    height: 414,
  },
  {
    id: "gc10",
    title: "Yaji Frost — Mangue",
    client: "Yaji & Co",
    category: "Étiquette produit",
    image: "/realisations/11-yaji-co-mangue.jpeg",
    alt: "Étiquette panoramique Yaji Frost à la mangue pour Yaji et Co",
    width: 1181,
    height: 414,
  },
  {
    id: "gc11",
    title: "Grande séance de prière",
    client: "Camp de prière Jésus est la solution",
    category: "Communication événementielle",
    image: "/realisations/12-camp-priere.jpeg",
    alt: "Affiche d'une grande séance de prière",
    width: 792,
    height: 1080,
  },
  {
    id: "gc12",
    title: "Music Festival",
    client: "Benin Gospel All Star",
    category: "Communication événementielle",
    image: "/realisations/13-music-festival.jpeg",
    alt: "Affiche Music Festival and Creative Art Industry",
    width: 720,
    height: 753,
  },
];

export const featuredGraphicCreations = graphicCreations.slice(0, 4);
