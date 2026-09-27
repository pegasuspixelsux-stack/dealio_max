"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

interface SocialProofBadgeProps {
  rating?: number;
  reviewCount?: number;
  className?: string;
  simplified?: boolean;
}

export function SocialProofBadge({
  rating = 4.5,
  reviewCount = 1200,
  className = "",
  simplified = false,
}: SocialProofBadgeProps) {
  if (simplified) {
    return (
      <motion.div
        variants={fadeUp}
        className={`inline-flex items-center gap-2 ${className}`}
      >
        {/* Star Rating Only */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={`${
                i < Math.floor(rating)
                  ? "fill-amber-400 text-amber-400"
                  : "text-amber-400/40"
              }`}
            />
          ))}
          <span className="ml-1 text-[0.8rem] font-medium text-white">
            {rating}
          </span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={fadeUp}
      className={`inline-flex items-center gap-3 ${className}`}
    >
      {/* Google Logo Text */}
      <span className="flex items-center gap-1">
        <span className="text-[0.85rem] font-medium text-white">Google</span>
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
                : "text-white/40"
            }`}
          />
        ))}
        <span className="ml-1 text-[0.8rem] font-medium text-white">
          {rating}
        </span>
      </div>

      {/* Review Count */}
      <span className="text-[0.8rem] text-white">
        ({reviewCount.toLocaleString()} reseñas)
      </span>
    </motion.div>
  );
}
