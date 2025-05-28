// src/components/news/NewsCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NewsCardProps {
  id: string; // Add ID to link to the specific news item
  headline: string;
  caption: string;
  imageUrl: string;
  datePublished: string;
  category?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  id,
  headline,
  caption,
  imageUrl,
  datePublished,
  category,
}) => {
  const cardContent = (
    <>
      <div className="relative w-full h-48 bg-gray-200 group-hover:opacity-90 transition-opacity">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={headline}
            layout="fill"
            objectFit="cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>
      <div className="p-4 md:p-5 flex flex-col flex-grow"> {/* flex-grow for text content */}
        {category && (
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full mb-2 self-start">
            {category}
          </span>
        )}
        <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
          {headline}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-3 flex-grow"> {/* line-clamp for caption, flex-grow */}
          {caption}
        </p>
        <p className="text-xs text-slate-400 mt-auto"> {/* mt-auto to push date to bottom */}
          Published: {new Date(datePublished).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
    </>
  );

  return (
    // Link the entire card to the individual news article page
    // The URL will be /news/[id]
    <Link href={`/news/${id}`} passHref legacyBehavior>
      <a className="bg-white rounded-lg shadow-lg overflow-hidden transition-all hover:shadow-xl group border border-gray-200 flex flex-col h-full"> {/* Added h-full for consistent card height if in grid */}
        {cardContent}
      </a>
    </Link>
  );
};

export default NewsCard;