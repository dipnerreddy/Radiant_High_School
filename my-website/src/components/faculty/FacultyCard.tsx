// src/components/faculty/FacultyCard.tsx
import React from 'react';
import Image from 'next/image';

interface FacultyCardProps {
  imageUrl: string; // This will be a string, potentially empty
  name: string;
  qualification: string;
  department?: string;
}

const FacultyCard: React.FC<FacultyCardProps> = ({ imageUrl, name, qualification, department }) => {
  const placeholderImage = '/images/placeholder-avatar.png'; // Ensure this exists in public/images

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col h-full">
      <div className="relative w-full h-56 sm:h-64 bg-gray-200"> {/* Added bg-gray-200 for when image doesn't load or is placeholder */}
        <Image
          src={imageUrl || placeholderImage} // Use provided URL or fallback
          alt={`Photo of ${name}`}
          layout="fill"
          objectFit="cover"
          // Optional: add onError to switch to placeholder if src fails, though next/image handles some of this.
          // onError={(e) => { e.currentTarget.src = placeholderImage; }}
        />
      </div>
      <div className="p-5 text-center flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-slate-800 mb-1">{name}</h3>
        <p className="text-sm text-blue-600 font-medium mb-2 flex-grow">{qualification}</p>
        {department && (
          <p className="text-xs text-slate-500 mt-auto">{department}</p>
        )}
      </div>
    </div>
  );
};

export default FacultyCard;