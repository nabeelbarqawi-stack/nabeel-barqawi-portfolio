"use client";

import type { CSSProperties } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { CheckCircle } from "@phosphor-icons/react";

type Props = {
  /** label on the submit button */
  buttonText: string;
  /** hidden form_type value so submissions are identifiable in Formspree */
  source: string;
  placeholder?: string;
  center?: boolean;
  minInputWidth?: number;
  /** success rendering */
  successText: string;
  successTitle?: string;
  /** "boxed" = framed pill with title+sub (community); "inline" = check + single line */
  successVariant?: "inline" | "boxed";
  /** optional helper line rendered under the form */
  helper?: string;
  /** slightly darker input bg for use on translucent panels */
  darkInput?: boolean;
};

export default function NewsletterForm({
  buttonText,
  source,
  placeholder = "you@email.com",
  center = false,
  minInputWidth = 230,
  successText,
  successTitle,
  successVariant = "inline",
  helper,
  darkInput = false,
}: Props) {
  const [state, handleSubmit] = useForm("xqewjded");

  if (state.succeeded) {
    if (successVariant === "boxed") {
      return (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "16px 26px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }}>
          <CheckCircle size={24} weight="bold" color="var(--a2)" />
          <div style={{ textAlign: "left" }}>
            <div style={{ fontWeight: 700, color: "#fff", fontSize: 15 }}>{successTitle}</div>
            <div style={{ fontSize: 13, color: "#8f8da5" }}>{successText}</div>
          </div>
        </div>
      );
    }
    return (
      <div style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "#fff", fontWeight: 700, fontSize: 15 }}>
        <CheckCircle size={22} weight="bold" color="var(--a2)" />
        {successText}
      </div>
    );
  }

  const inputStyle: CSSProperties = {
    flex: 1, minWidth: minInputWidth, padding: "15px 20px",
    background: darkInput ? "rgba(11,11,18,0.5)" : "rgba(255,255,255,0.05)",
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: center ? "center" : "flex-start" }}>
        <input type="hidden" name="form_type" value={source} />
        <input
          name="email"
          type="email"
          required
          placeholder={placeholder}
          aria-label="Email address"
          className="nb-input"
          style={inputStyle}
        />
        <button type="submit" className="btn-primary" disabled={state.submitting} style={{ padding: "15px 28px", borderRadius: 12, fontSize: 15, whiteSpace: "nowrap" }}>
          {state.submitting ? "…" : buttonText}
        </button>
      </form>
      <ValidationError field="email" prefix="Email" errors={state.errors} style={{ fontSize: 12, color: "#ff8a8a", marginTop: 8, textAlign: center ? "center" : "left" }} />
      {helper && (
        <div style={{ fontSize: 13, color: "#7d7b93", marginTop: 14, textAlign: center ? "center" : "left" }}>{helper}</div>
      )}
    </div>
  );
}
