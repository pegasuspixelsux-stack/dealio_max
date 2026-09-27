'use client';

import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';

export const HeroHeaderSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Fixed Top Header Container */}
      <div className="fixed top-0 left-0 right-0 z-[9999] w-full bg-white">
        {/* Row 1: Logo + Nav + Location/Hours (60px high) */}
        <div className="h-[60px] w-full border-b border-slate-100 flex items-center px-4 md:px-8">
          <div className="mx-auto w-full max-w-7xl flex items-center justify-between">
            <div className="text-xl font-bold tracking-tight text-slate-900">
              DEALIO<span className="text-indigo-600">MAX</span>
            </div>
            <nav className="hidden space-x-8 text-sm font-medium text-slate-700 md:flex">
              <a href="#inventory" className="hover:text-slate-900">Inventory</a>
              <a href="#services" className="hover:text-slate-900">Services</a>
              <a href="#about" className="hover:text-slate-900">About Us</a>
              <a href="#contact" className="hover:text-slate-900">Contact</a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-slate-900"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Right Side: Location/Hours (Desktop only) */}
            <div className="hidden items-center gap-3 text-xs text-slate-600 md:flex border-l border-slate-300 pl-4">
              <span>📍 Punta del Este • Abierto hasta las 7:00 PM</span>
            </div>
          </div>
        </div>

        {/* Row 2: Search Bar (50px high) */}
        <div className="h-[50px] w-full border-b border-slate-100 flex items-center px-4 md:px-8 bg-slate-50">
          <div className="mx-auto w-full max-w-7xl flex items-center justify-center">
            <div className="flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2 w-full">
              <input
                type="text"
                placeholder="Buscar marca, modelo, o año..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="outline-none text-sm w-full text-slate-900 placeholder:text-slate-500"
              />
              <Search size={16} className="ml-2 text-slate-400 flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 px-4 py-4">
            <div className="mx-auto w-full max-w-7xl flex flex-col gap-3">
              <a href="#inventory" className="text-sm font-medium text-slate-700 hover:text-slate-900">
                Inventory
              </a>
              <a href="#services" className="text-sm font-medium text-slate-700 hover:text-slate-900">
                Services
              </a>
              <a href="#about" className="text-sm font-medium text-slate-700 hover:text-slate-900">
                About Us
              </a>
              <a href="#contact" className="text-sm font-medium text-slate-700 hover:text-slate-900">
                Contact
              </a>
              <button className="mt-2 w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                Contact Sales
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Spacer for fixed header (60px row 1 + 50px row 2) */}
      <div className="h-[110px]" />

      {/* Row 3: Slideshow Hero Section (Sits cleanly below fixed header) */}
      <section className="relative w-full">
        {/* Existing slideshow and internal text blocks stay untouched here */}
      </section>
    </>
  );
};
