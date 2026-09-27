"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HandCoins, LifeBuoy, ShieldCheck, Tag } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

const SHOWROOM_IMAGE = "/showroom.jpg";

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Curación Rigurosa",
    description:
      "Unidades revisadas minuciosamente para garantizar un desempeño óptimo.",
  },
  {
    icon: HandCoins,
    title: "Transparencia Absoluta",
    description:
      "Asesoramiento honesto y claro en cada etapa del proceso.",
  },
  {
    icon: Tag,
    title: "Respaldo y Trayectoria",
    description:
      "Acompañamiento profesional antes, durante y después de su compra.",
  },
  {
    icon: LifeBuoy,
    title: "Permutas Instantáneos",
    description:
      "Tasación inmediata de su vehículo actual, aplicado directamente a su compra.",
  },
];

export function WhyChooseUs() {
  return (
    <section id="about" className="bg-surface-2 px-3 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto sm:max-w-[1440px]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Column: Text + 2x2 Grid of Pillars */}
          <div className="flex flex-col gap-6">
            {/* Top: Text */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col justify-center gap-6"
            >
              <motion.p variants={fadeUp} className="text-[0.9rem] font-medium text-muted">
                Nosotros
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-balance font-heading text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl"
              >
                Por Qué Elegir <span className="text-primary">Rodolfo Etchevarría</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="max-w-lg text-[0.98rem] leading-relaxed text-foreground/80">
                Más que una transacción, construimos una relación de confianza duradera. Cada vehículo en nuestro salón es seleccionado bajo los más estrictos estándares de calidad, estética y funcionamiento.
              </motion.p>
              <motion.p variants={fadeUp} className="max-w-lg text-[0.98rem] leading-relaxed text-foreground/80">
                Desde la primera consulta hasta el mantenimiento posterior, nuestro equipo de especialistas le acompaña en cada paso. Nos comprometemos a encontrar el vehículo perfecto con términos que se adapten a sus necesidades.
              </motion.p>
            </motion.div>

            {/* Bottom: 2x2 Grid of Pillars */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              {PILLARS.map(({ icon: Icon, title, description }) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  className="group relative flex flex-col gap-3 overflow-hidden rounded-[12px] border border-border bg-surface/60 p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-border-strong hover:bg-surface"
                >
                  <div className="flex items-start gap-3.5">
                    <span className="glass relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] text-primary">
                      <Icon size={18} />
                    </span>
                    <div className="relative flex flex-col gap-1">
                      <h3 className="font-heading text-[0.95rem] font-normal text-foreground">
                        {title}
                      </h3>
                      <p className="text-[0.8rem] leading-relaxed text-muted">
                        {description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Showroom Image Only */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="hidden md:block relative aspect-square overflow-hidden rounded-[12px]"
          >
            <Image
              src={SHOWROOM_IMAGE}
              alt="Rodolfo Etchevarria Showroom"
              fill
              sizes="(min-width: 1024px) 400px, 100vw"
              quality={85}
              className="object-cover object-center"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
