// src/app/alumni/page.tsx
import React from 'react';
import AlumniDisplay from '@/components/alumni/AlumniDisplay';

export const metadata = {
  title: 'Alumni Network | Radiant High School',
  description: 'Connect with the alumni network of Radiant High School. Find alumni by their graduation year.',
};

const AlumniPage = () => {
  return (
    <>
      {/* Optional: A small hero/banner */}
      {/* <div className="bg-indigo-600 text-white py-10 text-center">
        <h1 className="text-4xl font-bold">Our Graduates</h1>
        <p className="text-lg mt-2">Celebrating the achievements of our alumni.</p>
      </div> */}
      <AlumniDisplay />
    </>
  );
};

export default AlumniPage;