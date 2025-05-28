// src/components/aboutpage/HistoryTimeline.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { FiFlag, FiAward, FiHome, FiTrendingUp, FiCheckCircle, FiStar } from 'react-icons/fi';

const IconMap: { [key: string]: React.ElementType } = {
  Home: FiHome,
  Milestone: FiTrendingUp,
  Award: FiAward,
  Flag: FiFlag,
  Achievement: FiCheckCircle,
  Star: FiStar,
};

interface TimelineEventData {
  ID: string;
  Year: string;
  Title: string;
  Description: string;
  IconName: string;
  ColorClass: string;
}

const HistoryTimeline = () => {
  const [timelineEvents, setTimelineEvents] = useState<TimelineEventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ... (fetchData logic remains the same)
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const csvUrl = process.env.NEXT_PUBLIC_TIMELINE_EVENTS_CSV_URL;

      if (!csvUrl) {
        setError("Timeline events data source URL is not configured.");
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
              console.error("CSV Parsing errors (Timeline):", results.errors);
              setError("Error parsing timeline data. Check CSV format/headers.");
              setLoading(false);
              return;
            }
            const typedData = (results.data as TimelineEventData[])
                                .filter(item => item.ID && item.Year && item.Title);

            const sortedData = typedData.sort((a, b) => {
                if (a.Year === 'Present') return 1;
                if (b.Year === 'Present') return -1;
                // Attempt to parse years as numbers, fallback for non-numeric (like ranges)
                const yearA = parseInt(a.Year.split('-')[0]); // Take first year if it's a range
                const yearB = parseInt(b.Year.split('-')[0]);
                if (!isNaN(yearA) && !isNaN(yearB)) {
                    return yearA - yearB;
                }
                return a.Year.localeCompare(b.Year); // Fallback to string compare
            });

            setTimelineEvents(sortedData);
            setLoading(false);
          },
          error: (err: any) => {
            console.error("PapaParse download error (Timeline):", err);
            setError(`Failed to download or parse timeline data. Error: ${err.message || 'Unknown PapaParse error'}`);
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

  const renderIcon = (iconName: string) => {
    const IconComponent = IconMap[iconName] || FiStar;
    return <IconComponent className="text-white" size={20} />;
  };

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8"> {/* Adjusted horizontal padding */}
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-12 md:mb-16">
          Our Journey Through Time
        </h2>

        {loading && <p className="text-center text-slate-600">Loading timeline...</p>}
        {!loading && error && <p className="text-center text-red-500">Error: {error}</p>}
        
        {!loading && !error && timelineEvents.length > 0 && (
          <div className="relative">
            {/* Vertical line for desktop, precisely centered */}
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-300 transform -translate-x-1/2"></div>

            {timelineEvents.map((event, index) => (
              <div
                key={event.ID}
                className={`md:relative flex ${
                  index % 2 === 0 ? 'md:justify-start' : 'md:justify-end' // Alternates entire row content
                } mb-10 md:mb-8`} // Spacing between timeline items
              >
                {/* This div now correctly positions the content box + icon wrapper to left or right */}
                <div className="md:w-1/2 flex items-start md:items-center"> {/* Ensure items-start for mobile icon alignment */}
                  {/* Mobile Icon (always on the left of text) */}
                  <div className={`md:hidden w-10 h-10 rounded-full ${event.ColorClass} flex items-center justify-center shadow-md mr-4 flex-shrink-0`}>
                    {renderIcon(event.IconName)}
                  </div>

                  {/* Desktop Icon (positioned absolutely relative to the timeline item row) */}
                  <div className="hidden md:block">
                    <div
                        className={`absolute w-10 h-10 rounded-full ${event.ColorClass} flex items-center justify-center shadow-md z-10
                                    left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2`}
                                    // The icon is always centered on the timeline line, its content box moves
                    >
                        {renderIcon(event.IconName)}
                    </div>
                  </div>
                  
                  {/* Content Box */}
                  <div
                    className={`bg-slate-50 p-6 rounded-lg shadow-lg w-full 
                                md:max-w-md relative  // Max width for content box on desktop
                                ${index % 2 === 0 ? 'md:mr-[3.25rem]' : 'md:ml-[3.25rem]'} // Margin to create space from center line
                                border-t-4 md:border-t-0 ${index % 2 === 0 ? 'md:border-r-4' : 'md:border-l-4'}`}
                    style={{ borderColor: event.ColorClass ? event.ColorClass.replace('bg-', '') : 'transparent' }}
                  >
                    {/* Arrow for Desktop */}
                    <div
                      className={`hidden md:block absolute top-1/2 transform -translate-y-1/2 w-0 h-0 
                                  border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent
                                  ${index % 2 === 0 ? 'right-[-10px] border-l-[10px]' : 'left-[-10px] border-r-[10px]' }`}
                      style={{ 
                        borderColor: index % 2 === 0 
                          ? `transparent transparent transparent ${event.ColorClass ? event.ColorClass.replace('bg-', '') : 'transparent'}` 
                          : `transparent ${event.ColorClass ? event.ColorClass.replace('bg-', '') : 'transparent'} transparent transparent`
                      }}
                    ></div>
                    
                    <h3 className="text-xl font-semibold text-slate-700 mb-1">{event.Year} - {event.Title}</h3>
                    <p className="text-md text-slate-600 leading-relaxed">
                      {event.Description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {!loading && !error && timelineEvents.length === 0 && (
          <p className="text-center text-slate-600">Timeline information coming soon.</p>
        )}
      </div>
    </section>
  );
};

export default HistoryTimeline;