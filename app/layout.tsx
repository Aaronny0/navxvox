import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import SiteChrome from "./components/SiteChrome";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://novavox.fr"),
  title: {
    default: "NOVAVOX — Agence Web Premium | Sites & Applications Sur Mesure",
    template: "%s | NOVAVOX",
  },
  description:
    "NOVAVOX est une agence web premium spécialisée dans la création de sites vitrine, applications web et e-commerce. Design exceptionnel, performances optimales, résultats mesurables.",
  keywords: [
    "agence web",
    "création site web",
    "développement web",
    "design UX/UI",
    "e-commerce",
    "SEO",
    "Next.js",
    "application web",
  ],
  authors: [{ name: "NOVAVOX" }],
  creator: "NOVAVOX",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://novavox.fr",
    siteName: "NOVAVOX",
    title: "NOVAVOX — Agence Web Premium | Sites & Applications Sur Mesure",
    description:
      "Design exceptionnel, performances optimales, résultats mesurables. Votre ambition mérite la meilleure agence web.",
    images: [
      {
        url: "/brand/novavox-logo.jpeg",
        width: 1254,
        height: 1254,
        alt: "NOVAVOX — Agence Web Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NOVAVOX — Agence Web Premium",
    description: "Sites vitrine, applications web et e-commerce sur mesure.",
    images: ["/brand/novavox-logo.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${outfit.variable}`}
    >
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
