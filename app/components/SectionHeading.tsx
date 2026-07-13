interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      style={{
        textAlign: align,
        marginBottom: "3rem",
        maxWidth: align === "center" ? "640px" : "none",
        margin: align === "center" ? "0 auto 3rem" : "0 0 3rem",
      }}
    >
      {badge && <span className="nv-badge">{badge}</span>}
      <h2
        style={{
          fontFamily: "Outfit, sans-serif",
          marginTop: badge ? "1rem" : 0,
          marginBottom: subtitle ? "1rem" : 0,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            fontSize: "1.05rem",
            color: "var(--nv-text-secondary)",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
