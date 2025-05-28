// src/components/activities/PastActivitiesGrid.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import PastActivityCard from './PastActivityCard'; // This component should be fine as is

interface PastEvent {
  ID: string;
  Name: string;
  Date: string;
  Description?: string;
  ImageUrl: string;
}

const PastActivitiesGrid = () => {
  const [pastEvents, setPastEvents] = useState<PastEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const csvUrl = process.env.NEXT_PUBLIC_PAST_ACTIVITIES_CSV_URL;

      if (!csvUrl) {
        setError("Past activities data source URL is not configured.");
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
              console.error("CSV Parsing errors (Past):", results.errors);
              setError("Error parsing past activities data.");
              setLoading(false);
              return;
            }
            const typedData = results.data as PastEvent[];
            // Sort by date descending (most recent first)
            const sortedData = typedData.sort(
              (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()
            );
            setPastEvents(sortedData);
            setLoading(false);
          },
          error: (err: any) => {
            console.error("PapaParse download error (Past):", err);
            setError("Failed to download or parse past activities data.");
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

  if (loading) {
     return (
      <section className="py-10 md:py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 md:mb-8 text-center md:text-left">
            Glimpses of Past Activities
          </h2>
          <p className="text-center text-slate-600">Loading past activities...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10 md:py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 md:mb-8 text-center md:text-left">
            Glimpses of Past Activities
          </h2>
          <p className="text-center text-red-500">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 md:py-12 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 md:mb-8 text-center md:text-left">
          Glimpses of Past Activities
        </h2>
        {pastEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {pastEvents.map((event) => (
              <PastActivityCard
                key={event.ID}
                imageUrl={event.ImageUrl}
                name={event.Name}
                date={new Date(event.Date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                description={event.Description}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-600">No past activities to display yet.</p>
        )}
      </div>
    </section>
  );
};

export default PastActivitiesGrid;