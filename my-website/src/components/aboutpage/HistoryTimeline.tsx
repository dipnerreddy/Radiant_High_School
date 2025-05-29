// src/components/aboutpage/HistoryTimeline.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { FiFlag, FiAward, FiHome, FiTrendingUp, FiCheckCircle, FiStar } from 'react-icons/fi';

const IconMap: { [key: string]: React.ElementType } = {
  Home: FiHome, Milestone: FiTrendingUp, Award: FiAward, Flag: FiFlag, Achievement: FiCheckCircle, Star: FiStar,
};

interface TimelineEventData {
  ID: string; Year: string; Title: string; Description: string; IconName: string; ColorClass: string;
}

const HistoryTimeline = () => {
  const [timelineEvents, setTimelineEvents] = useState<TimelineEventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ... (fetchData logic remains largely the same - ensure it logs data for debugging if needed)
    const fetchData = async () => {
      setLoading(true); setError(null);
      const csvUrl = process.env.NEXT_PUBLIC_TIMELINE_EVENTS_CSV_URL;
      if (!csvUrl) { setError("Timeline URL not configured."); setLoading(false); return; }
      try {
        Papa.parse(csvUrl, {
          download: true, header: true, skipEmptyLines: true,
          complete: (results) => {
            // console.log("Raw CSV data:", results.data); // For debugging raw data
            if (results.errors.length > 0) {
              console.error("CSV Errors:", results.errors);
              setError("Error parsing timeline. Check CSV."); setLoading(false); return;
            }
            const data = (results.data as TimelineEventData[])
                          .filter(item => item.ID && item.Year && item.Title && item.ColorClass && item.IconName); // Stricter filter

            const sorted = data.sort((a, b) => {
              if (a.Year === 'Present') return 1; if (b.Year === 'Present') return -1;
              const yA = parseInt(a.Year.split('-')[0]), yB = parseInt(b.Year.split('-')[0]);
              return !isNaN(yA) && !isNaN(yB) ? yA - yB : a.Year.localeCompare(b.Year);
            });
            // console.log("Sorted Timeline Events:", sorted); // For debugging sorted data
            setTimelineEvents(sorted); setLoading(false);
          },
          error: (err: any) => { console.error("Papa DL Error:", err); setError(`Download/Parse Error: ${err.message}`); setLoading(false); }
        });
      } catch (e: any) { setError(e.message || "Fetch Error"); setLoading(false); }
    };
    fetchData();
  }, []);

  const renderIcon = (iconName: string) => {
    const IconComponent = IconMap[iconName] || FiStar;
    return <IconComponent className="text-slate-900" size={20} />; // Changed to text-slate-900 (or text-black)
  };

  if (loading) return <p className="text-center text-slate-600 py-10">Loading timeline...</p>;
  if (error) return <p className="text-center text-red-500 py-10">Error: {error}</p>;
  if (timelineEvents.length === 0) return <p className="text-center text-slate-600 py-10">Timeline information coming soon.</p>;

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-12 md:mb-16">
          Our Journey Through Time
        </h2>
        <div className="relative"> {/* Main timeline container */}
          {/* Vertical line for desktop */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-300 transform -translate-x-1/2 h-full z-0"></div>

          {timelineEvents.map((event, index) => {
            const isLeftAlignedOnDesktop = index % 2 === 0; // Content on the left for desktop

            return (
              <div
                key={event.ID}
                // Each item is relative for absolute positioning of the icon on desktop
                className="md:relative mb-10 md:mb-0" // Remove md:flex from here
              >
                {/* Desktop Icon - Positioned on the center line, vertically aligned with its row */}
                <div
                  className={`hidden md:flex absolute w-10 h-10 rounded-full ${event.ColorClass || 'bg-gray-400'} items-center justify-center shadow-md z-20
                              left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2`}
                  // top-1/2 -translate-y-1/2 will center it to the current item's implied row height
                  // This assumes each timeline item block has roughly similar perceived height or use md:py-X on wrapper below
                >
                  {renderIcon(event.IconName)}
                </div>

                {/* Content Wrapper (for mobile flow and desktop positioning) */}
                <div
                  className={`flex items-start md:items-center w-full 
                              ${isLeftAlignedOnDesktop ? 'md:flex-row-reverse md:justify-start' : 'md:justify-start md:flex-row'} 
                              md:py-8`} // Add padding to create vertical space between items on desktop
                >
                  {/* Spacer for desktop to push content to one side of the icon */}
                  <div className="hidden md:block md:w-1/2"></div>


                  {/* Mobile Icon (Part of the content flow on mobile) */}
                  <div className={`md:hidden w-10 h-10 rounded-full ${event.ColorClass || 'bg-gray-400'} flex items-center justify-center shadow-md mr-4 flex-shrink-0`}>
                    {renderIcon(event.IconName)}
                  </div>

                  {/* Content Box */}
                  <div
                    className={`bg-slate-50 p-6 rounded-lg shadow-lg w-full md:w-[calc(50%-3rem)] /* 50% minus icon space and gap */
                                relative border-t-4 md:border-t-0 
                                ${isLeftAlignedOnDesktop ? 'md:text-right md:border-r-4' : 'md:text-left md:border-l-4'}`}
                    style={{ borderColor: event.ColorClass ? event.ColorClass.replace('bg-', '') : 'transparent' }}
                  >
                    {/* Arrow for Desktop */}
                    <div
                      className={`hidden md:block absolute top-1/2 transform -translate-y-1/2 w-0 h-0 
                                  border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent
                                  ${isLeftAlignedOnDesktop ? 'left-full border-l-[10px]' : 'right-full border-r-[10px]' }`}
                      style={{ 
                        borderColor: isLeftAlignedOnDesktop 
                          ? `transparent transparent transparent ${event.ColorClass ? event.ColorClass.replace('bg-', '') : 'transparent'}` 
                          : `transparent ${event.ColorClass ? event.ColorClass.replace('bg-', '') : 'transparent'} transparent transparent`
                      }}
                    ></div>
                    <h3 className={`text-xl font-semibold text-slate-700 mb-1 ${isLeftAlignedOnDesktop ? 'md:text-right' : 'md:text-left'}`}>
                        {event.Year} - {event.Title}
                    </h3>
                    <p className={`text-md text-slate-600 leading-relaxed ${isLeftAlignedOnDesktop ? 'md:text-right' : 'md:text-left'}`}>
                      {event.Description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HistoryTimeline;