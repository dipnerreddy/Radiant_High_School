// src/app/api/gallery-images/route.ts
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function GET() {
  try {
    // Make sure folder name matches exactly what's in Cloudinary
    const { resources } = await cloudinary.search
      .expression('folder:radiant_high_gallery') 
      .sort_by('public_id', 'desc')
      .max_results(50)
      .execute();

    const images = resources.map((resource: any) => ({
      id: resource.public_id,
      url: resource.secure_url,
      width: resource.width,
      height: resource.height,
      // Provide a default alt or derive it more meaningfully if possible
      alt: resource.context?.custom?.alt || resource.public_id.replace(/_/g, ' '), 
    }));

    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    // Ensure a proper JSON response even for errors
    return NextResponse.json({ error: 'Failed to fetch images', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}