// src/app/academics/page.tsx
import React from 'react';

export const metadata = {
  title: 'Academics & Performance | Radiant High School',
  description: 'Explore academic programs, performance analytics, and educational insights at Radiant High School.',
};

// Your Looker Studio Embed URL
const lookerStudioEmbedUrl = "https://lookerstudio.google.com/embed/reporting/e1007ad4-3f61-4205-8d7b-861aa8de942c/page/Z5EMF";

const AcademicsPage = () => {
  // We'll directly use the Looker Studio embed now
  // const useLookerStudio = true; // No longer needed as we're committed to Looker Studio for this example

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-var(--header-height,150px)-var(--footer-height,300px))] py-10 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800">
            Academic Excellence at Radiant High School
          </h1>
          <p className="mt-3 text-lg text-slate-600 max-w-3xl mx-auto">
            Dive into our academic performance data, curriculum highlights, and the
            educational philosophy that drives student success at Radiant High School.
          </p>
        </header>

        {/* Embed Looker Studio Dashboard */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 mb-6 text-center">
            Performance Dashboard
          </h2>
          <div className="bg-white p-1 sm:p-2 rounded-lg shadow-xl border overflow-hidden"> {/* Added overflow-hidden for cleaner edges if iframe is slightly off */}
            {lookerStudioEmbedUrl ? (
              <iframe
                width="100%" // Make it responsive width-wise
                // The height provided by Looker Studio (450px) is a good default.
                // For responsiveness, you might wrap this in an aspect-ratio div
                // or adjust height with media queries if needed, but let's start simple.
                height="750" // Increased default height for better viewing of typical dashboards
                src={lookerStudioEmbedUrl}
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
                sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                title="Academic Performance Dashboard - Radiant High School" // More specific title
              ></iframe>
            ) : (
              <p className="text-center text-gray-500 py-10">Performance dashboard is currently unavailable.</p>
            )}
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            Dashboard may take a moment to load. Refresh if you encounter issues.
          </p>
        </section>

        {/* Static content section (as before) */}
        {/* // In your AcademicsPage.tsx or wherever this section is defined */}

<section className="mt-12 py-8 bg-white rounded-lg shadow-lg p-6 md:p-8 border">
  <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-6 text-center"> {/* Made main heading darker */}
    Our Educational Approach
  </h2>
  {/* 
    Apply darker text color to the prose container.
    This might affect all text within, but headings and links might need specific overrides.
    prose-slate applies slate colors. We can try to make the base text darker.
  */}
  <div className="prose prose-slate max-w-none lg:prose-lg text-slate-800"> {/* Changed base text to text-slate-800 */}
    <p>
      At Radiant High School, our academic programs are designed to be rigorous, engaging, and relevant. We focus on a holistic approach that balances strong foundational knowledge with the development of critical thinking, problem-solving, and collaboration skills.
    </p>
    {/* Explicitly make h3 darker if prose doesn't override enough */}
    <h3 className="text-xl font-medium text-slate-900 mt-6 mb-2"> {/* Changed h3 to text-slate-900 */}
      Curriculum Highlights:
    </h3>
    {/* 
      List items will inherit from 'text-slate-800' applied to the prose div.
      If you need them even darker, you'd have to style them individually or customize the prose theme.
    */}
    <ul>
      <li>STEAM-integrated learning across subjects.</li>
      <li>Emphasis on project-based and experiential learning.</li>
      <li>Advanced placement opportunities for motivated students.</li>
      <li>Dedicated support for diverse learning needs.</li>
    </ul>
    <p>
      Our experienced and passionate educators are committed to creating a supportive learning environment where every student can thrive and reach their full potential.
    </p>
  </div>
</section>

      </div>
    </div>
  );
};

export default AcademicsPage;