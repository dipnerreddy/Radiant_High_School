// src/pages/_app.tsx
import '@/styles/globals.css'; // Or '../styles/globals.css'
import type { AppProps } from 'next/app';
import Header from '@/components/header/Header'; // Adjust path if needed

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      {/* You might also want a Footer component here later */}
    </>
  );
}

export default MyApp;