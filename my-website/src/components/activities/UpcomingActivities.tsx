// src/components/activities/UpcomingActivities.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

interface UpcomingEvent {
  ID: string;
  Name: string;
  Date: string;
  Time?: string;
  Venue?: string;
  Description: string;
}

const UpcomingActivities = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const csvUrl = process.env.NEXT_PUBLIC_UPCOMING_ACTIVITIES_CSV_URL;

      if (!csvUrl) {
        setError("Upcoming activities data source URL is not configured.");
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
              console.error("CSV Parsing errors (Upcoming):", results.errors);
              setError("Error parsing upcoming activities data.");
              setLoading(false);
              return;
            }
            const typedData = results.data as UpcomingEvent[];
            // Sort by date ascending (if dates are in YYYY-MM-DD format or parseable)
            const sortedData = typedData.sort(
              (a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime()
            );
            setUpcomingEvents(sortedData);
            setLoading(false);
          },
          error: (err: any) => {
            console.error("PapaParse download error (Upcoming):", err);
            setError("Failed to download or parse upcoming activities data.");
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
      <section className="py-10 md:py-12 bg-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 md:mb-8 text-center md:text-left">
            Upcoming Activities
          </h2>
          <p className="text-center text-slate-600">Loading upcoming activities...</p>
        </div>
      </section>
    );
  }

  if (error) {
     return (
      <section className="py-10 md:py-12 bg-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 md:mb-8 text-center md:text-left">
            Upcoming Activities
          </h2>
          <p className="text-center text-red-500">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 md:py-12 bg-blue-50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 md:mb-8 text-center md:text-left">
          Upcoming Activities
        </h2>
        {upcomingEvents.length > 0 ? (
          <div className="flex overflow-x-auto space-x-4 md:space-x-6 pb-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-200">
            {upcomingEvents.map((event) => (
              <div
                key={event.ID}
                className="flex-shrink-0 w-72 sm:w-80 bg-white p-5 rounded-lg shadow-md border-l-4 border-blue-600"
              >
                <h3 className="text-lg font-semibold text-slate-700 mb-1">{event.Name}</h3>
                <p className="text-sm text-blue-700 font-medium mb-2">
                  {new Date(event.Date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                {event.Time && <p className="text-xs text-slate-500"><strong>Time:</strong> {event.Time}</p>}
                {event.Venue && <p className="text-xs text-slate-500 mb-2"><strong>Venue:</strong> {event.Venue}</p>}
                <p className="text-sm text-slate-600 leading-relaxed">
                  {event.Description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-600">No upcoming activities scheduled at the moment. Please check back soon!</p>
        )}
      </div>
    </section>
  );
};

export default UpcomingActivities;