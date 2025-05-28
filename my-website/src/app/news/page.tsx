// src/app/news/page.tsx
import React from 'react';
import NewsList from '@/components/news/NewsList';

export const metadata = {
  title: 'News & Updates | Radiant High School',
  description: 'Stay updated with the latest news, announcements, and articles from Radiant High School.',
};

const NewsPage = () => {
  return (
    <>
      {/* Optional: A small hero/banner */}
      {/* <div className="bg-teal-600 text-white py-10 text-center">
        <h1 className="text-4xl font-bold">School Bulletin</h1>
        <p className="text-lg mt-2">The latest happenings at Radiant High.</p>
      </div> */}
      <NewsList />
    </>
  );
};

export default NewsPage;