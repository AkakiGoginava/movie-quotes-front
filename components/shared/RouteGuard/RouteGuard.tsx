import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';

import { useAuth } from '@/hooks';

type RouteGuardProps = {
  children: React.ReactNode;
};

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const { user, isLoading, isVerified } = useAuth();

  const [authorized, setAuthorized] = useState(false);

  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (isLoading) return;

    setAuthorized(false);

    const protectedRoutes = ['/profile', '/news', '/movies'];
    const publicRoutes = ['/'];

    const isProtectedRoute = protectedRoutes.some(
      (route) => pathName === route || pathName.startsWith(`${route}/`),
    );

    if (isProtectedRoute) {
      if (user && isVerified) {
        setAuthorized(true);
      } else {
        router.push('/');
      }
    } else if (publicRoutes.includes(pathName)) {
      if (user && isVerified) {
        router.push('/news');
      } else {
        setAuthorized(true);
      }
    } else {
      setAuthorized(true);
    }
  }, [user, isLoading, isVerified, pathName, router]);

  if (isLoading || !authorized) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default RouteGuard;
