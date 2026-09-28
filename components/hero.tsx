"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useSiteSettings, type SiteSettings } from "@/lib/firebase/site-settings";
import { SocialProofBadge } from "@/components/social-proof-badge";
import { LeadQualificationChat } from "@/components/lead-qualification-chat";

export function Hero({ initialSettings }: { initialSettings?: SiteSettings }) {
  const { settings } = useSiteSettings(initialSettings);
  const isVideoMode = settings.heroMode === "video" && Boolean(settings.heroVideoUrl);

  return (
    <section
      id="top"
      className="relative flex w-full items-end bg-background h-[85vh] sm:aspect-auto sm:h-[57vh] sm:min-h-[480px] overflow-hidden aspect-video"
        style={{
          backgroundImage: 'url(/yellow_camaro.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
      {isVideoMode ? (
        <video
          key={settings.heroVideoUrl}
          autoPlay
          muted
          loop
          playsInline
          className="hidden sm:block absolute inset-0 h-full w-full object-cover"
        >
          <source src={settings.heroVideoUrl ?? undefined} />
        </video>
      ) : (
        <Image
          src="/yellow_camaro.jpg"
          alt="Yellow Camaro Hero Background"
          fill
          priority
          sizes="100vw"
          className="hidden sm:block object-cover object-center"
        />
      )}

      <div className="hidden sm:block absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/90 to-transparent" />

      {/* Mobile Logo/Title - Top Center */}
      <div className="sm:hidden absolute inset-x-0 top-0 z-20 flex items-center justify-center pt-4">
        <div className="text-center">
          <div className="text-4xl font-bold tracking-tight">
            <span className="text-white">DEALIO</span>
            <span className="text-primary">MAX</span>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
        className="absolute inset-0 z-10 pt-4 pb-6 sm:py-16 sm:pb-16 sm:bottom-0 flex flex-col justify-end"
      >
        {/* Desktop Layout: Single column on left */}
        <div className="hidden sm:block px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-3 text-left">
            <div className="mb-4">
              <SocialProofBadge rating={4.5} reviewCount={1200} />
            </div>
            <h1 className="font-heading text-2xl font-bold leading-tight text-white sm:text-3xl">
              Excelencia Automotriz. <span className="text-primary">Sin Complicaciones.</span>
            </h1>
            <p className="text-[0.95rem] leading-relaxed text-white/90">
              Una cuidada selección de vehículos que combinan diseño, rendimiento y absoluta tranquilidad para su próximo camino.
            </p>
          </div>
        </div>

        {/* Mobile Layout: Chat Widget Only - Full Width */}
        <div className="block sm:hidden px-3 w-full">
          {/* Lead Chat Widget */}
          <LeadQualificationChat />
        </div>
      </motion.div>

    </section>
  );
}
