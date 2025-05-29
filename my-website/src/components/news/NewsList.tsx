// src/components/news/NewsList.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import NewsCard from './NewsCard';

interface NewsArticle {
  ID: string;
  Headline: string;
  Caption: string;
  ImageUrl: string;
  DatePublished: string;
  FullContent?: string; // Add if you have this column
  Category?: string;
}

const NewsList = () => {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // ... (your existing fetching logic) ...
      // Ensure Papa.parse results.data is cast to NewsArticle[] including the ID
      setLoading(true);
      setError(null);
      const csvUrl = process.env.NEXT_PUBLIC_NEWS_DATA_CSV_URL;

      if (!csvUrl) {
        setError("News data source URL is not configured.");
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
              console.error("CSV Parsing errors:", results.errors);
              setError("Error parsing news data. Check CSV format.");
              setLoading(false);
              return;
            }
            const typedData = results.data as NewsArticle[]; // Cast here
            const sortedData = typedData.sort(
              (a, b) => new Date(b.DatePublished).getTime() - new Date(a.DatePublished).getTime()
            );
            setNewsArticles(sortedData);
            setLoading(false);
          },
          error: (err: any) => {
            console.error("PapaParse download error:", err);
            setError("Failed to download or parse news data.");
            setLoading(false);
          }
        });
      } catch (e: any) {
        setError(e.message || "An unknown error occurred while fetching data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  if (loading) {
    return <p className="text-center text-black text-lg py-10">Loading news...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">Error: {error}</p>;
  }

  return (
    <section className="py-10 md:py-16 bg-slate-100">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-8 md:mb-12">
          Latest News & Updates
        </h2>

        {newsArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {newsArticles.map((article) => (
              <NewsCard
                key={article.ID}
                id={article.ID} // Pass the ID here
                headline={article.Headline}
                caption={article.Caption}
                imageUrl={article.ImageUrl}
                datePublished={article.DatePublished}
                category={article.Category}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-600">No news articles found at the moment.</p>
        )}
      </div>
    </section>
  );
};

export default NewsList;