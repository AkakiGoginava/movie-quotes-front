import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '@/hooks';

type RouteGuardProps = {
  children: React.ReactNode;
};

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const { user, isLoading, isVerified } = useAuth();
  const router = useRouter();

  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    const protectedRoutes = ['/profile'];

    const path = router.asPath.split('?')[0];

    if (protectedRoutes.includes(path)) {
      if (user && isVerified) {
        setAuthorized(true);
      } else {
        router.push('/');
      }
    } else {
      setAuthorized(true);
    }
  }, [user, isLoading, isVerified, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return authorized ? <>{children}</> : null;
};

export default RouteGuard;
