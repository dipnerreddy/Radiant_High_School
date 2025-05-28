// src/components/header/LogoBar.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const LogoBar = () => {
  return (
    // Hidden by default, hidden on md, visible as flex on lg and up
    <div className="hidden md:hidden lg:flex w-full bg-[#F8F9FA] items-center justify-center h-[150px]">
      {/* The rest of your LogoBar content remains the same for desktop view */}
      <div className="relative w-full h-full max-w-[1440px]">
        <Link href="/" aria-label="Homepage" className="flex items-center justify-center h-full">
          {/* Desktop Logo - This is the only logo needed now if InfoBar is only on lg+ */}
          <div className="relative w-full h-full max-w-[1440px]">
             <Image
              src="/logobar.png" // Path to your desktop logo
              alt="Company Logo"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LogoBar;