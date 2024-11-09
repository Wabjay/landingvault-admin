// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientLayout from '@/components/Layout/MainLayout';
import { store } from '@/stores/store';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Landing Vault Admin',
  description: 'Discover the best 790 landing page examples created by top-class SaaS companies and get ideas and inspiration for your next design project',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
