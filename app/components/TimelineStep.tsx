import type { TimelineStep as TimelineStepType } from "@/lib/data";

interface TimelineStepProps {
  step: TimelineStepType;
  isLast: boolean;
}

export default function TimelineStep({ step, isLast }: TimelineStepProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "1.5rem",
        position: "relative",
      }}
    >
      {/* Line + Circle */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: "var(--nv-grad-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.25rem",
            boxShadow: "var(--nv-shadow-md)",
            position: "relative",
            zIndex: 2,
          }}
        >
          {step.icon}
        </div>
        {!isLast && (
          <div
            style={{
              width: "2px",
              flex: 1,
              minHeight: "40px",
              background: "linear-gradient(to bottom, var(--nv-accent-violet), transparent)",
              marginTop: "0.5rem",
            }}
          />
        )}
      </div>
      {/* Content */}
      <div style={{ paddingBottom: isLast ? 0 : "2.5rem", paddingTop: "0.25rem" }}>
        <span
          style={{
            fontSize: "0.7rem",
            fontWeight: 600,
            fontFamily: "Outfit, sans-serif",
            color: "var(--nv-accent-violet)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Étape {step.step} — {step.duration}
        </span>
        <h4
          style={{
            fontFamily: "Outfit, sans-serif",
            fontWeight: 700,
            fontSize: "1.15rem",
            color: "var(--nv-text-primary)",
            marginTop: "0.375rem",
            marginBottom: "0.5rem",
          }}
        >
          {step.title}
        </h4>
        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--nv-text-secondary)",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {step.description}
        </p>
      </div>
    </div>
  );
}
