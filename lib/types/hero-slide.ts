export interface HeroSlideConfig {
  id: string;
  imageUrl: string;
  altText?: string;

  // Text Overlay Settings
  showTextBlock: boolean; // Master ON/OFF switch for the text overlay
  headline: string;       // e.g., "Uruguay's Premier Mass Inventory Dealership"
  socialProof: string;    // e.g., "⭐ 4.9/5 Rating • Over 1,200 Vehicles Delivered"
  supportText: string;    // e.g., "Instant financing approval & trade-in valuation on site."

  // CTA Action (optional)
  ctaText?: string;
  ctaLink?: string;
}
