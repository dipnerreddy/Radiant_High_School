// src/components/footer/FooterF2.tsx
import React from 'react';

const FooterF2 = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full h-[50px] bg-gray-900 text-gray-400 flex justify-center items-center">
      <p className="text-xs sm:text-sm">
        © {currentYear} Radiant High School, Nunna. All Rights Reserved.
      </p>
    </div>
  );
};

export default FooterF2;