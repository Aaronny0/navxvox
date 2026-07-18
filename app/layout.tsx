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
    default: "NOVAVOX — L'impact commence ici.",
    template: "%s | NOVAVOX",
  },
  description:
    "NOVAVOX — L'impact commence ici. Nous accompagnons les entreprises et les particuliers avec des solutions de communication créatives et digitales sur mesure.",
  keywords: [
    "agence de communication",
    "branding",
    "identité visuelle",
    "création graphique",
    "sécurité informatique",
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
    title: "NOVAVOX — L'impact commence ici.",
    description:
      "Des solutions de communication créatives et digitales pour valoriser votre image et renforcer votre impact.",
    images: [
      {
        url: "/brand/novavox-logo.jpeg",
        width: 1254,
        height: 1254,
        alt: "NOVAVOX — L'impact commence ici.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NOVAVOX — L'impact commence ici.",
    description: "Communication créative et solutions digitales sur mesure.",
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
