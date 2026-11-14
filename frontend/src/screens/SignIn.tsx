// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

const PRODUCT = "Inventory Management System";
const SCREEN = "Sign in";

export default function Screen() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  // "idle" | "error" | "checking" | "signedIn"
  const [status, setStatus] = React.useState("idle");
  const rule = `2px solid ${brand.primaryColor}`;
  const field = { border: rule, borderRadius: brand.radius, height: 44 };
  const checking = status === "checking";
  const signedIn = status === "signedIn";

  React.useEffect(() => {
    if (status !== "checking") return undefined;
    const t = setTimeout(() => setStatus("signedIn"), 850);
    return () => clearTimeout(t);
  }, [status]);

  React.useEffect(() => {
    if (status !== "signedIn") return undefined;
    const t = setTimeout(() => navigate("inventory"), 700);
    return () => clearTimeout(t);
  }, [status]);

  const submit = (e) => {
    e.preventDefault();
    if (checking || signedIn) return;
    const credentialsAccepted = /\S+@\S+\.\S+/.test(email.trim()) && password.length >= 8;
    setStatus(credentialsAccepted ? "checking" : "error");
  };

  return (
    <div className="flex min-h-screen flex-col bg-white" style={{ color: brand.primaryColor, fontFamily: brand.fontBody }}>
      <style>{`
        .obs-focus:focus-visible { outline: 2px solid ${brand.accentColor}; outline-offset: 2px; }
        @keyframes obs-in { from { opacity: 0; transform: translateY(-3px); } to { opacity: 1; transform: none; } }
        .obs-in { animation: obs-in 160ms ease-out both; }
        @media (prefers-reduced-motion: reduce) { .obs-in { animation: none; } }
      `}</style>

      <header className="flex flex-wrap items-center justify-between gap-2 px-6 py-5 sm:px-10" style={{ borderBottom: rule }}>
        <p className="text-lg font-bold tracking-tight" style={{ fontFamily: brand.fontHeading }}>{PRODUCT}</p>
        <p className="text-xs font-semibold uppercase tracking-[0.18em]">Single shared inventory · One location</p>
      </header>

      <div className="grid flex-1 grid-cols-1 lg:grid-cols-[440px_minmax(0,1fr)]">
        <main className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:border-r-0" style={{ borderBottom: rule }}>
          <h1 data-wf="b-0-0" className="text-4xl font-bold tracking-tight" style={{ fontFamily: brand.fontHeading }}>{SCREEN}</h1>
          <p data-wf="b-1-0" className="mt-2 text-sm leading-relaxed" style={{ color: brand.neutralColor }}>
            Sign in with your email and password to manage the shared inventory.
          </p>

          <form data-wf="b-2-0" className="mt-10 space-y-5" onSubmit={submit} noValidate>
            <div className="space-y-2">
              <label htmlFor="staff-email" className="block text-[11px] font-bold uppercase tracking-[0.16em]">Email</label>
              <input
                data-wf="i-2-0-0"
                id="staff-email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                required
                disabled={checking || signedIn}
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
                className="obs-focus w-full bg-white px-3 text-sm outline-none disabled:opacity-60"
                style={field}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="staff-password" className="block text-[11px] font-bold uppercase tracking-[0.16em]">Password</label>
              <input
                data-wf="i-2-0-1"
                id="staff-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                disabled={checking || signedIn}
                value={password}
                onChange={(e) => { setPassword(e.target.value); if (status === "error") setStatus("idle"); }}
                aria-describedby="password-hint"
                className="obs-focus w-full bg-white px-3 text-sm outline-none disabled:opacity-60"
                style={field}
              />
              <p id="password-hint" className="text-xs" style={{ color: brand.neutralColor }}>
                At least 8 characters. Email and password are the only way in — there is no SSO or MFA.
              </p>
            </div>

            <div data-wf="b-3-0" aria-live="polite" className="min-h-[1.25rem]">
              {status === "error" && (
                <p className="obs-in flex items-start gap-2 px-3 py-2 text-sm font-semibold" style={{ border: `2px solid ${brand.accentColor}`, borderRadius: brand.radius, color: brand.accentColor }}>
                  <Icons.AlertCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>Email or password is incorrect.</span>
                </p>
              )}
              {checking && (
                <p className="obs-in text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: brand.neutralColor }}>
                  Checking your credentials…
                </p>
              )}
              {signedIn && (
                <p className="obs-in flex items-start gap-2 text-sm font-semibold">
                  <Icons.CheckCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>Signed in as {email.trim()}. Opening the inventory…</span>
                </p>
              )}
            </div>

            <button
              data-wf="b-4-0"
              type="submit"
              disabled={checking || signedIn}
              className="obs-focus h-11 w-full text-sm font-bold uppercase tracking-[0.16em] text-white outline-none disabled:opacity-70"
              style={{ backgroundColor: brand.primaryColor, borderRadius: brand.radius }}
            >
              {checking ? "Signing in…" : signedIn ? "Signed in" : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-sm">
            <button
              data-wf="b-5-0"
              type="button"
              onClick={() => navigate("create-account")}
              className="obs-focus text-sm font-bold underline underline-offset-4 outline-none"
            >
              New here? Create an account
            </button>
          </p>
        </main>

        <aside className="flex flex-col justify-end px-6 py-10 sm:px-10 sm:py-12" style={{ borderLeft: rule }}>
          <p className="mt-10 pt-3 text-xs leading-relaxed" style={{ borderTop: rule, color: brand.neutralColor }}>
            Your session ends the moment you sign out, and expires after 12 hours · Signed-out devices are returned to this screen · Low stock is flagged in the app below 5 units — never by email or SMS
          </p>
        </aside>
      </div>
    </div>
  );
}
