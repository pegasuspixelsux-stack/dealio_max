export interface DealershipConfig {
  // Brand Identity (Used in Top Nav & Footer)
  branding: {
    title: string;        // e.g. "DEALIO MAX" or custom dealer name
    subtitle?: string;     // e.g. "Automotive Group"
    logoUrl?: string;
  };

  // Contact & Location Details
  contact: {
    phone: string;        // e.g. "+598 99 123 456"
    whatsapp: string;     // e.g. "59899123456"
    email: string;        // e.g. "ventas@dealio.com"
    location: string;     // e.g. "Punta del Este, Uruguay"
    hours: string;        // e.g. "Mon - Sat: 9:00 AM - 7:00 PM"
  };

  // Hero Section Configuration
  hero: {
    showTextBlock: boolean;
    socialProof: string;
    headline: string;
    supportText: string;
  };
}
