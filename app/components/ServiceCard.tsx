import type { Service } from "@/lib/data";

interface ServiceCardProps {
  service: Service;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <div
      className="nv-card"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: `linear-gradient(90deg, ${service.color}, transparent)`,
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <span
          style={{
            fontSize: "2rem",
            display: "block",
            marginBottom: "0.5rem",
          }}
        >
          {service.icon}
        </span>
        <h3
          style={{
            fontFamily: "Outfit, sans-serif",
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "var(--nv-text-primary)",
            marginBottom: "0.5rem",
          }}
        >
          {service.title}
        </h3>
        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--nv-text-secondary)",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {service.description}
        </p>
        {service.price && (
          <div
            style={{
              marginTop: "1rem",
              paddingTop: "1rem",
              borderTop: "1px solid var(--nv-border-light)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "0.8rem",
            }}
          >
            <span style={{ color: "var(--nv-text-muted)" }}>{service.delay}</span>
            <span style={{ color: service.color, fontWeight: 600, fontFamily: "Outfit, sans-serif" }}>
              {service.price}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
