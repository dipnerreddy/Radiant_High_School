// src/components/aboutpage/MissionVision.tsx
import React from 'react';

const MissionVision = () => {
  return (
    <section className="py-12 md:py-20 bg-white"> {/* Or a very light gray like bg-slate-50 */}
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Mission */}
          <div className="text-slate-700">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 border-l-4 border-blue-600 pl-4">
              Our Mission
            </h2>
            <p className="text-lg leading-relaxed mb-4">
              To provide a comprehensive and challenging education that inspires students to achieve their full potential, cultivate a lifelong love of learning, and become responsible, compassionate global citizens.
            </p>
            <p className="text-lg leading-relaxed">
              We aim to create a supportive and inclusive environment where every student feels valued and empowered to explore their talents.
            </p>
          </div>

          {/* Vision */}
          <div className="text-slate-700">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 border-l-4 border-red-500 pl-4">
              Our Vision
            </h2>
            <p className="text-lg leading-relaxed mb-4">
              To be a leading institution recognized for academic excellence, innovative teaching practices, and a nurturing environment that prepares students to lead and succeed in a dynamic world.
            </p>
            <p className="text-lg leading-relaxed">
              We envision our graduates as critical thinkers, creative problem-solvers, and ethical leaders who make a positive impact on society.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;