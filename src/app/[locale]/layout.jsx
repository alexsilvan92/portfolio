import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { IntlProvider } from '@/context/IntlContext';
import '@/styles/globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return {
    title: messages.metadata.title,
    description: messages.metadata.description,
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body>
        <IntlProvider initialLocale={locale} initialMessages={messages}>
          {children}
        </IntlProvider>
      </body>
    </html>
  );
}
