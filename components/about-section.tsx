'use client';

import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-12 md:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left Column */}
        <div className="flex flex-col space-y-4">
          {/* Text Block */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Sobre Nosotros
            </h2>
            <p className="text-slate-600">
              Una cuidada selección de vehículos que combinan diseño, rendimiento y absoluta tranquilidad para su próximo camino.
            </p>
          </div>
        </div>

        {/* Right Column (Images / Secondary Content + Feature Boxes) */}
        <div className="flex flex-col gap-6">
          {/* Top Content / Media Placeholder */}
          <div className="flex items-center justify-center rounded-xl bg-slate-100 p-8 lg:h-[200px]">
            <div className="text-center text-slate-500">
              <p className="text-sm">Images or additional content here</p>
            </div>
          </div>

          {/* Four Horizontal Boxes in 2x2 Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Box 1 */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h4 className="font-semibold text-slate-900">Premium Selection</h4>
              <p className="mt-1 text-sm text-slate-600">Curated inventory of luxury vehicles.</p>
            </div>

            {/* Box 2 */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h4 className="font-semibold text-slate-900">Expert Service</h4>
              <p className="mt-1 text-sm text-slate-600">Professional team dedicated to excellence.</p>
            </div>

            {/* Box 3 */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h4 className="font-semibold text-slate-900">Trust & Quality</h4>
              <p className="mt-1 text-sm text-slate-600">Transparent pricing and honest dealings.</p>
            </div>

            {/* Box 4 */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h4 className="font-semibold text-slate-900">Fast Delivery</h4>
              <p className="mt-1 text-sm text-slate-600">Quick processing and delivery options.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
