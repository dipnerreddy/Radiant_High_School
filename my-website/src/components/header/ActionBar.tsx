"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';

// These are for the main desktop navigation and will also be part of mobile menu
const mainNavLinks = [
  { label: 'About Us', href: '/about-us' },
  { label: 'Achievements', href: '/achievements' },
  { label: 'Activities', href: '/activities' },
  { label: 'Academics', href: '/academics' },
  { label: 'Faculty & Committees', href: '/faculty-committees' },
  { label: 'Gallery', href: '/gallery' },
];

// These are the links from InfoBar that we want in the mobile menu
const infoBarMobileLinks = [
  { label: 'Alumni', href: '/alumni' },
  { label: 'News', href: '/news' },
];

// Combine them for the mobile menu
const allMobileNavLinks = [...mainNavLinks, ...infoBarMobileLinks];

const ActionBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div
      className="w-full h-[50px] flex items-center md:justify-center px-4 sm:px-6 lg:px-8 relative md:bg-transparent bg-[#F8F9FA]"
    >
      {/* Desktop navigation */}
      <div className="hidden md:block bg-[#1A3E72] text-[#FFD700] w-full absolute left-0 top-0 h-[50px] z-0">
        <nav aria-label="Main navigation" className="h-full flex items-center justify-center">
          <ul className="flex space-x-3 sm:space-x-4 md:space-x-5 lg:space-x-6">
            {/* Desktop menu uses only mainNavLinks */}
            {mainNavLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm sm:text-base hover:text-white transition-colors py-2"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile: Title (centered) and Hamburger button (right) */}
      <div className="md:hidden flex items-center justify-center w-full relative z-10">
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 font-extrabold text-[#1A3E72] text-2xl sm:text-3xl whitespace-nowrap focus:outline-none"
        >
          RADIANT HIGH SCHOOL
        </Link>
        <button
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          className="text-[#1A3E72] p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#1A3E72] ml-auto z-10"
        >
          {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#1A3E72] shadow-lg z-20">
          <nav aria-label="Mobile main navigation">
            <ul className="flex flex-col items-center py-4">
              {/* Mobile menu now uses allMobileNavLinks */}
              {allMobileNavLinks.map((link) => (
                <li key={link.label} className="w-full text-center">
                  <Link
                    href={link.href}
                    onClick={handleLinkClick} // Closes menu on click
                    className="block py-3 px-4 text-[#FFD700] hover:bg-[#2a528a] hover:text-white transition-colors w-full" // Adjusted hover style slightly
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default ActionBar;