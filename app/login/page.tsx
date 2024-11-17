// app/login/page.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';
import { store } from '@/stores/store';
import { autoLogout } from '@/lib/logout';
import { useNavigation } from '@/components/utils/navigations';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setToken } = store();
  const { logOut } = autoLogout();
  const { navigateTo } = useNavigation();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/auths/admin/login', { email, password });
      const token = response.data?.access_token;

      if (!token) {
        throw new Error('Token not found');
      }

      setToken(token);
      console.log('Login successful', token);

      // auto logout
      logOut(navigateTo);
      router.push('/');
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-white fixed top-0 left-0 z-20">
      <form onSubmit={handleSubmit} className="w-11/12 max-w-md flex flex-col gap-6 p-6 rounded-lg bg-white border border-gray-300">
        <p className="text-center text-lg font-bold tablet:text-xl">
          Login to Landingvault Admin Dashboard
        </p>

        <div className="text-left flex flex-col">
          <label htmlFor="email" className="text-sm font-medium mb-2">
            Email address
          </label>
          <input
            type="text"
            id="email"
            placeholder="Enter your email address"
            className={`bg-white mb-4 border h-12 px-4 ${error ? 'border-red-500' : 'border-gray-400'}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="text-left flex flex-col">
          <label htmlFor="password" className="text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            className={`bg-white mb-4 border h-12 px-4 ${error ? 'border-red-500' : 'border-gray-400'}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-red text-xs mt-[-8px]">
            Check your email or password
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded shadow disabled:opacity-50"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
