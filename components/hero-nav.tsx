"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export function HeroNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-transparent">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="text-xl font-bold text-white tracking-tight">
          <span>DEALIO</span>
          <span className="text-primary">MAX</span>
        </div>

        {/* Hamburger Menu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-white hover:bg-white/10 rounded-lg transition"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="bg-black/80 backdrop-blur-sm px-4 py-4 space-y-2 sm:hidden">
          <a href="#inventory" className="block py-2 text-white hover:text-primary transition">
            Inventario
          </a>
          <a href="#contact" className="block py-2 text-white hover:text-primary transition">
            Contacto
          </a>
          <a href="/showroom" className="block py-2 text-white hover:text-primary transition">
            Showroom
          </a>
        </div>
      )}
    </nav>
  );
}
