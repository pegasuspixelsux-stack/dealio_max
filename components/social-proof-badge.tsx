"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

interface SocialProofBadgeProps {
  rating?: number;
  reviewCount?: number;
  className?: string;
}

export function SocialProofBadge({
  rating = 4.5,
  reviewCount = 1200,
  className = "",
}: SocialProofBadgeProps) {
  return (
    <motion.div
      variants={fadeUp}
      className={`inline-flex items-center gap-3 rounded-lg border border-border bg-surface/40 px-4 py-2.5 backdrop-blur-sm ${className}`}
    >
      {/* Google Logo Text */}
      <span className="flex items-center gap-1">
        <span className="text-[0.85rem] font-medium text-muted">Google</span>
      </span>

      {/* Star Rating */}
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={`${
              i < Math.floor(rating)
                ? "fill-amber-400 text-amber-400"
                : "text-muted-2"
            }`}
          />
        ))}
        <span className="ml-1 text-[0.8rem] font-medium text-foreground">
          {rating}
        </span>
      </div>

      {/* Review Count */}
      <span className="text-[0.8rem] text-muted">
        ({reviewCount.toLocaleString()} reseñas)
      </span>
    </motion.div>
  );
}
