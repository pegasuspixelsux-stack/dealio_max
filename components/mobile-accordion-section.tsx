"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface MobileAccordionSectionProps {
  title: string;
  children: ReactNode;
}

export function MobileAccordionSection({ title, children }: MobileAccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Header - Hidden on md+ */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between gap-3 bg-foreground px-4 py-3 text-accent-foreground font-medium transition-colors hover:bg-foreground/90"
        >
          <span className="text-[0.95rem]">{title}</span>
          <ChevronDown
            size={20}
            className={`flex-shrink-0 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isOpen && <div>{children}</div>}
      </div>

      {/* Desktop Content - Hidden on mobile */}
      <div className="hidden md:block">{children}</div>
    </>
  );
}
