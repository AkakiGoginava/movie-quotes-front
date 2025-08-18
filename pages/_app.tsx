import { RouteGuard } from '@/components';
import { AuthProvider, MovieProvider, NotificationProvider } from '@/state';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MovieProvider>
          <NotificationProvider>
            <RouteGuard>
              <Component {...pageProps} />
            </RouteGuard>
          </NotificationProvider>
        </MovieProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
