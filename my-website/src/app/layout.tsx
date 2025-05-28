// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css'; // If globals.css is in src/app
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Radiant High School',
  description: 'Welcome to Radiant High School',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="flex flex-col min-h-screen">
      <head>
        {/* Standard head elements */}
      </head>
      {/* 
        If you want the #F8F9FA to be the absolute base background,
        you could put bg-[#F8F9FA] on the body.
        However, individual sections within pages might have their own backgrounds
        (e.g., white cards on top of this light gray).
      */}
      <body className={`${inter.className} flex flex-col flex-grow`}> {/* Potentially add bg-[#F8F9FA] here if needed */}
        <Header />
        <main className="flex-grow bg-[#F8F9FA]"> {/* <<< APPLIED BACKGROUND HERE */}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}