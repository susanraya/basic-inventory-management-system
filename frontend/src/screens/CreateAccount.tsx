// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Input, Label } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Package, AlertCircle, CheckCircle } = Icons;

const TAKEN_EMAILS = [
  "susan.raya@quorq.ai",
  "marcus.hale@quorq.ai",
  "priya.nandakumar@quorq.ai",
  "receiving@quorq.ai",
];

const LEDGER = [
  { name: "Kraft mailer 6×10", qty: 1240 },
  { name: "Thermal label roll 4×6", qty: 318 },
  { name: "Packing tape 48mm", qty: 3 },
  { name: "Pallet wrap 20in", qty: 76 },
  { name: "Box cutter blades", qty: 4 },
  { name: "Bubble wrap 12in roll", qty: 212 },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Screen() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [emailTaken, setEmailTaken] = React.useState(false);
  const [status, setStatus] = React.useState("idle"); // idle | submitting | created
  const timerRef = React.useRef(null);

  React.useEffect(function () {
    return function () {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  React.useEffect(
    function () {
      if (status === "created") {
        const el = document.getElementById("create-account-success");
        if (el) el.focus();
      }
    },
    [status]
  );

  const focusField = function (id) {
    const el = document.getElementById(id);
    if (el && el.focus) el.focus();
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    if (status === "submitting") return;

    const next = {};
    const trimmed = email.trim();
    if (!trimmed) {
      next.email = "Enter the work email you'll sign in with.";
    } else if (!EMAIL_RE.test(trimmed)) {
      next.email = "That doesn't look like an email address. Try dana.ortiz@quorq.ai.";
    }
    if (!password) {
      next.password = "Choose a password to protect the shared inventory.";
    } else if (password.length < 8) {
      next.password = "Use at least 8 characters — you have " + password.length + ".";
    }
    if (!confirm) {
      next.confirm = "Type the password a second time to confirm it.";
    } else if (confirm !== password) {
      next.confirm = "Both entries must match exactly.";
    }

    setErrors(next);
    setEmailTaken(false);

    if (Object.keys(next).length > 0) {
      focusField(next.email ? "field-email" : next.password ? "field-password" : "field-confirm");
      return;
    }

    setStatus("submitting");
    timerRef.current = setTimeout(function () {
      if (TAKEN_EMAILS.indexOf(trimmed.toLowerCase()) !== -1) {
        setEmailTaken(true);
        setStatus("idle");
        focusField("field-email");
      } else {
        setStatus("created");
      }
    }, 700);
  };

  const ink = brand.primaryColor;
  const accent = brand.accentColor;
  const muted = brand.neutralColor;
  const radius = brand.radius;

  const labelStyle = {
    fontFamily: brand.fontBody,
    color: ink,
    fontSize: "11px",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    fontWeight: 700,
  };

  const inputStyle = {
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: ink,
    borderRadius: radius,
    backgroundColor: brand.backgroundColor,
    color: ink,
    fontFamily: brand.fontBody,
    fontSize: "15px",
    height: "46px",
    width: "100%",
  };

  const errorInputStyle = Object.assign({}, inputStyle, { borderColor: accent });

  const css =
    "@keyframes obsIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}" +
    "@keyframes obsBar{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}" +
    ".obs-in{animation:obsIn .18s ease-out both}" +
    ".obs-focus:focus-visible{outline:2px solid " + accent + ";outline-offset:2px}" +
    ".obs-bar{position:absolute;left:0;top:0;height:2px;width:50%;background:" + accent + ";animation:obsBar 1s linear infinite}" +
    ".obs-link{text-underline-offset:3px}" +
    "@media (prefers-reduced-motion: reduce){.obs-in,.obs-bar{animation:none}}";

  return (
    <div
      className="min-h-screen w-full lg:grid lg:grid-cols-12"
      style={{ backgroundColor: brand.backgroundColor, fontFamily: brand.fontBody, color: ink }}
    >
      <style>{css}</style>

      {/* Identity rail — product world, not navigation */}
      <aside
        className="lg:col-span-5 px-6 py-6 sm:px-10 lg:px-12 lg:py-12 flex flex-col justify-between"
        style={{ backgroundColor: ink, color: brand.backgroundColor }}
      >
        <div>
          <div className="flex items-baseline gap-3">
            <Package className="h-5 w-5" aria-hidden="true" />
            <span
              style={{ fontFamily: brand.fontHeading, fontSize: "14px", letterSpacing: "0.26em", fontWeight: 700 }}
            >
              STOCKLINE
            </span>
          </div>
          <p
            className="mt-4 max-w-sm"
            style={{ fontSize: "14px", lineHeight: 1.6, color: "#d8d8d8" }}
          >
            One shared inventory for the Harbour Road stockroom. Everyone who signs in gets the same full access —
            add, edit, count and retire products.
          </p>
        </div>

        <div className="hidden lg:block mt-12">
          <div
            className="flex items-center justify-between pb-2"
            style={{ borderBottom: "2px solid " + brand.backgroundColor }}
          >
            <span style={{ fontSize: "11px", letterSpacing: "0.14em", fontWeight: 700 }}>LIVE STOCK SNAPSHOT</span>
            <span style={{ fontSize: "11px", color: "#9a9a9a", fontVariantNumeric: "tabular-nums" }}>14 NOV 2026 · 08:40</span>
          </div>
          <ul>
            {LEDGER.map(function (item) {
              const low = item.qty < 5;
              return (
                <li
                  key={item.name}
                  className="flex items-center justify-between gap-4 py-[7px]"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.14)", fontSize: "13px" }}
                >
                  <span className="truncate" style={{ color: "#e9e9e9" }}>{item.name}</span>
                  <span className="flex items-center gap-2 shrink-0">
                    {low ? (
                      <span
                        style={{
                          backgroundColor: accent,
                          color: "#ffffff",
                          fontSize: "10px",
                          letterSpacing: "0.1em",
                          fontWeight: 700,
                          padding: "1px 5px",
                          borderRadius: radius,
                        }}
                      >
                        LOW
                      </span>
                    ) : null}
                    <span style={{ fontVariantNumeric: "tabular-nums", minWidth: "48px", textAlign: "right", display: "inline-block" }}>
                      {item.qty.toLocaleString("en-US")}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="mt-4" style={{ fontSize: "12px", color: "#9a9a9a", lineHeight: 1.5 }}>
            6 of 1,418 products shown. Quantities refresh when a colleague saves a count.
          </p>
        </div>
      </aside>

      {/* Form column */}
      <main className="lg:col-span-7 px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <div className="w-full max-w-xl">
          <p style={{ fontSize: "11px", letterSpacing: "0.16em", fontWeight: 700, color: muted }}>
            STAFF ACCESS
          </p>

          <h1
            data-wf="b-0-0"
            className="mt-2"
            style={{
              fontFamily: brand.fontHeading,
              fontSize: "36px",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              fontWeight: 700,
              color: ink,
            }}
          >
            Create account
          </h1>

          <p
            data-wf="b-1-0"
            className="mt-3 max-w-[56ch]"
            style={{ fontSize: "15px", lineHeight: 1.6, color: muted }}
          >
            Register yourself or accept an admin invitation to get access to the shared inventory.
          </p>

          <div style={{ borderTop: "2px solid " + ink }} className="mt-6" />

          {status === "created" ? (
            <section
              className="obs-in mt-6"
              aria-labelledby="create-account-success"
              style={{ border: "2px solid " + ink, borderRadius: radius, padding: "24px" }}
            >
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 shrink-0 mt-[2px]" aria-hidden="true" style={{ color: ink }} />
                <div>
                  <h2
                    id="create-account-success"
                    tabIndex={-1}
                    style={{
                      fontFamily: brand.fontHeading,
                      fontSize: "20px",
                      fontWeight: 700,
                      letterSpacing: "-0.01em",
                      outline: "none",
                    }}
                  >
                    Account created
                  </h2>
                  <p className="mt-2" style={{ fontSize: "14px", lineHeight: 1.6, color: muted }}>
                    <span style={{ color: ink, fontWeight: 700 }}>{email.trim()}</span> can now sign in to Stockline.
                    Your password was hashed before storage — it is never kept or shown in plain text.
                  </p>
                  <p className="mt-3" style={{ fontSize: "13px", lineHeight: 1.6, color: muted }}>
                    Use the sign-in link below to open the shared inventory.
                  </p>
                </div>
              </div>
            </section>
          ) : (
            <form data-wf="b-2-0" onSubmit={handleSubmit} noValidate className="mt-6">
              {/* Email */}
              <div>
                <Label htmlFor="field-email" style={labelStyle}>Email</Label>
                <Input
                  data-wf="i-2-0-0"
                  id="field-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  className="obs-focus mt-2"
                  placeholder="dana.ortiz@quorq.ai"
                  value={email}
                  onChange={function (e) { setEmail(e.target.value); }}
                  aria-invalid={errors.email || emailTaken ? "true" : "false"}
                  aria-describedby={errors.email ? "err-email" : emailTaken ? "b-3-0-msg" : undefined}
                  disabled={status === "submitting"}
                  style={errors.email || emailTaken ? errorInputStyle : inputStyle}
                />
                {errors.email ? (
                  <p id="err-email" className="obs-in mt-2 flex items-start gap-2" style={{ fontSize: "13px", color: accent, lineHeight: 1.5 }}>
                    <AlertCircle className="h-4 w-4 shrink-0 mt-[1px]" aria-hidden="true" />
                    <span>{errors.email}</span>
                  </p>
                ) : null}
              </div>

              {/* Password */}
              <div className="mt-6">
                <div className="flex items-baseline justify-between gap-4">
                  <Label htmlFor="field-password" style={labelStyle}>Password (at least 8 characters)</Label>
                  <button
                    type="button"
                    className="obs-focus obs-link underline"
                    onClick={function () { setShowPassword(function (v) { return !v; }); }}
                    style={{ fontSize: "12px", color: muted, fontWeight: 700, letterSpacing: "0.04em", padding: "4px" }}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <Input
                  data-wf="i-2-0-1"
                  id="field-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  className="obs-focus mt-2"
                  value={password}
                  onChange={function (e) { setPassword(e.target.value); }}
                  aria-invalid={errors.password ? "true" : "false"}
                  aria-describedby={errors.password ? "err-password" : "hint-password"}
                  disabled={status === "submitting"}
                  style={errors.password ? errorInputStyle : inputStyle}
                />
                {errors.password ? (
                  <p id="err-password" className="obs-in mt-2 flex items-start gap-2" style={{ fontSize: "13px", color: accent, lineHeight: 1.5 }}>
                    <AlertCircle className="h-4 w-4 shrink-0 mt-[1px]" aria-hidden="true" />
                    <span>{errors.password}</span>
                  </p>
                ) : (
                  <p id="hint-password" className="mt-2" style={{ fontSize: "12px", color: muted, lineHeight: 1.5 }}>
                    Stored hashed, never in plain text. Eight characters minimum — no other rules.
                  </p>
                )}
              </div>

              {/* Confirm password */}
              <div className="mt-6">
                <Label htmlFor="field-confirm" style={labelStyle}>Confirm password</Label>
                <Input
                  data-wf="i-2-0-2"
                  id="field-confirm"
                  name="confirm_password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  className="obs-focus mt-2"
                  value={confirm}
                  onChange={function (e) { setConfirm(e.target.value); }}
                  aria-invalid={errors.confirm ? "true" : "false"}
                  aria-describedby={errors.confirm ? "err-confirm" : undefined}
                  disabled={status === "submitting"}
                  style={errors.confirm ? errorInputStyle : inputStyle}
                />
                {errors.confirm ? (
                  <p id="err-confirm" className="obs-in mt-2 flex items-start gap-2" style={{ fontSize: "13px", color: accent, lineHeight: 1.5 }}>
                    <AlertCircle className="h-4 w-4 shrink-0 mt-[1px]" aria-hidden="true" />
                    <span>{errors.confirm}</span>
                  </p>
                ) : null}
              </div>

              {/* Account-level error */}
              <div data-wf="b-3-0" role="status" aria-live="polite">
                {emailTaken ? (
                  <div
                    id="b-3-0-msg"
                    className="obs-in mt-6 flex items-start gap-3"
                    style={{ border: "2px solid " + accent, borderRadius: radius, padding: "14px 16px" }}
                  >
                    <AlertCircle className="h-5 w-5 shrink-0 mt-[1px]" aria-hidden="true" style={{ color: accent }} />
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 700, color: accent }}>That email is already in use.</p>
                      <p className="mt-1" style={{ fontSize: "13px", color: muted, lineHeight: 1.5 }}>
                        No second account was created. Sign in with it below, or register a different work address —
                        what you typed has been kept.
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Submit */}
              <div className="mt-8">
                <div className="relative overflow-hidden" style={{ borderRadius: radius }}>
                  {status === "submitting" ? <span className="obs-bar" aria-hidden="true" /> : null}
                  <Button
                    data-wf="b-4-0"
                    type="submit"
                    disabled={status === "submitting"}
                    className="obs-focus w-full"
                    style={{
                      backgroundColor: ink,
                      color: brand.backgroundColor,
                      borderRadius: radius,
                      height: "50px",
                      width: "100%",
                      fontSize: "15px",
                      fontWeight: 700,
                      letterSpacing: "0.02em",
                      opacity: status === "submitting" ? 0.72 : 1,
                      transition: "opacity .15s ease",
                    }}
                  >
                    {status === "submitting" ? "Creating account…" : "Create account"}
                  </Button>
                </div>
                <p className="mt-3" style={{ fontSize: "12px", color: muted, lineHeight: 1.5 }}>
                  Every Stockline account has the same full access to the shared inventory.
                </p>
              </div>
            </form>
          )}

          <div style={{ borderTop: "1px solid rgba(17,17,17,0.14)" }} className="mt-10" />

          <p data-wf="b-5-0-wrap" className="mt-5" style={{ fontSize: "14px", color: muted }}>
            Already have an account?{" "}
            <button
              data-wf="b-5-0"
              type="button"
              onClick={function () { navigate("sign-in"); }}
              className="obs-focus obs-link underline"
              style={{ color: ink, fontWeight: 700, padding: "2px" }}
            >
              Sign in
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}
