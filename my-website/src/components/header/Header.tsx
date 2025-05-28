import React from 'react';
import InfoBar from './InfoBar';
import LogoBar from './LogoBar';
import ActionBar from './ActionBar';

const Header = () => {
  return (
    <header className="w-full"> {/* The <header> element is semantic */}
      <InfoBar />
      <LogoBar />
      <ActionBar />
    </header>
  );
};

export default Header;