// src/components/homepage/HomeComponent2.tsx
"use client";

import React from 'react';
import Image from 'next/image';

const heroImageSrc = '/images/slide1.jpg';
const heroImageAlt = 'Inspiring educational environment';
const heroQuote = "Excellence happens not by accident. <br /> It is a process.";

const HomeComponent2 = () => {
  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] z-0">
      <Image
        src={heroImageSrc}
        alt={heroImageAlt}
        layout="fill"
        objectFit="cover"
        // REMOVE object-right md:object-center to default to object-center like AboutHero
        className="z-0" 
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 z-[5]"></div>
      <div className="relative z-[6] h-full flex flex-col items-center justify-center text-center text-white p-4">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg max-w-3xl mb-4"
          dangerouslySetInnerHTML={{ __html: heroQuote }}
        />
      </div>
    </div>
  );
};

export default HomeComponent2;