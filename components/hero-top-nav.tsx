'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Search } from 'lucide-react';

export const HeroTopNav: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
          ? 'bg-white/85 backdrop-blur-md shadow-sm text-slate-900 border-b border-slate-200/50'
          : 'bg-black/70 text-white'
      }`}
    >
      <div className="mx-auto flex sm:max-w-[1440px] items-center justify-between px-4 py-2 md:py-2 md:px-6">
        {/* Dealership Logo */}
        <div className="text-lg md:text-xl font-bold tracking-tight">
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

        {/* Search Bar */}
        <div className="hidden md:flex items-center">
          <div className={`flex items-center rounded-lg px-3 py-2 transition-colors ${
            isScrolled
              ? 'bg-slate-200 text-slate-900'
              : 'bg-white/20 text-white'
          }`}>
            <input
              type="text"
              placeholder="Search inventory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-sm w-32 placeholder-current placeholder-opacity-70"
            />
            <Search size={16} className="ml-2 opacity-70" />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <X size={24} className="text-white" />
          ) : (
            <Menu size={24} className={isScrolled ? "text-slate-900" : "text-white"} />
          )}
        </button>

      </div>
    </header>
  );
};
