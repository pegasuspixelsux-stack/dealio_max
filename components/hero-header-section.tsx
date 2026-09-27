'use client';

import React from 'react';

export const HeroHeaderSection: React.FC = () => {
  return (
    <>
      {/* Fixed Top Header Container (Fixed Row 1 + Row 2) */}
      <div className="fixed top-0 left-0 right-0 z-[9999] w-full">
        {/* Row 1: Top Black Stripe (40px high) */}
        <div className="h-[40px] w-full bg-black text-white flex items-center px-4 md:px-8">
          <div className="mx-auto w-full max-w-7xl flex items-center justify-between text-xs font-medium">
            <span>📍 Punta del Este Branch • Open Today until 7:00 PM</span>
            <div className="flex items-center gap-4">
              <a href="tel:+59800000000" className="hover:underline">📞 Direct Sales</a>
              <span className="hidden md:inline">|</span>
              <span className="hidden md:inline">Mass Inventory Catalog</span>
            </div>
          </div>
        </div>

        {/* Row 2: Top Nav (60px high, background-matched) */}
        <header className="h-[60px] w-full bg-white border-b border-slate-100 flex items-center px-4 md:px-8">
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

      {/* Spacer for fixed header (100px = 40px stripe + 60px nav) */}
      <div className="h-[100px]" />

      {/* Row 3: Slideshow Hero Section (Sits cleanly below fixed header) */}
      <section className="relative w-full">
        {/* Existing slideshow and internal text blocks stay untouched here */}
      </section>
    </>
  );
};
