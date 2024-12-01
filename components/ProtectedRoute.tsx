// components/ProtectedRoute.tsx
'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { store } from '@/stores/store';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const {token} =  store()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
  useEffect(() => {
    // Check for the authentication cookie
    // const authToken = document.cookie.split('; ').find(row => row.startsWith('authToken='));
    const authToken = token

    if (authToken) {
      setIsAuthenticated(true);
      // console.log(authToken)
    } else {
      router.push('/login');
    }

    setLoading(false);
  }, [router, token]);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  if (!isAuthenticated) {
    return 
  }

  return <>{children}</>;
};

export default ProtectedRoute;
