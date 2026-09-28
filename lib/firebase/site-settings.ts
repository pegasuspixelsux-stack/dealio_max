"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase/db";
import {
  COLOR_THEME_PRESETS,
  DEFAULT_COLOR_THEME,
  DEFAULT_SECONDARY_COLOR,
  isColorThemeName,
  isColorThemeTextMode,
  type ColorThemeName,
  type ColorThemeTextMode,
} from "@/lib/color-themes";

const COLLECTION = "settings";
const DOC_ID = "site";

export type HeroMode = "slideshow" | "video";
export type MobileAspectRatio = "16/9" | "1/1";

export interface ChatQuestion {
  id: string;
  step: number;
  question: string;
  placeholder?: string;
}

export interface ChatOptions {
  step: number;
  options: string[];
}

export interface SiteSettings {
  heroMode: HeroMode;
  heroVideoUrl: string | null;
  heroSlideshowImages: string[];
  mobileAspectRatio: MobileAspectRatio;
  gridHeading: string;
  gridSupportText: string;
  dealerLocation: string;
  dealerAddress: string;
  dealerHours: string;
  dealerPhone: string;
  dealerEmail: string;
  dealerWhatsapp: string;
  colorTheme: ColorThemeName;
  colorThemeColor: string;
  colorThemeTextMode: ColorThemeTextMode;
  secondaryColor: string;
  chatQuestions: ChatQuestion[];
  chatOptions: ChatOptions[];
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  heroMode: "slideshow",
  heroVideoUrl: null,
  heroSlideshowImages: [],
  mobileAspectRatio: "16/9",
  gridHeading: "Selección Premium",
  gridSupportText:
    "Vehículos seleccionados a mano, cada uno inspeccionado y certificado antes de llegar a ti.",
  dealerLocation: "Punta del Este",
  dealerAddress: "Av. Roosevelt y Parada 8, Punta del Este, Uruguay",
  dealerHours: "Lun – Sáb, 9 a 19 hs",
  dealerPhone: "(415) 555-0148",
  dealerEmail: "contacto@dealio.com",
  dealerWhatsapp: "+1 (415) 555-0148",
  colorTheme: DEFAULT_COLOR_THEME,
  colorThemeColor: COLOR_THEME_PRESETS[DEFAULT_COLOR_THEME].color,
  colorThemeTextMode: "auto",
  secondaryColor: DEFAULT_SECONDARY_COLOR,
  chatQuestions: [
    { id: "q1", step: 0, question: "¡Hola! Bienvenido a Dealio Max 🚗. ¿Cómo te llamas?", placeholder: "Tu nombre..." },
    { id: "q2", step: 1, question: "¿Qué tipo de vehículo estás buscando?" },
    { id: "q3", step: 2, question: "¡Excelente elección! ¿Cuál es tu presupuesto estimado?" },
    { id: "q4", step: 3, question: "¿Estás listo para comprar ahora o necesitas financiamiento?" },
    { id: "q5", step: 4, question: "¿Cómo prefieres continuar?" },
  ],
  chatOptions: [
    { step: 1, options: ["Sedán", "Cupé", "SUV", "Pick-up"] },
    { step: 2, options: ["USD 0 - 5.000", "USD 5.000 - 10.000", "Más de USD 10.000", "Prefiero no decirlo"] },
    { step: 3, options: ["Pago contado (Listo para comprar)", "Necesito financiamiento", "Prefiero no decirlo"] },
    { step: 4, options: ["Ver inventario filtrado ahora", "Que un asesor me contacte"] },
  ],
};

const HEX_PATTERN = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

function isMobileAspectRatio(value: unknown): value is MobileAspectRatio {
  return value === "16/9" || value === "1/1";
}

const STRING_FIELDS = [
  "gridHeading",
  "gridSupportText",
  "dealerLocation",
  "dealerAddress",
  "dealerHours",
  "dealerPhone",
  "dealerEmail",
  "dealerWhatsapp",
] as const satisfies readonly (keyof SiteSettings)[];

function toSiteSettings(data: Record<string, unknown> | undefined): SiteSettings {
  if (!data) return DEFAULT_SITE_SETTINGS;
  const result = {
    heroMode: data.heroMode === "video" ? "video" : "slideshow",
    heroVideoUrl: typeof data.heroVideoUrl === "string" ? data.heroVideoUrl : null,
    heroSlideshowImages: Array.isArray(data.heroSlideshowImages)
      ? data.heroSlideshowImages.filter((url): url is string => typeof url === "string")
      : [],
    mobileAspectRatio: isMobileAspectRatio(data.mobileAspectRatio) ? data.mobileAspectRatio : "16/9",
  } as SiteSettings;
  for (const field of STRING_FIELDS) {
    const value = data[field];
    result[field] = typeof value === "string" && value.trim() ? value : DEFAULT_SITE_SETTINGS[field];
  }

  const colorTheme = isColorThemeName(data.colorTheme) ? data.colorTheme : DEFAULT_SITE_SETTINGS.colorTheme;
  result.colorTheme = colorTheme;
  const colorThemeColor = data.colorThemeColor;
  result.colorThemeColor =
    typeof colorThemeColor === "string" && HEX_PATTERN.test(colorThemeColor.trim())
      ? colorThemeColor.trim()
      : COLOR_THEME_PRESETS[colorTheme].color;

  result.colorThemeTextMode = isColorThemeTextMode(data.colorThemeTextMode)
    ? data.colorThemeTextMode
    : DEFAULT_SITE_SETTINGS.colorThemeTextMode;

  const secondaryColor = data.secondaryColor;
  result.secondaryColor =
    typeof secondaryColor === "string" && HEX_PATTERN.test(secondaryColor.trim())
      ? secondaryColor.trim()
      : DEFAULT_SITE_SETTINGS.secondaryColor;

  result.chatQuestions = Array.isArray(data.chatQuestions)
    ? data.chatQuestions.filter(
        (q): q is ChatQuestion =>
          typeof q === "object" &&
          q !== null &&
          typeof q.id === "string" &&
          typeof q.step === "number" &&
          typeof q.question === "string"
      )
    : DEFAULT_SITE_SETTINGS.chatQuestions;

  result.chatOptions = Array.isArray(data.chatOptions)
    ? data.chatOptions.filter(
        (o): o is ChatOptions =>
          typeof o === "object" &&
          o !== null &&
          typeof o.step === "number" &&
          Array.isArray(o.options) &&
          o.options.every((opt): opt is string => typeof opt === "string")
      )
    : DEFAULT_SITE_SETTINGS.chatOptions;

  return result;
}

export async function getSiteSettingsOnce(): Promise<SiteSettings> {
  const db = getFirebaseDb();
  const snapshot = await getDoc(doc(db, COLLECTION, DOC_ID));
  return toSiteSettings(snapshot.data());
}

export async function updateSiteSettings(patch: Partial<SiteSettings>): Promise<void> {
  const db = getFirebaseDb();
  await setDoc(doc(db, COLLECTION, DOC_ID), patch, { merge: true });
}

export function useSiteSettings(initialSettings?: SiteSettings) {
  const [settings, setSettings] = useState<SiteSettings>(
    initialSettings ?? DEFAULT_SITE_SETTINGS,
  );
  const [loading, setLoading] = useState(initialSettings === undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const db = getFirebaseDb();
    const unsubscribe = onSnapshot(
      doc(db, COLLECTION, DOC_ID),
      (snapshot) => {
        setSettings(toSiteSettings(snapshot.data()));
        setLoading(false);
        setError(null);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
    );
    return unsubscribe;
  }, []);

  return { settings, loading, error };
}
