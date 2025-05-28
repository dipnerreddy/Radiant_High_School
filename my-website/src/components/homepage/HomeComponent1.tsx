// src/components/homepage/HomeComponent1.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

interface TickerNewsItem {
  ID: string;
  NewsText: string;
  IsActive?: string; // Will be string "TRUE" or "FALSE" from CSV
  Order?: string;    // Will be string from CSV
}

const HomeComponent1 = () => {
  const [newsItems, setNewsItems] = useState<string[]>([]); // Stores only the active news strings
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const csvUrl = process.env.NEXT_PUBLIC_TICKER_NEWS_CSV_URL;

      if (!csvUrl) {
        console.warn("HomeComponent1: Ticker news data source URL is not configured. Using default news.");
        // Fallback to default news if URL is not set
        setNewsItems([
          "Admission open for 2025-26 Academic year",
          "Event: 2025 Annual Day Celebration Videos are now Available in Our Youtube Channel, Check out now",
        ]);
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
              console.error("CSV Parsing errors (Ticker News):", results.errors);
              setError("Error parsing ticker news data.");
              setLoading(false);
              return;
            }

            let activeNews = (results.data as TickerNewsItem[])
              .filter(item => item.NewsText && (!item.IsActive || item.IsActive.toUpperCase() === 'TRUE'));

            // Optional: Sort by Order if that column exists and has numbers
            if (activeNews.length > 0 && activeNews[0].Order !== undefined) {
              activeNews.sort((a, b) => parseInt(a.Order!) - parseInt(b.Order!));
            }
            
            setNewsItems(activeNews.map(item => item.NewsText));
            setLoading(false);
          },
          error: (err: any) => {
            console.error("PapaParse download error (Ticker News):", err);
            setError("Failed to download or parse ticker news.");
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

  // Join news items with some spacing for a continuous scroll effect
  const newsString = newsItems.length > 0 ? newsItems.join(' •••••• ') : "Loading news...";

  // If still loading or error, you might want to hide the ticker or show a static message
  // For simplicity, we'll let it show "Loading news..." or the error in the ticker if it occurs before newsItems is populated.
  // A better UX might be to not render the ticker at all or render a non-scrolling placeholder.
  
  // If there's an error and no fallback news, or no news at all, don't render the ticker.
  if ((error && newsItems.length === 0 && !loading) || (!loading && !error && newsItems.length === 0)) {
    // Optionally, render a small static message or nothing
    // return <div className="w-full h-[50px] bg-[#E6F0FA] flex items-center justify-center text-sm text-gray-500">No current announcements.</div>;
    return null; // Or render nothing
  }
  
  // If loading and no newsItems yet (initial load), you could show a static placeholder
  if (loading && newsItems.length === 0) {
    return (
        <div className="w-full h-[50px] bg-[#E6F0FA] flex items-center justify-center overflow-hidden">
            <span className="text-sm text-gray-500 px-4">Loading announcements...</span>
        </div>
    );
  }


  return (
    <div
      className="w-full h-[50px] bg-[#E6F0FA] flex items-center overflow-hidden"
      aria-label="Latest news"
    >
      <div className={`whitespace-nowrap ${newsItems.length > 0 ? 'animate-marquee' : ''}`}>
        {/* Render the string twice for a seamless loop effect if there's news */}
        {/* Adjust animation duration based on content length and desired speed */}
        <span className="text-sm text-gray-700 px-4">
          {newsString}
        </span>
        {newsItems.length > 0 && ( // Only render the duplicate if there's actual news
          <span className="text-sm text-gray-700 px-4" aria-hidden="true">
            {newsString}
          </span>
        )}
      </div>
    </div>
  );
};

export default HomeComponent1;