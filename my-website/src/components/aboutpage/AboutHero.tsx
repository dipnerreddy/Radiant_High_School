// src/components/aboutpage/AboutHero.tsx
import React from 'react';
import Image from 'next/image';

const AboutHero = () => {
  // const heroImageUrl = "https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80";

  return (
    // Ensure the main hero container itself doesn't unintentionally get a high z-index
    // by default. Giving it a specific, lower z-index can help.
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] z-0"> {/* ADDED z-0 or z-1 (if needed) */}
      {/* Background Image */}
      <Image
        src='/images/slide1.jpg'
        alt="Radiant High School campus or students"
        layout="fill"
        objectFit="cover"
        className="z-0" // This z-0 is for within this component's stacking context
        priority
      />
      {/* Overlay */}
      {/* This overlay has z-10 in your original code, let's keep it or ensure it's below menu */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-[5]"></div> {/* Changed z-10 to z-[5] or similar */}

      {/* Text Content */}
      {/* This text has z-20 in your original code, ensure it's below menu */}
      <div className="relative h-full flex flex-col items-center justify-center text-center text-white p-4 z-[6]"> {/* Changed z-20 to z-[6] or similar */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          Discover Radiant High School
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl max-w-3xl">
          Fostering a vibrant community of learners dedicated to academic achievement, character development, and innovative thinking.
        </p>
      </div>
    </div>
  );
};

export default AboutHero;