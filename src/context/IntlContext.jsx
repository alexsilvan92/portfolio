'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { NextIntlClientProvider } from 'next-intl';

const IntlContext = createContext(null);

export function useIntlContext() {
  const context = useContext(IntlContext);
  if (!context)
    throw new Error('useIntlContext debe usarse dentro de IntlProvider');
  return context;
}

export function IntlProvider({ initialLocale, initialMessages, children }) {
  const [locale, setLocale] = useState(initialLocale);
  const [messages, setMessages] = useState(initialMessages);

  // Cargar mensajes del nuevo idioma sin cambiar la URL
  const changeLocale = useCallback(async (newLocale) => {
    try {
      const newMessages = (await import(`../../messages/${newLocale}.json`))
        .default;
      setMessages(newMessages);
      setLocale(newLocale);
      localStorage.setItem('portfolio-locale', newLocale);
      document.documentElement.lang = newLocale;
    } catch (error) {
      console.error('Error cargando mensajes:', error);
    }
  }, []);

  return (
    <IntlContext.Provider value={{ locale, changeLocale }}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </IntlContext.Provider>
  );
}
