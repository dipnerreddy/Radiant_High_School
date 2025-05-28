import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HomeComponent3 = () => {
  return (
    <div className="w-full min-h-[400px] bg-[#E9ECEF] p-8 md:p-12 lg:p-16 flex items-center">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left Side: Message */}
        <div className="text-gray-700 text-center md:text-left flex flex-col items-center md:items-start">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
            A Message From Our Principal
          </h2>
          <p className="text-md md:text-lg mb-3 leading-relaxed text-justify">
            At Radiant High School, we are committed to nurturing confident, compassionate, and future-ready learners. With a blend of academic excellence, values, and innovation, we empower students to shine in a dynamic world. Together, let’s build a brighter tomorrow.
          </p>
          <p className="text-md md:text-lg mb-6 leading-relaxed text-justify">
            Our commitment is to empower students with the skills, confidence, and
            vision to excel in a rapidly evolving world. Join us on this exciting
            journey of discovery and growth.
          </p>
          <Link
            href="/about-us"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors"
          >
            Learn More About Us
          </Link>
        </div>

        {/* Right Side: Image Box */}
        <div className="hidden md:flex justify-center md:justify-end">
          <div className="w-[400px] h-[300px] bg-white shadow-xl rounded-lg overflow-hidden">
            <Image
              src="/images/principal.jpg"
              alt="Principal's message or relevant feature image"
              width={400}
              height={300}
              objectFit="cover"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent3;
