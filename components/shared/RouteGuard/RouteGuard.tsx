import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '@/hooks';
import { usePathname } from 'next/navigation';

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

    const protectedRoutes = ['/profile', '/news', '/movies'];
    const publicRoutes = ['/'];

    if (protectedRoutes.includes(pathName)) {
      if (user && isVerified) {
        setAuthorized(true);
      } else {
        router.push('/');
      }
    } else if (publicRoutes.includes(pathName)) {
      if (user) {
        router.push('/news');
      } else {
        setAuthorized(true);
      }
    } else {
      setAuthorized(true);
    }
  }, [user, isLoading, isVerified, pathName, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return authorized ? <>{children}</> : null;
};

export default RouteGuard;
