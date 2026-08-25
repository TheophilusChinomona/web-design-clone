"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FirecrawlLogo } from "./icons";

export function FirecrawlNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#ededed] dark:border-[#2a2a2a] bg-[#f9f9f9]/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/firecrawl" className="flex items-center gap-2">
          <FirecrawlLogo className="h-8 w-auto text-[#171717] dark:text-[#f5f5f5]" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600 dark:text-neutral-300">
          <Link href="#features" className="hover:text-[#fa5d19] transition-colors">
            Features
          </Link>
          <Link href="#playground" className="hover:text-[#fa5d19] transition-colors">
            Playground
          </Link>
          <Link href="#docs" className="hover:text-[#fa5d19] transition-colors">
            Docs
          </Link>
          <Link href="#pricing" className="hover:text-[#fa5d19] transition-colors">
            Pricing
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/app"
            className="text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:text-[#fa5d19] px-4 py-2 rounded-full transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/app"
            className="text-sm font-medium bg-[#fa5d19] text-white px-5 py-2 rounded-full hover:bg-[#e04f12] shadow-[0_2px_10px_rgba(250,93,25,0.3)] active:scale-95 transition-all"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-neutral-600 dark:text-neutral-300"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#ededed] dark:border-[#2a2a2a] bg-[#f9f9f9] dark:bg-[#0a0a0a] px-4 py-6 space-y-4">
          <Link href="#features" className="block text-base font-medium text-neutral-700 dark:text-neutral-200">
            Features
          </Link>
          <Link href="#playground" className="block text-base font-medium text-neutral-700 dark:text-neutral-200">
            Playground
          </Link>
          <Link href="#docs" className="block text-base font-medium text-neutral-700 dark:text-neutral-200">
            Docs
          </Link>
          <Link href="#pricing" className="block text-base font-medium text-neutral-700 dark:text-neutral-200">
            Pricing
          </Link>
          <div className="pt-4 flex flex-col gap-2">
            <Link
              href="/app"
              className="w-full text-center py-2 rounded-full border border-neutral-300 dark:border-neutral-700 text-sm font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/app"
              className="w-full text-center py-2 rounded-full bg-[#fa5d19] text-white text-sm font-medium shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
