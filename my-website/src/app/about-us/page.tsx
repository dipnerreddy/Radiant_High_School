// src/app/about-us/page.tsx
import React from 'react';
import AboutHero from '@/components/aboutpage/AboutHero';
import MissionVision from '@/components/aboutpage/MissionVision';
import CoreValues from '@/components/aboutpage/CoreValues';
import HistoryTimeline from '@/components/aboutpage/HistoryTimeline';
import HomeComponent1 from '@/components/homepage/HomeComponent1';

export const metadata = {
  title: 'About Us | Radiant High School',
  description: 'Learn about the mission, vision, values, and history of Radiant High School.',
};

const AboutUsPage = () => {
  return (
    <>
      <HomeComponent1 />
      <AboutHero />
      <MissionVision />
      <CoreValues />
      <HistoryTimeline />
      {/* Add a final CTA or link to admissions/contact if desired later */}
    </>
  );
};

export default AboutUsPage;