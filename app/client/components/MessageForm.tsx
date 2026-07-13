"use client";

import { useActionState, useRef } from "react";
import { sendMessage } from "../actions/auth";

export default function MessageForm({ projectId }: { projectId: string }) {
  const [state, action, pending] = useActionState(sendMessage, undefined);
  const formRef = useRef<HTMLFormElement>(null);

  if (state?.success && formRef.current) {
    formRef.current.reset();
  }

  return (
    <form ref={formRef} action={action} style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
      <input type="hidden" name="projectId" value={projectId} />
      <input
        type="text"
        name="content"
        className="nv-input"
        placeholder="Écrivez un message..."
        required
        style={{ flex: 1 }}
      />
      <button type="submit" className="nv-btn nv-btn-primary" disabled={pending}>
        {pending ? "..." : "Envoyer"}
      </button>
    </form>
  );
}
