// src/components/alumni/AlumniCard.tsx
import React from 'react';
import Image from 'next/image';

interface AlumniCardProps {
  name: string;
  passoutYear: number | string; // Can be string if read from CSV
  mobileNumber: string;
  imageUrl: string;
}

const AlumniCard: React.FC<AlumniCardProps> = ({ name, passoutYear, mobileNumber, imageUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="relative w-full h-48 sm:h-56 bg-gray-200">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`Photo of ${name}`}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-slate-800 mb-1">{name}</h3>
        <p className="text-sm text-slate-600">Batch of {passoutYear}</p>
        <p className="text-xs text-blue-600 mt-1">{mobileNumber}</p>
      </div>
    </div>
  );
};

export default AlumniCard;