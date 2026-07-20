import Image from "next/image";
import Link from "next/link";
import { blogPosts, getFeaturedProjects, services, stats } from "@/lib/data";
import { graphicCreations } from "@/lib/creations";
import ScrollReveal from "./components/ScrollReveal";
import styles from "./home.module.css";

const selectedWork = [
  graphicCreations[0],
  graphicCreations[6],
  graphicCreations[5],
  graphicCreations[11],
];

export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`nv-container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>Agence créative & digitale</span>
            <h1>
              Une image forte.<br />
              <span>Une marque mémorable.</span>
            </h1>
            <p>
              NOVAVOX transforme vos idées en identités, campagnes et expériences
              digitales claires, belles et utiles.
            </p>
            <div className={styles.heroActions}>
              <Link href="/contact" className={styles.primaryButton}>
                Démarrer un projet <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/portfolio" className={styles.secondaryButton}>
                Voir les réalisations
              </Link>
            </div>
            <div className={styles.heroProof}>
              {stats.slice(0, 3).map((stat) => (
                <div key={stat.label}>
                  <strong>{stat.value}{stat.suffix}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.heroVisual} aria-label="Sélection de réalisations NOVAVOX">
            <span className={styles.heroOrbit} aria-hidden="true" />
            <Link href="/portfolio" className={`${styles.heroTile} ${styles.heroTileMain}`}>
              <Image
                src="/realisations/07-marco-farine-affiche.jpeg"
                alt="Affiche publicitaire Marco Farine réalisée par NOVAVOX"
                fill
                preload
                sizes="(max-width: 820px) 58vw, 31vw"
                className={styles.coverImage}
              />
            </Link>
            <Link href="/portfolio" className={`${styles.heroTile} ${styles.heroTileLeft}`}>
              <Image
                src="/realisations/01-nisso-shop-tontine-pagne.jpeg"
                alt="Affiche promotionnelle Nisso Shop réalisée par NOVAVOX"
                fill
                loading="eager"
                sizes="(max-width: 820px) 34vw, 17vw"
                className={styles.coverImage}
              />
            </Link>
            <Link href="/portfolio" className={`${styles.heroTile} ${styles.heroTileRight}`}>
              <Image
                src="/realisations/03-z-afro-yaourt-packaging.jpeg"
                alt="Packaging Z-Afro Yaourt réalisé par NOVAVOX"
                fill
                loading="eager"
                sizes="(max-width: 820px) 38vw, 18vw"
                className={styles.coverImage}
              />
            </Link>
            <span className={styles.heroBadge}><strong>100%</strong> création<br />sur mesure</span>
            <span className={styles.heroSparkle} aria-hidden="true">✦</span>
          </div>
        </div>
      </section>

      <section className={styles.workSection}>
        <div className="nv-container">
          <ScrollReveal>
            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.kickerDark}>Travaux sélectionnés</span>
                <h2>Des créations faites<br />pour être regardées.</h2>
              </div>
              <Link href="/portfolio" className={styles.darkTextLink}>
                Tout le portfolio <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </ScrollReveal>

          <div className={styles.workGrid}>
            {selectedWork.map((creation, index) => (
              <ScrollReveal key={creation.id} delay={index * 70}>
                <a
                  href={creation.image}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.workCard}
                  aria-label={`Voir ${creation.title} en grand`}
                >
                  <div className={styles.workImageWrap}>
                    <Image
                      src={creation.image}
                      alt={creation.alt}
                      fill
                      sizes="(max-width: 650px) 100vw, (max-width: 1050px) 50vw, 25vw"
                      className={styles.coverImage}
                    />
                  </div>
                  <div className={styles.workMeta}>
                    <span>
                      <small>{creation.category}</small>
                      <strong>{creation.title}</strong>
                    </span>
                    <i aria-hidden="true">↗</i>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.expertiseSection}>
        <div className={`nv-container ${styles.expertiseGrid}`}>
          <ScrollReveal direction="left">
            <div className={styles.expertiseImageWrap}>
              <Image
                src="/realisations/08-beninoise-affichage.jpeg"
                alt="Campagne d'affichage urbain pour La Béninoise"
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                className={styles.coverImage}
              />
              <span>Votre marque, dans le monde réel.</span>
            </div>
          </ScrollReveal>

          <div className={styles.expertiseContent}>
            <ScrollReveal>
              <span className={styles.kicker}>Notre expertise</span>
              <h2>Un studio.<br />Plusieurs savoir-faire.</h2>
              <p>
                Une équipe unique pour construire une expression de marque
                cohérente, du premier concept jusqu’à sa mise en ligne.
              </p>
            </ScrollReveal>
            <div className={styles.serviceList}>
              {services.slice(0, 4).map((service, index) => (
                <ScrollReveal key={service.id} delay={index * 60}>
                  <Link href="/services" className={styles.serviceRow}>
                    <span>0{index + 1}</span>
                    <strong>{service.title}</strong>
                    <i aria-hidden="true">↗</i>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.digitalSection}>
        <div className="nv-container">
          <ScrollReveal>
            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.kickerDark}>Produits digitaux</span>
                <h2>Des expériences belles,<br />rapides et intuitives.</h2>
              </div>
            </div>
          </ScrollReveal>

          <div className={styles.projectGrid}>
            {featuredProjects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 70}>
                <Link href={`/portfolio/${project.slug}`} className={styles.projectCard}>
                  <div className={styles.projectImageWrap}>
                    <Image
                      src={project.image}
                      alt={`Aperçu du projet ${project.title}`}
                      fill
                      sizes="(max-width: 760px) 100vw, 33vw"
                      className={styles.projectImage}
                    />
                  </div>
                  <div className={styles.projectMeta}>
                    <span>
                      <small>{project.category}</small>
                      <strong>{project.title}</strong>
                    </span>
                    <i aria-hidden="true">↗</i>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.journalSection}>
        <div className="nv-container">
          <ScrollReveal>
            <div className={styles.journalHeading}>
              <div>
                <span className={styles.kicker}>Le journal NOVAVOX</span>
                <h2>Idées, design<br />et culture digitale.</h2>
              </div>
              <Link href="/blog" className={styles.lightTextLink}>
                Lire tous les articles <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </ScrollReveal>

          <div className={styles.journalGrid}>
            {blogPosts.slice(0, 3).map((post, index) => (
              <ScrollReveal key={post.id} delay={index * 70}>
                <Link href={`/blog/${post.slug}`} className={styles.journalCard}>
                  <div className={styles.journalImageWrap}>
                    <Image
                      src={post.image}
                      alt={`Illustration de l'article : ${post.title}`}
                      fill
                      sizes="(max-width: 760px) 100vw, 33vw"
                      className={styles.coverImage}
                    />
                  </div>
                  <div className={styles.journalMeta}>
                    <span>{post.category}</span>
                    <small>{post.readTime} min</small>
                  </div>
                  <h3>{post.title}</h3>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.ctaVisual} aria-hidden="true">
          <Image
            src="/blog/choisir-agence.jpg"
            alt=""
            fill
            sizes="50vw"
            className={styles.coverImage}
          />
        </div>
        <div className={`nv-container ${styles.ctaInner}`}>
          <span className={styles.kickerDark}>Parlons de votre projet</span>
          <h2>Prêt à donner une<br />nouvelle dimension<br />à votre marque ?</h2>
          <Link href="/contact" className={styles.ctaButton}>
            Échanger avec NOVAVOX <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
