// src/components/aboutpage/CoreValues.tsx
"use client"; // If using icons as components directly

import React from 'react';
import { FiAward, FiUsers, FiZap, FiHeart, FiBookOpen } from 'react-icons/fi'; // Example icons

const values = [
  {
    icon: <FiAward size={40} className="text-blue-600 mb-4" />,
    title: 'Excellence',
    description: 'We strive for the highest standards in academic pursuits, personal conduct, and institutional performance.',
  },
  {
    icon: <FiBookOpen size={40} className="text-green-600 mb-4" />,
    title: 'Integrity',
    description: 'We uphold honesty, ethical behavior, and accountability in all our actions and interactions.',
  },
  {
    icon: <FiUsers size={40} className="text-purple-600 mb-4" />,
    title: 'Community',
    description: 'We foster a supportive, inclusive, and collaborative environment where everyone feels valued and respected.',
  },
  {
    icon: <FiZap size={40} className="text-yellow-500 mb-4" />,
    title: 'Innovation',
    description: 'We encourage creativity, critical thinking, and the exploration of new ideas to adapt and thrive.',
  },
  {
    icon: <FiHeart size={40} className="text-red-500 mb-4" />,
    title: 'Respect',
    description: 'We cultivate a culture of respect for oneself, others, diversity, and the learning environment.',
  },
];

const CoreValues = () => {
  return (
    <section className="py-12 md:py-20 bg-[#E9ECEF]"> {/* Using a background similar to HomeComponent3 */}
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-12 md:mb-16">
          The Pillars of Radiant High
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
            >
              {value.icon}
              <h3 className="text-2xl font-semibold text-slate-700 mb-3">{value.title}</h3>
              <p className="text-md text-slate-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;