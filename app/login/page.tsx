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
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setToken } = store();
  const { logOut } = autoLogout();
  const { navigateTo } = useNavigation();

  const validateInputs = (): boolean => {
    if (!email.trim()) {
      setError('Email is required.');
      return false;
    }
    if (!password.trim()) {
      setError('Password is required.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!validateInputs()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('/auths/admin/login', { email, password });
      const token = response.data?.access_token;

      if (!token) {
        throw new Error('Token not found in the response.');
      }

      setToken(token);
      console.log('Login successful:', token);

      logOut(navigateTo);
      router.push('/');
    } catch (err: any) {
      console.error('Login error:', err);

      if (err.response?.status === 401) {
        setError('Invalid email or password.');
      } else if (err.response?.status === 500) {
        setError('Server error. Please try again later.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-white fixed top-0 left-0 z-20">
      <form
        onSubmit={handleSubmit}
        className="w-11/12 max-w-md flex flex-col gap-6 p-6 rounded-lg bg-white border border-gray-300 shadow-md"
        noValidate
      >
        <p className="text-center text-lg font-bold tablet:text-xl">
          Login to Landingvault Admin Dashboard
        </p>

        <div className="text-left flex flex-col">
          <label htmlFor="email" className="text-sm font-medium mb-2">
            Email address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email address"
            className={`bg-white border h-12 px-4 ${error ? 'border-red-500' : 'border-gray-400'}`}
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            aria-invalid={!!error}
            aria-describedby="email-error"
          />
        </div>

        <div className="text-left flex flex-col">
          <label htmlFor="password" className="text-sm font-medium mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              id="password"
              placeholder="Enter your password"
              className={`bg-white mb-2 border h-12 px-4 w-full ${error ? 'border-red-500' : 'border-gray-400'}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={!!error}
              aria-describedby="password-error"
            />
       
          </div>
          <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="w-fit mx-auto flex items-center text-gray-500 hover:text-gray-700 underline"
              aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            >
              {isPasswordVisible ? 'Hide Password' : 'Show Password'}
            </button>
        </div>

        {error && (
          <p
            id="error-message"
            className="text-red-600 text-xs mt-[-8px]"
            role="alert"
            aria-live="assertive"
          >
            {error}
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
