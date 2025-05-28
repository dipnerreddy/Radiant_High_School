// src/components/activities/AnnualReportSection.tsx
import React from 'react';

const AnnualReportSection = () => {
  // REPLACE THIS with your Google Doc embed URL for the annual report
  const annualReportDocEmbedUrl = 'https://docs.google.com/document/d/e/2PACX-1vRfOm7iy2tHkDe7xD9mnQ5xmgkA_hzNF2ufsLLMXdY8YT49PoTDh-AAlpJP6oig_A/pub?embedded=true';

  return (
    <section className="hidden md:block py-10 md:py-12 bg-slate-100">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 md:mb-8 text-center">
          Annual Report
        </h2>

        <div className="mx-auto max-w-4xl"> {/* Consistent max-width */}
          <iframe
            src={annualReportDocEmbedUrl}
            title="Annual Report - Google Docs"
            className="w-full h-[80vh] md:h-[70vh] lg:h-[85vh] rounded-md shadow-lg border" // Adjusted height
          >
            <p className="p-4 text-center">
              Your browser does not support embedded documents. You can view the document directly at {' '}
              <a href={annualReportDocEmbedUrl.replace('/pub?embedded=true', '/edit')} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                this link
              </a>.
            </p>
          </iframe>
        </div>
        <p className="text-center mt-4 text-sm text-slate-600">
           <a href={annualReportDocEmbedUrl.replace('/pub?embedded=true', '/edit')} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Open Annual Report in a new tab
            </a>.
        </p>
      </div>
    </section>
  );
};

export default AnnualReportSection;