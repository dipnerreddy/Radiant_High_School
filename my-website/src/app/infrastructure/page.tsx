// src/app/infrastructure/page.tsx
import React from 'react';

export const metadata = {
  title: 'Infrastructure',
};

const InfrastructurePage = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Infrastructure</h1>
      <p className="text-lg">
        Explore our campus facilities, labs, libraries, and other infrastructure.
      </p>
      {/* Add more content specific to the Infrastructure page here */}
    </div>
  );
};

export default InfrastructurePage;