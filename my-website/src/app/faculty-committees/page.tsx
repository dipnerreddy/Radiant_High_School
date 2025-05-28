// src/app/faculty-committees/page.tsx
import React from 'react';
import FacultyGrid from '@/components/faculty/FacultyGrid';
import CommitteesSection from '@/components/faculty/CommitteesSection';

export const metadata = {
  title: 'Faculty & Committees | Radiant High School',
  description: 'Meet the dedicated faculty and learn about the school committees at Radiant High School.',
};

const FacultyCommitteesPage = () => {
  return (
    <>
      {/* Optional: A small hero/banner for this page if desired */}
      {/* <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 text-center">
        <h1 className="text-4xl font-bold">Our Dedicated Team</h1>
        <p className="text-lg mt-2">Meet the educators and committees shaping the future at Radiant High.</p>
      </div> */}
      
      <FacultyGrid />
      <CommitteesSection />
    </>
  );
};

export default FacultyCommitteesPage;