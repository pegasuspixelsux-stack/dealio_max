"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import { easeOut } from "@/lib/motion";

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Sala de Exhibición", href: "/showroom" },
  { label: "Nosotros", href: "/#about" },
  { label: "Contacto", href: "/#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-9 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-gradient-to-b from-foreground/95 to-foreground/85 border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-[54px] sm:h-18 bg-gradient-to-b from-background/50 via-background/15 to-transparent transition-opacity duration-300 ${
          scrolled ? "opacity-0" : "opacity-100"
        }`}
      />

      <nav className="mx-auto flex h-[54px] sm:h-18 max-w-[1440px] items-center justify-between px-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className={`text-[2rem] leading-none tracking-tight transition-colors duration-200 [font-family:var(--font-script)] ${
            scrolled ? "text-foreground" : "text-white"
          }`}
        >
          Rodolfo Etchevarria
        </Link>

        <ul className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`group relative text-[0.9rem] transition-colors duration-200 ${
                  scrolled
                    ? "text-foreground/80 hover:text-foreground"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-foreground transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar vehículos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 rounded-none border border-border-strong bg-surface/50 pl-10 pr-4 text-[0.9rem] text-foreground placeholder:text-muted-2 transition-all duration-200 focus-visible:border-foreground/50 focus-visible:outline-none hover:bg-surface/70"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <div className="relative hidden md:block w-48">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 rounded-none border border-border-strong bg-surface/50 pl-10 pr-4 text-[0.85rem] text-foreground placeholder:text-muted-2 transition-all duration-200 focus-visible:border-foreground/50 focus-visible:outline-none hover:bg-surface/70"
            />
          </div>
          <button
            type="button"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className={`flex h-10 w-10 items-center justify-center rounded-none transition-colors duration-200 ${
              scrolled ? "text-foreground" : "text-white"
            }`}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25, ease: easeOut }}
            className="glass absolute inset-x-0 top-full lg:hidden"
          >
            <ul className="flex flex-col px-6 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href} className="border-b border-border last:border-none">
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3.5 text-[0.95rem] text-foreground/90"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
