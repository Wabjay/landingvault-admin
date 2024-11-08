// hooks/useSession.ts
import { useState, useEffect } from 'react';

interface Session {
  user: {
    email: string;
  };
}

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate an API call to check the session
    setTimeout(() => {
      // This should be replaced with real session fetching logic
      const storedSession = localStorage.getItem('session');
      if (storedSession) {
        setSession(JSON.parse(storedSession));
      }
      setLoading(false);
    }, 1000);
  }, []);

  return { session, loading };
};
