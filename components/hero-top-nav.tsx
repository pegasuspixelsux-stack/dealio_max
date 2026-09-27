'use client';

import React, { useState, useEffect } from 'react';

export const HeroTopNav: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-8 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm text-slate-900 border-b border-slate-200/50'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent text-white'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-[10px] md:px-6">
        {/* Dealership Logo */}
        <div className="text-xl font-bold tracking-tight">
          DEALIO<span className="text-indigo-500">MAX</span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden space-x-8 text-sm font-medium md:flex">
          <a href="#inventory" className="transition-colors hover:opacity-80">
            Inventory
          </a>
          <a href="#services" className="transition-colors hover:opacity-80">
            Services
          </a>
          <a href="#about" className="transition-colors hover:opacity-80">
            About Us
          </a>
          <a href="#contact" className="transition-colors hover:opacity-80">
            Contact
          </a>
        </nav>

        {/* Action Button */}
        <div>
          <button
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              isScrolled
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-white text-slate-900 hover:bg-slate-100'
            }`}
          >
            Contact Sales
          </button>
        </div>
      </div>
    </header>
  );
};
