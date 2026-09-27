'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Search } from 'lucide-react';

export const HeroHeaderSection: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="relative w-full">
      {/* 1. Top Black Announcement Bar - Fixed 60px */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[60px] bg-black text-white flex items-center px-4 md:px-8 border-b border-white/10">
        <div className="mx-auto w-full max-w-7xl flex items-center justify-between text-xs md:text-sm font-medium">
          <span className="hidden sm:inline">📍 Dealio Max • Open Today until 7:00 PM</span>
          <span className="sm:hidden">Open until 7:00 PM</span>
          <div className="flex items-center gap-3 md:gap-4">
            <a href="tel:+59800000000" className="hover:underline">📞 Direct Sales</a>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline text-xs">Premium Inventory</span>
          </div>
        </div>
      </div>

      {/* 2. Top Nav - Sticky, 80px height */}
      <header className="sticky top-[60px] z-40 h-[80px] bg-white border-b border-slate-200/50 flex items-center px-4 md:px-8">
        <div className="mx-auto w-full max-w-7xl flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl md:text-2xl font-bold tracking-tight">
            DEALIO<span className="text-indigo-500">MAX</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#inventory" className="text-sm font-medium text-slate-900 hover:text-indigo-600 transition-colors">
              Inventory
            </a>
            <a href="#services" className="text-sm font-medium text-slate-900 hover:text-indigo-600 transition-colors">
              Services
            </a>
            <a href="#about" className="text-sm font-medium text-slate-900 hover:text-indigo-600 transition-colors">
              About Us
            </a>
            <a href="#contact" className="text-sm font-medium text-slate-900 hover:text-indigo-600 transition-colors">
              Contact
            </a>
          </nav>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center rounded-lg px-3 py-2 bg-slate-100 hover:bg-slate-200 transition-colors">
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-sm w-40 text-slate-900 placeholder:text-slate-600"
              />
              <Search size={16} className="ml-2 text-slate-600" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X size={24} className="text-slate-900" />
            ) : (
              <Menu size={24} className="text-slate-900" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200/50 px-4 py-4">
          <div className="flex flex-col space-y-3">
            <a href="#inventory" className="text-sm font-medium text-slate-900 hover:text-indigo-600">
              Inventory
            </a>
            <a href="#services" className="text-sm font-medium text-slate-900 hover:text-indigo-600">
              Services
            </a>
            <a href="#about" className="text-sm font-medium text-slate-900 hover:text-indigo-600">
              About Us
            </a>
            <a href="#contact" className="text-sm font-medium text-slate-900 hover:text-indigo-600">
              Contact
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
