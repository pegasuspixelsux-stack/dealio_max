import { Hero } from "@/components/hero";
import { WhyChooseUs } from "@/components/why-choose-us";
import { FinanceTabs } from "@/components/finance-tabs";
import { ContactSection } from "@/components/contact-section";
import { CarGrid } from "@/components/car-grid";
import { TestimonialsSection } from "@/components/testimonials-section";
import { PreFooterHero } from "@/components/pre-footer-hero";
import { Footer } from "@/components/footer";
import { MobileAccordionSection } from "@/components/mobile-accordion-section";
import { AboutSection } from "@/components/about-section";
import { getInventoryOnce } from "@/lib/firebase/inventory-read";
import { getSiteSettingsOnce, DEFAULT_SITE_SETTINGS } from "@/lib/firebase/site-settings";
import type { InventoryItem } from "@/lib/dashboard-data";

export default async function Home() {
  let initialCars: InventoryItem[] | undefined;
  try {
    initialCars = await getInventoryOnce();
  } catch {
    // Firestore may be unreachable or rules not yet published at build/render
    // time — leave initialCars undefined (rather than []) so useInventory()
    // knows this isn't "zero items", starts in a loading state, and shows a
    // skeleton instead of a blank grid while its client-side subscription
    // fetches the real data.
  }

  let initialSiteSettings = DEFAULT_SITE_SETTINGS;
  try {
    initialSiteSettings = await getSiteSettingsOnce();
  } catch {
    // Same fallback reasoning as above — the client-side subscription in
    // useSiteSettings() picks up the real value at runtime.
  }

  return (
    <>
      <main className="flex-1">
        <Hero initialSettings={initialSiteSettings} />

        <div className="pt-0 md:pt-4">
          <CarGrid initialCars={initialCars} initialSettings={initialSiteSettings} />
        </div>

        <AboutSection />

        <MobileAccordionSection title="About Our Dealership">
          <WhyChooseUs />
        </MobileAccordionSection>

        <MobileAccordionSection title="Customer Reviews">
          <TestimonialsSection />
        </MobileAccordionSection>

        <MobileAccordionSection title="Financing Solutions">
          <FinanceTabs />
        </MobileAccordionSection>

        <MobileAccordionSection title="Contact Us">
          <ContactSection initialSettings={initialSiteSettings} />
        </MobileAccordionSection>

        <MobileAccordionSection title="Visit Our Showroom">
          <PreFooterHero />
        </MobileAccordionSection>
      </main>
      <Footer />
    </>
  );
}
