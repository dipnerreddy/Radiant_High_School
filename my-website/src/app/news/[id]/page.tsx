// src/app/news/[id]/page.tsx
"use client"; // This page will fetch data client-side

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Papa from 'papaparse';
import { useParams } from 'next/navigation'; // Hook to get dynamic route params

interface NewsArticle {
  ID: string;
  Headline: string;
  Caption: string;
  ImageUrl: string;
  DatePublished: string;
  FullContent?: string; // Make sure this matches your sheet
  Category?: string;
}

const SingleNewsPage = () => {
  const params = useParams(); // { id: '1' }
  const articleId = params.id as string; // Get the id from the URL

  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!articleId) return; // Don't fetch if id is not available yet

    const fetchArticleData = async () => {
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
              setError("Error parsing news data.");
              setLoading(false);
              return;
            }
            const allArticles = results.data as NewsArticle[];
            const foundArticle = allArticles.find(art => art.ID === articleId);

            if (foundArticle) {
              setArticle(foundArticle);
            } else {
              setError(`News article with ID "${articleId}" not found.`);
            }
            setLoading(false);
          },
          error: () => {
            setError("Failed to download or parse news data for the article.");
            setLoading(false);
          }
        });
      } catch (e: any) {
        setError(e.message || "An unknown error occurred.");
        setLoading(false);
      }
    };

    fetchArticleData();
  }, [articleId]); // Re-fetch if articleId changes

  if (loading) {
    return <div className="text-center py-20">Loading article...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-20">Error: {error}</div>;
  }

  if (!article) {
    // This case should ideally be caught by the error state if not found
    return <div className="text-center py-20">Article not found.</div>;
  }

  // Use article.FullContent if available, otherwise fallback to article.Caption
  const displayContent = article.FullContent || article.Caption;

  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
        <article>
          <header className="mb-8">
            <Link href="/news" className="text-blue-600 hover:underline mb-4 inline-block">
              ← Back to News
            </Link>
            {article.category && (
              <p className="text-sm text-indigo-600 font-semibold mb-2">{article.category}</p>
            )}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3">
              {article.Headline}
            </h1>
            <p className="text-md text-slate-500">
              Published on: {new Date(article.DatePublished).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </header>

          {article.ImageUrl && (
            <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-lg mb-8">
              <Image
                src={article.ImageUrl}
                alt={article.Headline}
                layout="fill"
                objectFit="cover"
                priority // This image is likely important for LCP on this page
              />
            </div>
          )}

          {/* For rendering HTML content safely, you'd use dangerouslySetInnerHTML or a markdown parser */}
          {/* For plain text: */}
          <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
            {/* Split content by newlines and render as paragraphs if it's plain text with line breaks */}
            {displayContent.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          {/* If FullContent can contain HTML, and you trust the source:
          <div
            className="prose prose-lg max-w-none text-slate-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: displayContent }}
          />
          Be very careful with dangerouslySetInnerHTML if the content isn't sanitized.
          */}
        </article>
      </div>
    </div>
  );
};

export default SingleNewsPage;