'use client';

import React from 'react';

export const HeroHeaderSection: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      {/* Row 1: Black Stripe (Fixed 60px height) */}
      <div className="w-full h-[60px] bg-black text-white flex items-center px-4 md:px-8 shrink-0">
        <div className="mx-auto w-full max-w-7xl flex items-center justify-between text-xs md:text-sm font-medium">
          <span>📍 Punta del Este Branch • Open Today until 7:00 PM</span>
          <div className="flex items-center gap-4">
            <a href="tel:+59800000000" className="hover:underline">📞 Direct Sales</a>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">Mass Inventory Catalog</span>
          </div>
        </div>
      </div>

      {/* Row 2: Top Nav (Fixed 80px height, matching page background) */}
      <header className="w-full h-[80px] bg-white border-b border-slate-100 flex items-center px-4 md:px-8 shrink-0">
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
          <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
            Contact Sales
          </button>
        </div>
      </header>

      {/* Row 3: Slideshow Hero Section (Placed directly below top nav without overlap) */}
      <section className="relative w-full">
        {/* Your existing slideshow and internal text blocks remain untouched here */}
      </section>
    </div>
  );
};
