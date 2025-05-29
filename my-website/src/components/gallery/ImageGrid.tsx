// src/components/gallery/ImageGrid.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import FsLightbox from 'fslightbox-react'; // Import FsLightbox

interface GalleryImage {
  id: string;
  url: string;
  width: number;
  height: number;
  alt: string;
}

const ImageGrid = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for the lightbox
  const [lightboxController, setLightboxController] = useState({
    toggler: false, // To open/close the lightbox
    slide: 1,       // To set which image to show first (1-indexed)
  });

  // Function to open the lightbox at a specific image
  function openLightboxOnSlide(slideNumber: number) {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: slideNumber,
    });
  }

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/gallery-images');
        if (!response.ok) {
          let errorData;
          try {
            errorData = await response.json();
          } catch (parseError) {
            throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
          }
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
            throw new Error("Invalid data format received from API.");
        }
        setImages(data);
      } catch (e: any) {
        setError(e.message || 'An unknown error occurred');
        console.error("Failed to load images:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <p className="text-center text-black text-black-lg py-10">Loading gallery...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">Error loading gallery: {error}</p>;
  }

  if (images.length === 0) {
    return <p className="text-center text-black-lg py-10">No images in the gallery yet.</p>;
  }

  return (
    <section className="py-10 md:py-16 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-10 md:mb-12">
          Photo Gallery
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="aspect-square bg-gray-200 rounded-md overflow-hidden cursor-pointer group relative shadow-md hover:shadow-lg transition-shadow"
              onClick={() => openLightboxOnSlide(index + 1)} // Open lightbox, pass 1-based index
            >
              <Image
                src={image.url}
                alt={image.alt || `Gallery image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                priority={index < 10}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Render the FsLightbox component */}
      <FsLightbox
        toggler={lightboxController.toggler}
        sources={images.map(img => img.url)} // Pass an array of image URLs
        slide={lightboxController.slide}
        // types={images.map(() => 'image')} // Optional: if you have mixed content types
      />
    </section>
  );
};

export default ImageGrid;