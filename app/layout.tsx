import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';

export const metadata: Metadata = {
  title: 'Uttarakhand Heritage Explorer',
  description: 'An AI-powered historical tourism platform for Uttarakhand heritage discovery, crowd prediction, and trip planning.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
