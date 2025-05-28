// src/app/achievements/page.tsx
import React from 'react';

export const metadata = {
  title: 'Our Achievements | Radiant High School',
  description: 'Explore the remarkable achievements and milestones of Radiant High School students and faculty.',
};

const AchievementsPage = () => {
  // REPLACE THIS with your Google Doc embed URL
  const achievementsDocEmbedUrl = 'https://docs.google.com/document/d/e/2PACX-1vRfOm7iy2tHkDe7xD9mnQ5xmgkA_hzNF2ufsLLMXdY8YT49PoTDh-AAlpJP6oig_A/pub?embedded=true';

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-var(--header-height,150px)-var(--footer-height,300px))] py-10 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800">
            Celebrating Our Successes
          </h1>
          <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
            We are proud to showcase the hard work, dedication, and accomplishments
            of our students, faculty, and the entire Radiant High School community.
          </p>
        </header>

        <div className="bg-white p-2 sm:p-4 md:p-6 rounded-lg shadow-xl border"> {/* Reduced padding slightly for doc view */}
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 mb-6 text-center">
            School Achievements Report
          </h2>
          
          <div className="mx-auto max-w-4xl"> {/* max-w-4xl is good for document width */}
            <iframe
              src={achievementsDocEmbedUrl}
              title="School Achievements Report - Google Docs"
              className="w-full h-[80vh] md:h-[70vh] lg:h-[85vh] rounded border" // Adjusted height
              // No allowFullScreen needed typically for Google Docs embed
              // sandbox attribute might be useful if Google's embed requires it for certain features
              // sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            >
              <p className="p-4 text-center">
                Your browser does not support embedded documents. You can view the document directly at {' '}
                <a href={achievementsDocEmbedUrl.replace('/pub?embedded=true', '/edit')} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  this link (opens in new tab)
                </a>.
              </p>
            </iframe>
          </div>
          {/* Optional: Provide a direct link to the Google Doc if embedding fails or for accessibility */}
          <p className="text-center mt-6 text-sm text-slate-600">
            <a href={achievementsDocEmbedUrl.replace('/pub?embedded=true', '/edit')} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Open Achievements Report in a new tab
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AchievementsPage;