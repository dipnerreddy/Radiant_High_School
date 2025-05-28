// src/components/faculty/CommitteesSection.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

interface Committee {
  ID: string;
  Name: string;
  Purpose: string;
  Members?: string; // Comma-separated string from CSV
}

const CommitteesSection = () => {
  const [committees, setCommittees] = useState<Committee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const csvUrl = process.env.NEXT_PUBLIC_COMMITTEES_DATA_CSV_URL;

      if (!csvUrl) {
        setError("Committees data source URL is not configured.");
        setLoading(false);
        return;
      }

      try {
        Papa.parse(csvUrl, {
          download: true,
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            if (results.errors.length > 0) {
              console.error("CSV Parsing errors (Committees):", results.errors);
              setError("Error parsing committees data. Check CSV format/headers.");
              setLoading(false);
              return;
            }
            const typedData = results.data as Committee[];
            setCommittees(typedData.filter(item => item.ID && item.Name)); // Basic validation
            setLoading(false);
          },
          error: (err: any) => {
            console.error("PapaParse download error (Committees):", err);
            setError(`Failed to download or parse committees data. Error: ${err.message || 'Unknown PapaParse error'}`);
            setLoading(false);
          }
        });
      } catch (e: any) {
        setError(e.message || "An unknown error occurred.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-10 md:mb-12">
          Our School Committees
        </h2>
        {loading && <p className="text-center text-slate-600">Loading committee information...</p>}
        {!loading && error && <p className="text-center text-red-500">Error: {error}</p>}
        {!loading && !error && committees.length > 0 ? (
          <div className="space-y-8 max-w-3xl mx-auto"> {/* Centered content */}
            {committees.map((committee) => (
              <div key={committee.ID} className="bg-slate-50 p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-blue-700 mb-2">{committee.Name}</h3>
                <p className="text-slate-600 leading-relaxed mb-3">{committee.Purpose}</p>
                {committee.Members && committee.Members.trim() !== "" && (
                  <div>
                    <p className="text-sm font-medium text-slate-700">Key Members:</p>
                    <ul className="list-disc list-inside text-sm text-slate-500">
                      {committee.Members.split(',').map((member, i) => (
                        <li key={i}>{member.trim()}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          !loading && !error && <p className="text-center text-slate-600">Committee information coming soon.</p>
        )}
      </div>
    </section>
  );
};

export default CommitteesSection;