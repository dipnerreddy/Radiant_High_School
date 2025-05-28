// src/components/header/InfoBar.tsx
import React from 'react';
import Link from 'next/link';

const InfoBar = () => {
  const mailTo = "radianthighschoolnunna@gmail.com";
  const phoneTo = "+919848822882";
  const mapLink = "https://maps.app.goo.gl/W8ADBFULWZRgQrVz5";

  const navItems = [
    {
      icon: '📧',
      label: mailTo,
      href: `mailto:${mailTo}`,
      external: true,
    },
    {
      icon: '📞',
      label: phoneTo,
      href: `tel:${phoneTo}`,
      external: true,
    },
    {
      icon: '📍',
      label: 'Contact Us',
      href: mapLink,
      external: true,
      target: '_blank',
    },
    {
      icon: '🧑‍🤝‍🧑',
      label: 'Alumni',
      href: '/alumni',
      external: false,
    },
    {
      icon: '📰',
      label: 'News',
      href: '/news',
      external: false,
    },
  ];

  return (
    // Hides on mobile, shows from md screen size
    <div className="hidden md:flex w-full bg-slate-200 h-[50px] items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="flex space-x-6 md:space-x-8 lg:space-x-10">
        {navItems.map((item) =>
          item.external ? (
            <a
              key={item.label}
              href={item.href}
              target={item.target || '_self'}
              rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
              className="text-sm text-slate-700 hover:text-slate-900 flex items-center space-x-2 transition-colors"
            >
              <span aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ) : (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm text-slate-700 hover:text-slate-900 flex items-center space-x-2 transition-colors"
            >
              <span aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default InfoBar;
