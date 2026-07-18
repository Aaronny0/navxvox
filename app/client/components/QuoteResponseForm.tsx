"use client";

import { useActionState } from "react";
import { respondToQuote } from "../actions/auth";

export default function QuoteResponseForm({ quoteId }: { quoteId: string }) {
  const [state, action, pending] = useActionState(respondToQuote, undefined);

  return (
    <form action={action}>
      <input type="hidden" name="quoteId" value={quoteId} />
      
      {state?.message && (
        <div style={{ 
          padding: "0.75rem", 
          background: state.success ? "rgba(27,138,78,0.12)" : "rgba(198,40,40,0.12)", 
          color: state.success ? "var(--nv-success)" : "var(--nv-error)", 
          borderRadius: "var(--nv-radius-md)", 
          fontSize: "0.8rem", 
          marginBottom: "1rem" 
        }}>
          {state.message}
        </div>
      )}

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button 
          type="submit" 
          name="decision" 
          value="accepted"
          className="nv-btn nv-btn-primary" 
          style={{ flex: 1, padding: "0.5rem", fontSize: "0.8rem", justifyContent: "center" }}
          disabled={pending}
        >
          Accepter
        </button>
        <button 
          type="submit" 
          name="decision" 
          value="refused"
          className="nv-btn nv-btn-ghost" 
          style={{ flex: 1, padding: "0.5rem", fontSize: "0.8rem", justifyContent: "center", color: "var(--nv-error)" }}
          disabled={pending}
          onClick={(e) => {
            const note = prompt("Raison du refus (optionnel) :");
            if (note !== null) {
              const form = e.currentTarget.form;
              const noteInput = document.createElement("input");
              noteInput.type = "hidden";
              noteInput.name = "refusalNote";
              noteInput.value = note;
              form?.appendChild(noteInput);
            } else {
              e.preventDefault();
            }
          }}
        >
          Refuser
        </button>
      </div>
    </form>
  );
}
