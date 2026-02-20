import React from 'react';

const InfoHeader = ({ title, description }) => {
  return (
    <div className="lg:hidden">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{title || 'Recipe Title'}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        {description || 'Recipe description goes here. It provides a brief overview of what the recipe is all about.'}
      </p>
    </div>
  );
};

export default InfoHeader;
