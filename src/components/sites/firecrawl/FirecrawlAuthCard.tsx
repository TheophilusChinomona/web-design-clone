"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CrosshairDecoration, GitHubIcon, GoogleIcon } from "./icons";

export function FirecrawlAuthCard() {
  const router = useRouter();
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email || "executus.ahli@gmail.com", password }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        router.push(`/app/t/${json.teamId || "25bMf9wr6oN"}`);
      } else {
        setError(json.error || "Authentication failed");
      }
    } catch (err: any) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = (provider: string) => {
    setEmail(`user_${provider}@example.com`);
    handleSubmit({ preventDefault: () => {} } as any);
  };

  return (
    <div className="relative flex flex-col w-full">
      {/* Tabs Section */}
      <div className="relative border-b border-[#ededed] dark:border-[#2a2a2a]">
        <div className="px-4 py-1">
          <div className="flex relative justify-center">
            {/* Log In Tab */}
            <div className="relative p-3 flex-1 flex justify-center items-center">
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`py-3 px-6 flex justify-center items-center relative z-10 transition-colors rounded-full text-sm font-medium ${
                  mode === "login"
                    ? "text-[#171717] dark:text-[#f5f5f5] bg-black/5 dark:bg-white/10"
                    : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                }`}
              >
                Log In
              </button>
            </div>

            {/* Sign Up Tab */}
            <div className="relative p-3 flex-1 flex justify-center items-center">
              <button
                type="button"
                onClick={() => setMode("signup")}
                className={`py-3 px-6 flex justify-center items-center relative z-10 transition-colors rounded-full text-sm font-medium ${
                  mode === "signup"
                    ? "text-[#171717] dark:text-[#f5f5f5] bg-black/5 dark:bg-white/10"
                    : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Center Divider */}
            <div className="absolute left-1/2 -translate-x-1/2 w-[1px] bg-[#ededed] dark:bg-[#2a2a2a] -top-1 -bottom-1" />
          </div>
        </div>

        {/* Crosshairs */}
        <CrosshairDecoration className="absolute -bottom-[10px] -left-[10.5px] text-[#ededed] dark:text-[#2a2a2a]" />
        <CrosshairDecoration className="absolute -bottom-[10px] -right-[10.5px] text-[#ededed] dark:text-[#2a2a2a]" />
      </div>

      {/* Form Section */}
      <div className="px-4 pt-6">
        {error && (
          <div className="p-3 mb-4 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1.5">
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-[#171717] border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#fa5d19] focus:ring-1 focus:ring-[#fa5d19] transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-[#171717] border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#fa5d19] focus:ring-1 focus:ring-[#fa5d19] transition-all"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 h-10 px-5 inline-flex items-center justify-center rounded-full bg-[#fa5d19] text-white text-sm font-medium hover:bg-[#e04f12] active:scale-[0.99] shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_rgba(250,93,25,0.25)] transition-all cursor-pointer disabled:opacity-70"
          >
            {loading ? "Authenticating..." : mode === "signup" ? "Create Account" : "Log In"}
          </button>
        </form>
      </div>

      {/* OAuth Divider */}
      <div className="relative mt-6">
        <div className="absolute top-0 w-full h-[1px] bg-[#ededed] dark:bg-[#2a2a2a]" />
        <CrosshairDecoration className="absolute -top-[10px] -left-[10.5px] text-[#ededed] dark:text-[#2a2a2a]" />
        <CrosshairDecoration className="absolute -top-[10px] -right-[10.5px] text-[#ededed] dark:text-[#2a2a2a]" />
      </div>

      {/* Social Logins */}
      <div className="px-4 py-6">
        <div className="w-full space-y-2">
          <button
            type="button"
            onClick={() => handleOAuthLogin("github")}
            className="w-full h-10 px-5 inline-flex items-center justify-center gap-2 rounded-full bg-black text-white text-sm font-medium hover:bg-neutral-800 active:scale-[0.99] shadow-sm transition-all cursor-pointer"
          >
            <GitHubIcon className="w-4 h-4 text-white" />
            <span>Continue with GitHub</span>
          </button>
          <button
            type="button"
            onClick={() => handleOAuthLogin("google")}
            className="w-full h-10 px-5 inline-flex items-center justify-center gap-2 rounded-full bg-black text-white text-sm font-medium hover:bg-neutral-800 active:scale-[0.99] shadow-sm transition-all cursor-pointer"
          >
            <GoogleIcon className="w-4 h-4 text-white" />
            <span>Continue with Google</span>
          </button>
        </div>
      </div>

      {/* Bottom Crosshair Section */}
      <div className="relative">
        <div className="absolute top-0 w-full h-[1px] bg-[#ededed] dark:bg-[#2a2a2a]" />
        <CrosshairDecoration className="absolute -top-[10px] -left-[10.5px] text-[#ededed] dark:text-[#2a2a2a]" />
        <CrosshairDecoration className="absolute -top-[10px] -right-[10.5px] text-[#ededed] dark:text-[#2a2a2a]" />
      </div>

      {/* Legal & Agent Info Footer */}
      <div className="px-4 py-6 text-center space-y-3">
        <p className="text-xs text-neutral-500">
          By signing up, you agree to our{" "}
          <Link href="/privacy-policy" className="text-neutral-700 dark:text-neutral-300 underline hover:text-[#fa5d19]">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy-policy" className="text-neutral-700 dark:text-neutral-300 underline hover:text-[#fa5d19]">
            Privacy Policy
          </Link>
        </p>
        <p className="text-xs text-neutral-400">
          <a
            href="https://www.firecrawl.dev/agent-onboarding/SKILL.md"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#fa5d19] underline underline-offset-2 transition-colors"
          >
            Are you an AI agent? Get an API key here
          </a>
        </p>
      </div>
    </div>
  );
}
