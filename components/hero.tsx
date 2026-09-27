"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { useSiteSettings, type SiteSettings } from "@/lib/firebase/site-settings";
import { SocialProofBadge } from "@/components/social-proof-badge";

const SLIDE_INTERVAL = 6000;

export function Hero({ initialSettings }: { initialSettings?: SiteSettings }) {
  const [slide, setSlide] = useState(0);
  const { settings } = useSiteSettings(initialSettings);
  const isVideoMode = settings.heroMode === "video" && Boolean(settings.heroVideoUrl);
  const slides = settings.heroSlideshowImages.map((src, index) => ({
    src,
    alt: `Foto ${index + 1} del carrusel principal`,
  }));
  const hasSlides = slides.length > 0;
  const activeSlide = hasSlides ? slide % slides.length : 0;

  useEffect(() => {
    if (isVideoMode || !hasSlides) return;
    const id = setInterval(() => {
      setSlide((current) => (current + 1) % slides.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [isVideoMode, hasSlides, slides.length]);

  const mobileAspectClass = settings.mobileAspectRatio === "1/1" ? "aspect-square" : "aspect-video";

  return (
    <section
      id="top"
      className={`relative flex mx-auto sm:max-w-[1440px] items-end overflow-hidden bg-background rounded-[16px] px-3 sm:px-6 lg:px-8 sm:aspect-auto sm:h-[67.5vh] sm:min-h-[480px] ${mobileAspectClass}`}
    >
      {isVideoMode ? (
        <video
          key={settings.heroVideoUrl}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={settings.heroVideoUrl ?? undefined} />
        </video>
      ) : (
        hasSlides && (
          <AnimatePresence initial={false}>
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={slides[activeSlide].src}
                alt={slides[activeSlide].alt}
                fill
                priority={activeSlide === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>
        )
      )}

      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
        className="absolute inset-x-0 bottom-0 z-10 px-4 pb-6 sm:px-8 sm:pb-16"
      >
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 text-left">
          {/* Desktop Layout: Single column on left */}
          <div className="hidden sm:block w-1/2">
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

          {/* Mobile Layout: 2-column grid */}
          <div className="block sm:hidden">
            <div className="grid grid-cols-2 gap-4 items-center">
              <div className="flex flex-col gap-2">
                <div className="mb-1">
                  <SocialProofBadge rating={4.5} simplified />
                </div>
                <h1 className="font-heading text-xl font-bold leading-tight text-white">
                  Excelencia<br />Automotriz.
                </h1>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[0.85rem] leading-relaxed text-white/90">
                  Una cuidada selección de vehículos que combinan diseño, rendimiento y absoluta tranquilidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {!isVideoMode && hasSlides && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="absolute right-[-4px] top-1/2 z-10 flex -translate-y-1/2 flex-row gap-2 rotate-90 sm:right-[-4px]"
        >
          {slides.map((item, index) => (
            <button
              key={item.src}
              type="button"
              aria-label={`Mostrar diapositiva ${index + 1}`}
              onClick={() => setSlide(index)}
              className={`h-1.5 rounded-none transition-all duration-300 ${
                index === activeSlide
                  ? "w-6 bg-foreground"
                  : "w-1.5 bg-foreground/40 hover:bg-foreground/70"
              }`}
            />
          ))}
        </motion.div>
      )}
    </section>
  );
}
