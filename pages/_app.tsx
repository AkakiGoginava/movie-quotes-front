import '@/styles/globals.css';
import '@/src/i18n';

import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider, MovieProvider, NotificationProvider } from '@/state';
import { RouteGuard } from '@/components';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
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
