// src/components/footer/Footer.tsx
import React from 'react';
import FooterF1 from './FooterF1';
import FooterF2 from './FooterF2';

const Footer = () => {
  return (
    <footer className="w-full">
      <FooterF1 />
      <FooterF2 />
    </footer>
  );
};

export default Footer;