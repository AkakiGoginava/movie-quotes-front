import '@/styles/globals.css';
import '@/src/i18n';

import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider, MovieProvider, NotificationProvider } from '@/state';
import { RouteGuard } from '@/components';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language === 'ka') {
      document.body.classList.add('lang-ge');
    } else {
      document.body.classList.remove('lang-ge');
    }
  }, [i18n.language]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MovieProvider>
          <RouteGuard>
            <NotificationProvider>
              <Component {...pageProps} />
            </NotificationProvider>
          </RouteGuard>
        </MovieProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
