import React from 'react';

const Breadcrumb = ({ category, recipeName }) => {
  return (
    <nav className="flex text-base font-medium text-gray-500 mb-8" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li><a className="hover:text-[#ef6c00] transition-colors" href="#">Home</a></li>
        <li><span className="material-icons text-sm opacity-60">chevron_right</span></li>
        <li><a className="hover:text-[#ef6c00] transition-colors" href="#">{category || 'Recipes'}</a></li>
        <li><span className="material-icons text-sm opacity-60">chevron_right</span></li>
        <li aria-current="page" className="font-extrabold text-[#ef6c00] tracking-wide ml-1">{recipeName || 'Recipe Name'}</li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
