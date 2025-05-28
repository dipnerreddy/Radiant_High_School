// src/components/faculty/FacultyGrid.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import FacultyCard from './FacultyCard';

interface FacultyMember {
  ID: string;
  Name: string;
  Qualification: string;
  Department?: string;
  ImageUrl: string; // Can be an empty string if no image
}

const FacultyGrid = () => {
  const [facultyMembers, setFacultyMembers] = useState<FacultyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const csvUrl = process.env.NEXT_PUBLIC_FACULTY_DATA_CSV_URL;

      if (!csvUrl) {
        setError("Faculty data source URL is not configured.");
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
              console.error("CSV Parsing errors (Faculty):", results.errors);
              setError("Error parsing faculty data. Check CSV format/headers.");
              setLoading(false);
              return;
            }
            const typedData = results.data as FacultyMember[];
            // Optional: sort by name or other criteria
            const sortedData = typedData
             .filter(item => item.ID && item.Name) // Basic validation
             .sort((a, b) => a.Name.localeCompare(b.Name));
            setFacultyMembers(sortedData);
            setLoading(false);
          },
          error: (err: any) => {
            console.error("PapaParse download error (Faculty):", err);
            setError(`Failed to download or parse faculty data. Error: ${err.message || 'Unknown PapaParse error'}`);
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


  return (
    <section className="py-12 md:py-16 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-10 md:mb-12">
          Meet Our Esteemed Faculty
        </h2>
        {loading && <p className="text-center text-slate-600">Loading faculty information...</p>}
        {!loading && error && <p className="text-center text-red-500">Error: {error}</p>}
        {!loading && !error && facultyMembers.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {facultyMembers.map((faculty) => (
              <FacultyCard
                key={faculty.ID}
                imageUrl={faculty.ImageUrl} // Pass empty string if no image
                name={faculty.Name}
                qualification={faculty.Qualification}
                department={faculty.Department}
              />
            ))}
          </div>
        )}
        {!loading && !error && facultyMembers.length === 0 && (
          <p className="text-center text-slate-600">Faculty information coming soon.</p>
        )}
      </div>
    </section>
  );
};

export default FacultyGrid;