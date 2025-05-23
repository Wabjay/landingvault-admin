// components/ClientLayout.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import SideBar from '@/components/SideBar';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isUnprotectedRoute, setIsUnprotectedRoute] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const unprotectedRoutes = ['/login'];
    setIsUnprotectedRoute(unprotectedRoutes.includes(pathname));
    console.log(pathname)
  }, [pathname]);

  return (
    <div className="bg-[#F0F2FA]">
      {isUnprotectedRoute ? (
        children
      ) : (
        <ProtectedRoute>
          <div className="grid grid-cols-auto text-left">
            <SideBar />
            <div>
              <Navbar />
              {children}
            </div>
          </div>
        </ProtectedRoute>
      )}
      {/* <Footer /> */}
    </div>
  );
}
