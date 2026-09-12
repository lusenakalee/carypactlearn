"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { NextIntlClientProvider } from "next-intl";
import { SupportedLocale, SUPPORTED_LOCALES, DEFAULT_LOCALE, getMessages } from "@/lib/i18n";

interface LocaleContextType {
  locale: SupportedLocale;
  setLocale: (newLocale: string) => void;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
});

export const useAppLocale = () => useContext(LocaleContext);

export default function LocaleProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
}: {
  children: React.ReactNode;
  initialLocale?: SupportedLocale;
}) {
  const [locale, setLocaleState] = useState<SupportedLocale>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("carypact_hub_lang");
        if (saved && SUPPORTED_LOCALES.includes(saved as SupportedLocale)) {
          return saved as SupportedLocale;
        }
      } catch {
        // Storage access unavailable
      }
    }
    return initialLocale;
  });

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = (newLocale: string) => {
    if (SUPPORTED_LOCALES.includes(newLocale as SupportedLocale)) {
      const validLocale = newLocale as SupportedLocale;
      setLocaleState(validLocale);
      try {
        localStorage.setItem("carypact_hub_lang", validLocale);
        if (typeof document !== "undefined") {
          document.documentElement.lang = validLocale;
        }
      } catch {
        // Storage access blocked
      }
    }
  };

  const messages = getMessages(locale);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <NextIntlClientProvider locale={locale} messages={messages} timeZone="UTC">
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
}
