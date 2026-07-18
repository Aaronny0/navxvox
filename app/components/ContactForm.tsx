"use client";

import { useState } from "react";
import { submitContact } from "@/app/actions";

const projectTypes = [
  "Site vitrine",
  "Application web",
  "E-commerce",
  "Design UX/UI",
  "SEO & Visibilité",
  "Maintenance",
  "Autre",
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypot
    if (fd.get("website")) return;

    // Validation
    const newErrors: Record<string, string> = {};
    if (!fd.get("firstName")) newErrors.firstName = "Prénom requis";
    if (!fd.get("lastName")) newErrors.lastName = "Nom requis";
    const email = fd.get("email") as string;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Email invalide";
    if (!fd.get("message")) newErrors.message = "Message requis";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus("sending");

    try {
      await submitContact(fd);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "3rem 2rem",
          background: "rgba(46,196,182,0.09)",
          borderRadius: "var(--nv-radius-lg)",
          border: "1px solid rgba(46,196,182,0.24)",
        }}
      >
        <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>✅</span>
        <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, marginBottom: "0.5rem" }}>
          Message envoyé !
        </h3>
        <p style={{ color: "var(--nv-text-secondary)", margin: 0 }}>
          Merci pour votre message. Nous vous répondrons sous 24h.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="nv-btn nv-btn-ghost"
          style={{ marginTop: "1.5rem" }}
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = { marginBottom: "0.25rem" };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot */}
      <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.25rem",
        }}
      >
        <div>
          <label htmlFor="firstName" className="nv-label">Prénom *</label>
          <input id="firstName" name="firstName" type="text" className="nv-input" style={inputStyle} placeholder="Jean" />
          {errors.firstName && <span style={{ color: "var(--nv-error)", fontSize: "0.75rem" }}>{errors.firstName}</span>}
        </div>
        <div>
          <label htmlFor="lastName" className="nv-label">Nom *</label>
          <input id="lastName" name="lastName" type="text" className="nv-input" style={inputStyle} placeholder="Dupont" />
          {errors.lastName && <span style={{ color: "var(--nv-error)", fontSize: "0.75rem" }}>{errors.lastName}</span>}
        </div>
        <div>
          <label htmlFor="email" className="nv-label">Email *</label>
          <input id="email" name="email" type="email" className="nv-input" style={inputStyle} placeholder="jean@exemple.fr" />
          {errors.email && <span style={{ color: "var(--nv-error)", fontSize: "0.75rem" }}>{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="phone" className="nv-label">Téléphone</label>
          <input id="phone" name="phone" type="tel" className="nv-input" style={inputStyle} placeholder="+33 6 12 34 56 78" />
        </div>
        <div>
          <label htmlFor="company" className="nv-label">Entreprise</label>
          <input id="company" name="company" type="text" className="nv-input" style={inputStyle} placeholder="Ma Société" />
        </div>
        <div>
          <label htmlFor="projectType" className="nv-label">Type de projet</label>
          <select
            id="projectType"
            name="projectType"
            className="nv-input"
            style={{ ...inputStyle, cursor: "pointer" }}
          >
            <option value="">Sélectionnez…</option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ marginTop: "1.25rem" }}>
        <label htmlFor="message" className="nv-label">Message *</label>
        <textarea
          id="message"
          name="message"
          className="nv-input"
          rows={5}
          style={{ ...inputStyle, resize: "vertical" }}
          placeholder="Décrivez votre projet, vos besoins, vos délais…"
        />
        {errors.message && <span style={{ color: "var(--nv-error)", fontSize: "0.75rem" }}>{errors.message}</span>}
      </div>

      <button
        type="submit"
        className="nv-btn nv-btn-primary"
        disabled={status === "sending"}
        style={{ marginTop: "1.5rem", width: "100%", justifyContent: "center" }}
      >
        {status === "sending" ? "Envoi en cours…" : "Envoyer le message →"}
      </button>

      {status === "error" && (
        <p style={{ color: "var(--nv-error)", fontSize: "0.85rem", marginTop: "1rem", textAlign: "center" }}>
          Une erreur est survenue. Veuillez réessayer.
        </p>
      )}
    </form>
  );
}
