import React from "react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Website Cloner — Replicas Hub",
  description: "Cloned websites catalog powered by AGY Website Cloner Plugin",
};

export default function HubPage() {
  const clones = [
    {
      title: "EdgeTech Solutions",
      category: "Industrial & Manufacturing",
      description:
        "Precision Wood Finishing & Edging website replica featuring complete Home, About, Services, Process, and Contact pages with interactive carousel.",
      href: "/edgetech",
      badge: "Full Multi-Page Site",
      bgGradient: "from-blue-600/10 to-indigo-600/10",
      borderColor: "hover:border-blue-500/50",
      accentColor: "text-blue-600 dark:text-blue-400",
      badgeColor: "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
      routes: ["/edgetech", "/edgetech/about", "/edgetech/services", "/edgetech/our-process", "/edgetech/contact"],
    },
    {
      title: "Firecrawl - Marketing Homepage",
      category: "Developer Tools & AI Infrastructure",
      description:
        "The context API for AI agents to search and scrape the web. Features interactive live scraping playground, cURL/Python/Node code switchers, and capabilities matrix.",
      href: "/firecrawl",
      badge: "Marketing Landing Page",
      bgGradient: "from-orange-600/10 to-amber-600/10",
      borderColor: "hover:border-orange-500/50",
      accentColor: "text-[#fa5d19]",
      badgeColor: "bg-orange-50 dark:bg-orange-950/40 text-[#fa5d19] border-orange-200 dark:border-orange-800",
      routes: ["/firecrawl"],
    },
    {
      title: "Firecrawl - Authenticated Dashboard",
      category: "SaaS App & Workspace",
      description:
        "Authenticated team dashboard with 7-day usage waveform charts, API key manager, live API playground, agent skills (SKILL.md, MCP, CLI), and integrations matrix.",
      href: "/app/t/25bMf9wr6oN",
      badge: "Interactive SaaS Dashboard",
      bgGradient: "from-neutral-900/10 to-orange-950/20",
      borderColor: "hover:border-[#fa5d19]/60",
      accentColor: "text-[#fa5d19]",
      badgeColor: "bg-orange-50 dark:bg-orange-950/40 text-[#fa5d19] border-orange-200 dark:border-orange-800",
      routes: [
        "/app/t/25bMf9wr6oN",
        "/app/t/25bMf9wr6oN/playground",
        "/app/t/25bMf9wr6oN/api-keys",
        "/app/t/25bMf9wr6oN/extract",
        "/app/t/25bMf9wr6oN/usage",
        "/app/t/25bMf9wr6oN/settings",
      ],
    },
    {
      title: "Firecrawl - Auth Portal",
      category: "Authentication & Onboarding",
      description:
        "Web application login & sign-up portal with precision geometric grid crosshairs and GitHub / Google OAuth buttons.",
      href: "/app",
      badge: "Auth Gateway",
      bgGradient: "from-neutral-500/10 to-neutral-700/10",
      borderColor: "hover:border-neutral-500/50",
      accentColor: "text-neutral-900 dark:text-white",
      badgeColor: "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700",
      routes: ["/app"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] text-neutral-900 dark:text-neutral-100 font-sans">
      {/* Header */}
      <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-[#111]/70 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold bg-gradient-to-r from-neutral-900 via-[#fa5d19] to-orange-500 bg-clip-text text-transparent">
              Website Cloner
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-mono">
              v1.0.0 Plugin
            </span>
          </div>

          <div className="text-xs text-neutral-500">
            Next.js 16 • Tailwind CSS v4 • shadcn/ui
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
            Cloned Websites Catalog
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400">
            Explore pixel-perfect reverse-engineered Next.js applications and dashboards cloned with the Antigravity Website Cloner plugin.
          </p>
        </div>

        {/* Clones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {clones.map((clone, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121212] shadow-sm transition-all duration-200 hover:shadow-xl ${clone.borderColor} flex flex-col justify-between space-y-6`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    {clone.category}
                  </span>
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${clone.badgeColor}`}>
                    {clone.badge}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {clone.title}
                </h2>

                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {clone.description}
                </p>

                {/* Subroutes pills */}
                <div className="pt-2">
                  <div className="text-[11px] font-mono text-neutral-400 mb-1.5 uppercase tracking-wider">
                    Included Routes:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {clone.routes.map((r, rIdx) => (
                      <Link
                        key={rIdx}
                        href={r}
                        className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                      >
                        {r}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
                <Link
                  href={clone.href}
                  className="inline-flex items-center justify-center w-full py-3 px-6 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 font-semibold text-sm transition-all shadow-sm group"
                >
                  <span>Launch {clone.title}</span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
