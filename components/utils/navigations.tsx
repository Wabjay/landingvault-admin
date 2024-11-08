// useNavigation.ts

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

// Custom hook for navigation
export const useNavigation = () => {
  const router = useRouter();

  // Function to navigate to a specified path
  const navigateTo = useCallback((path: string) => {
    router.push(path);
  }, [router]);

  // Function to go back to the previous page
  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  return {
    navigateTo,
    goBack,
  };
};