// src/app/activities/page.tsx
import React from 'react';
import UpcomingActivities from '@/components/activities/UpcomingActivities';
import PastActivitiesGrid from '@/components/activities/PastActivitiesGrid';
import AnnualReportSection from '@/components/activities/AnnualReportSection';

export const metadata = {
  title: 'Activities & Events | Radiant High School',
  description: 'Explore upcoming and past activities, events, and the annual report of Radiant High School.',
};

const ActivitiesPage = () => {
  return (
    <>
      {/* Optional: A small hero/banner for this page */}
      {/* <div className="bg-green-600 text-white py-10 text-center">
        <h1 className="text-4xl font-bold">Engage & Explore</h1>
        <p className="text-lg mt-2">Discover the vibrant life at Radiant High through our diverse activities.</p>
      </div> */}

      <UpcomingActivities />
      <PastActivitiesGrid />
      <AnnualReportSection />
    </>
  );
};

export default ActivitiesPage;