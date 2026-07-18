"use client";

import { useState } from "react";

interface PortfolioFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}

export default function PortfolioFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: PortfolioFilterProps) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
        justifyContent: "center",
        marginBottom: "2.5rem",
      }}
    >
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          style={{
            padding: "0.5rem 1.25rem",
            borderRadius: "100px",
            border:
              activeCategory === cat
                ? "1px solid var(--nv-accent-violet)"
                : "1px solid var(--nv-border-light)",
            background:
              activeCategory === cat
                ? "rgba(26,111,212,0.16)"
                : "rgba(255,255,255,0.03)",
            color:
              activeCategory === cat
                ? "var(--nv-accent-violet)"
                : "var(--nv-text-secondary)",
            fontFamily: "Outfit, sans-serif",
            fontWeight: 500,
            fontSize: "0.85rem",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
