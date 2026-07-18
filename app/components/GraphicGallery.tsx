import Image from "next/image";
import type { GraphicCreation } from "@/lib/creations";
import styles from "./GraphicGallery.module.css";

interface GraphicGalleryProps {
  creations: GraphicCreation[];
}

function CreationCard({ creation }: { creation: GraphicCreation }) {
  return (
    <figure className={styles.item}>
      <a
        className={styles.link}
        href={creation.image}
        target="_blank"
        rel="noreferrer"
        aria-label={`Voir ${creation.title} en grand`}
      >
        <div className={styles.imageWrap}>
          <Image
            className={styles.image}
            src={creation.image}
            alt={creation.alt}
            width={creation.width}
            height={creation.height}
            sizes="(max-width: 760px) calc(100vw - 2rem), (max-width: 1180px) 45vw, 380px"
          />
        </div>
        <figcaption className={styles.caption}>
          <span className={styles.category}>{creation.category}</span>
          <h3 className={styles.title}>{creation.title}</h3>
          <p className={styles.client}>{creation.client}</p>
        </figcaption>
      </a>
    </figure>
  );
}

export default function GraphicGallery({ creations }: GraphicGalleryProps) {
  const panoramas = creations.filter((creation) => creation.width / creation.height > 2);
  const standard = creations.filter((creation) => creation.width / creation.height <= 2);

  return (
    <>
      <div className={styles.gallery}>
        {standard.map((creation) => (
          <CreationCard key={creation.id} creation={creation} />
        ))}
      </div>
      {panoramas.length > 0 && (
        <div className={styles.panoramaGrid}>
          {panoramas.map((creation) => (
            <CreationCard key={creation.id} creation={creation} />
          ))}
        </div>
      )}
    </>
  );
}
