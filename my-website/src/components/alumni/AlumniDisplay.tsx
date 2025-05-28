// src/components/alumni/AlumniDisplay.tsx
"use client";

import React, { useEffect, useState } from 'react'; // Removed useMemo as it wasn't being used
import Papa from 'papaparse';
import AlumniCard from './AlumniCard';

interface Alumnus {
  ID?: string;
  Name: string;
  PassoutYear: string;
  MobileNumber: string;
  ImageUrl: string;
}

const AlumniDisplay = () => {
  const [allAlumni, setAllAlumni] = useState<Alumnus[]>([]);
  const [filteredAlumni, setFilteredAlumni] = useState<Alumnus[]>([]);
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const csvUrl = process.env.NEXT_PUBLIC_ALUMNI_DATA_CSV_URL;

      if (!csvUrl) {
        setError("Alumni data source URL is not configured.");
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
              setError("Error parsing alumni data. Check CSV format.");
              setLoading(false);
              return;
            }
            const typedData = (results.data as Alumnus[]).filter(
              (item) => item.Name && item.PassoutYear // Filter out rows with missing essential data
            );
            setAllAlumni(typedData);

            const years = [
              ...new Set(typedData.map((a) => a.PassoutYear.trim()).filter(Boolean)), // Trim and filter empty years
            ].sort((a, b) => parseInt(b) - parseInt(a));
            setAvailableYears(years);
            if (years.length > 0) {
              setSelectedYear(years[0]);
            }
            setLoading(false);
          },
          error: (err: any) => {
            console.error("PapaParse download error:", err);
            setError("Failed to download or parse alumni data.");
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

  useEffect(() => {
    if (selectedYear && allAlumni.length > 0) {
      const filtered = allAlumni
        .filter(alumnus => alumnus.PassoutYear === selectedYear)
        .sort((a, b) => a.Name.localeCompare(b.Name));
      setFilteredAlumni(filtered);
    } else {
      setFilteredAlumni([]);
    }
  }, [selectedYear, allAlumni]);

  if (loading) {
    return <p className="text-center text-lg py-10">Loading alumni data...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">Error: {error}</p>;
  }

  return (
    <section className="py-10 md:py-16 bg-slate-50"> {/* This was bg-slate-50, matching other page sections */}
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-8 md:mb-10">
          Our Esteemed Alumni
        </h2>

        {availableYears.length > 0 && (
          <div className="mb-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4"> {/* Reduced gap for smaller screens */}
            <label htmlFor="year-select" className="font-medium text-slate-700 mb-2 sm:mb-0"> {/* Added margin bottom for mobile */}
              Select Passout Year:
            </label>
            <select
              id="year-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              // ADDED text-slate-900 or text-black
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-slate-900 bg-white"
            >
              {/* You can add a default "Select Year" option if desired */}
              {/* <option value="" disabled={selectedYear !== ''}>-- Select a Year --</option> */}
              {availableYears.map(year => (
                // Option tags can also have text color, but select's color often dictates the displayed one
                <option key={year} value={year} className="text-slate-800">
                  {year}
                </option>
              ))}
            </select>
          </div>
        )}

        {filteredAlumni.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAlumni.map((alumnus, index) => (
              <AlumniCard
                key={alumnus.ID || index}
                name={alumnus.Name}
                passoutYear={alumnus.PassoutYear}
                mobileNumber={alumnus.MobileNumber}
                imageUrl={alumnus.ImageUrl}
              />
            ))}
          </div>
        ) : (
          selectedYear && <p className="text-center text-slate-600">No alumni found for the year {selectedYear}.</p>
        )}
         {!selectedYear && allAlumni.length > 0 && <p className="text-center text-slate-600">Please select a year to view alumni.</p>}
         {allAlumni.length === 0 && !loading && <p className="text-center text-slate-600">No alumni data available at the moment.</p>}
      </div>
    </section>
  );
};

export default AlumniDisplay;