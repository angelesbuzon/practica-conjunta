import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ category, recipeName }) => {
  return (
    <nav className="flex text-base font-medium text-gray-500 mb-8" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li><Link className="hover:text-[#ef6c00] transition-colors" to="/">Home</Link></li>
        <li><span className="material-icons text-sm opacity-60">chevron_right</span></li>
        <li><Link className="hover:text-[#ef6c00] transition-colors" to={`/categoria/${category || ''}`}>{category || 'Recipes'}</Link></li>
        <li><span className="material-icons text-sm opacity-60">chevron_right</span></li>
        <li aria-current="page" className="font-extrabold text-[#ef6c00] tracking-wide ml-1">{recipeName || 'Recipe Name'}</li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
