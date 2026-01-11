import "server-only";

const dictionaries = {
  en: async () => (await import("./en.json")).default,
  pt: async () => (await import("./pt.json")).default,
  "pt-BR": async () => (await import("./pt-BR.json")).default,
};

export type Locale = keyof typeof dictionaries;
export type Translation = Awaited<ReturnType<(typeof dictionaries)[Locale]>>;

export const defaultLocale = "en" as Locale;
export const locales = Object.keys(dictionaries) as Locale[];

export const getTranslation = async (locale: Locale) => {
  if (!dictionaries[locale]) {
    throw new Error(`Locale ${locale} not supported`);
  }

  try {
    return await dictionaries[locale]();
  } catch (error) {
    throw new Error("Translation loading failed");
  }
};
