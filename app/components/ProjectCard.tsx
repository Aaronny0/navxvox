import Link from "next/link";
import type { Project } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <div
        className="nv-card"
        style={{
          padding: 0,
          overflow: "hidden",
          cursor: "pointer",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Image placeholder */}
        <div
          style={{
            height: "220px",
            background: `linear-gradient(135deg, ${
              project.category === "E-commerce"
                ? "rgba(0,200,224,0.2)"
                : project.category === "Application Web"
                ? "rgba(21,101,192,0.22)"
                : "rgba(26,111,212,0.22)"
            } 0%, rgba(10,14,26,0.82) 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <span
            style={{
              fontSize: "3rem",
              opacity: 0.4,
              fontFamily: "Outfit, sans-serif",
              fontWeight: 800,
              color: "var(--nv-text-primary)",
            }}
          >
            {project.title.charAt(0)}
          </span>
          {/* Category badge */}
          <div
            style={{
              position: "absolute",
              top: "1rem",
              left: "1rem",
            }}
          >
            <span className="nv-badge">{project.category}</span>
          </div>
          {/* Year */}
          <span
            style={{
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
              fontSize: "0.75rem",
              color: "var(--nv-text-muted)",
              fontFamily: "Outfit, sans-serif",
            }}
          >
            {project.year}
          </span>
        </div>
        {/* Content */}
        <div
          style={{
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <h3
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "var(--nv-text-primary)",
              marginBottom: "0.25rem",
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--nv-accent-violet)",
              fontWeight: 500,
              marginBottom: "0.5rem",
            }}
          >
            {project.client}
          </p>
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--nv-text-secondary)",
              lineHeight: 1.7,
              margin: 0,
              flex: 1,
            }}
          >
            {project.description}
          </p>
          {/* Technologies */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.375rem",
              marginTop: "1rem",
            }}
          >
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                style={{
                  padding: "0.2rem 0.5rem",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--nv-border-light)",
                  borderRadius: "4px",
                  fontSize: "0.7rem",
                  color: "var(--nv-text-muted)",
                  fontFamily: "monospace",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
