'use client';

import React from 'react';

export const HeroHeaderSection: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      {/* Sticky Header Wrapper: Keeps Row 1 & Row 2 pinned together at top = 0 */}
      <div className="sticky top-0 z-50 w-full flex flex-col shrink-0">

        {/* Row 1: Top Black Stripe (60px) */}
        <div className="w-full h-[60px] bg-black text-white flex items-center px-4 md:px-8 border-b border-white/10">
          <div className="mx-auto w-full max-w-7xl flex items-center justify-between text-xs md:text-sm font-medium">
            <span>📍 Punta del Este Branch • Open Today until 7:00 PM</span>
            <div className="flex items-center gap-4">
              <a href="tel:+59800000000" className="hover:underline">📞 Direct Sales</a>
              <span className="hidden md:inline">|</span>
              <span className="hidden md:inline">Mass Inventory Catalog</span>
            </div>
          </div>
        </div>

        {/* Row 2: Top Nav (80px, matching page background) */}
        <header className="w-full h-[80px] bg-white border-b border-slate-100 flex items-center px-4 md:px-8 shadow-sm">
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
      </div>

      {/* Row 3: Slideshow Hero Section (Placed directly below header, scrolls behind sticky header) */}
      <section className="relative w-full">
        {/* Your existing slideshow and internal text blocks remain untouched here */}
      </section>
    </div>
  );
};
