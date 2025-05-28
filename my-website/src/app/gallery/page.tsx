// src/app/gallery/page.tsx
import React from 'react';
import ImageGrid from '@/components/gallery/ImageGrid';

export const metadata = {
  title: 'Gallery | Radiant High School',
  description: 'Explore moments and memories from Radiant High School events and activities.',
};

const GalleryPage = () => {
  return (
    <>
      {/* Optional: A small hero/banner for this page */}
      {/* <div className="bg-purple-600 text-white py-10 text-center">
        <h1 className="text-4xl font-bold">Moments & Memories</h1>
        <p className="text-lg mt-2">A glimpse into life at Radiant High.</p>
      </div> */}
      <ImageGrid />
    </>
  );
};


export default GalleryPage;