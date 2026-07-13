"use client";

interface BlogSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BlogSearch({ value, onChange }: BlogSearchProps) {
  return (
    <div style={{ position: "relative", maxWidth: "400px", width: "100%" }}>
      <span
        style={{
          position: "absolute",
          left: "1rem",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "1rem",
          color: "var(--nv-text-muted)",
          pointerEvents: "none",
        }}
      >
        🔍
      </span>
      <input
        type="search"
        placeholder="Rechercher un article…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="nv-input"
        style={{ paddingLeft: "2.75rem" }}
        id="blog-search"
      />
    </div>
  );
}
