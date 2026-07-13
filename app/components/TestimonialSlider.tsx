"use client";

import { useState, useEffect, useCallback } from "react";
import type { Testimonial } from "@/lib/data";

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

export default function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  const t = testimonials[current];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{ position: "relative", maxWidth: "700px", margin: "0 auto" }}
    >
      {/* Quote */}
      <div
        key={t.id}
        style={{
          textAlign: "center",
          animation: "fadeIn 0.5s ease",
        }}
      >
        {/* Stars */}
        <div style={{ marginBottom: "1.5rem", fontSize: "1.25rem", letterSpacing: "0.2em" }}>
          {"★".repeat(t.rating)}
        </div>
        <blockquote
          style={{
            fontSize: "clamp(1rem, 2vw, 1.15rem)",
            color: "var(--nv-text-secondary)",
            lineHeight: 1.9,
            fontStyle: "italic",
            margin: 0,
            padding: "0 1rem",
          }}
        >
          &ldquo;{t.content}&rdquo;
        </blockquote>
        <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
          {/* Avatar */}
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "var(--nv-grad-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Outfit, sans-serif",
              fontWeight: 700,
              fontSize: "0.85rem",
              color: "#fff",
              marginBottom: "0.5rem",
            }}
          >
            {t.avatar}
          </div>
          <span
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 600,
              fontSize: "1rem",
              color: "var(--nv-text-primary)",
            }}
          >
            {t.name}
          </span>
          <span style={{ fontSize: "0.85rem", color: "var(--nv-text-muted)" }}>
            {t.role}, {t.company}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        <button
          onClick={prev}
          aria-label="Précédent"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--nv-border-light)",
            color: "var(--nv-text-secondary)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.25rem",
            transition: "all var(--nv-transition)",
          }}
        >
          ‹
        </button>
        {/* Dots */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Témoignage ${i + 1}`}
              style={{
                width: i === current ? "24px" : "8px",
                height: "8px",
                borderRadius: "100px",
                background:
                  i === current ? "var(--nv-accent-violet)" : "rgba(255,255,255,0.15)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>
        <button
          onClick={next}
          aria-label="Suivant"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--nv-border-light)",
            color: "var(--nv-text-secondary)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.25rem",
            transition: "all var(--nv-transition)",
          }}
        >
          ›
        </button>
      </div>
    </div>
  );
}
