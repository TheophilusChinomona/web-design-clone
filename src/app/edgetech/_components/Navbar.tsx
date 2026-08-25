"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/edgetech" },
  { name: "About", href: "/edgetech/about" },
  { name: "Services", href: "/edgetech/services" },
  { name: "Our Process", href: "/edgetech/our-process" },
  { name: "Contact", href: "/edgetech/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#f3f3f3] shadow-xs font-sans">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 h-[80px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/edgetech" className="flex items-center">
          <Image
            src="/images/ET-logo-144x33.png"
            alt="EdgeTech Solutions"
            width={144}
            height={33}
            priority
            className="w-[144px] h-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/edgetech"
                  ? pathname === "/edgetech" || pathname === "/edgetech/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`text-[15px] transition-colors py-2 font-body font-normal ${
                      isActive
                        ? "text-[#3a3a3a] font-medium"
                        : "text-[#4B4F58] hover:text-[#3a3a3a]"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA Button */}
          <Link
            href="/edgetech/contact"
            className="inline-flex items-center justify-center bg-[#3a3a3a] hover:bg-[#4B4F58] text-white px-8 py-3 text-[15px] font-heading font-medium tracking-wide transition-colors"
          >
            Let&apos;s Talk
          </Link>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#3a3a3a] hover:text-[#6592c7] focus:outline-hidden"
            aria-label="Toggle Navigation"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5.293 6.707l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5.293-5.293 5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-5.293-5.293 5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 13h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1zM3 7h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1zM3 19h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-6 space-y-4 shadow-lg animate-fadeIn">
          <ul className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/edgetech"
                  ? pathname === "/edgetech" || pathname === "/edgetech/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 text-[16px] font-body ${
                      isActive
                        ? "text-[#3a3a3a] font-semibold"
                        : "text-[#4B4F58] hover:text-[#3a3a3a]"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="pt-2">
            <Link
              href="/edgetech/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center bg-[#3a3a3a] hover:bg-[#4B4F58] text-white py-3 text-[15px] font-heading font-medium"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
