// src/components/activities/PastActivityCard.tsx
import React from 'react';
import Image from 'next/image';

interface PastActivityCardProps {
  imageUrl: string;
  name: string;
  date?: string; // Optional date/year
  description?: string; // Optional short blurb
}

const PastActivityCard: React.FC<PastActivityCardProps> = ({ imageUrl, name, date, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden group">
      <div className="relative w-full h-48 sm:h-56">
        <Image
          src={imageUrl || '/images/placeholder.png'} // Fallback placeholder
          alt={`Image of ${name}`}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-slate-800 mb-1 truncate" title={name}>{name}</h3>
        {date && <p className="text-xs text-slate-500 mb-2">{date}</p>}
        {description && <p className="text-sm text-slate-600 leading-snug line-clamp-2">{description}</p>}
      </div>
    </div>
  );
};

export default PastActivityCard;