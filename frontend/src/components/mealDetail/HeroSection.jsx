import React from 'react';

const HeroSection = ({ imageSrc, imageAlt, isBestseller, rating, reviewsCount }) => {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-xl group">
      <img
        alt={imageAlt || "Recipe Hero Image"}
        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
        src={imageSrc || "https://placehold.co/800x450/e2e8f0/64748b?text=Image+Not+Found"}
      />
      <div className="absolute top-4 left-4 flex gap-2">
        {isBestseller && (
          <span className="flex items-center px-4 py-1.5 bg-white/95 text-[#ef6c00] backdrop-blur-sm rounded-full text-[13px] font-extrabold uppercase tracking-widest shadow-md">
            Bestseller
          </span>
        )}
        <span className="flex items-center px-4 py-1.5 bg-white/95 dark:bg-black/90 backdrop-blur-sm rounded-full text-[14px] font-bold tracking-wider text-gray-800 dark:text-white shadow-md">
          <span className="material-icons text-[18px] mr-1.5 text-yellow-500">star</span>
          {rating || '0.0'} <span className="opacity-70 ml-1 font-semibold text-[13px]">({reviewsCount || '0'})</span>
        </span>
      </div>
    </div>
  );
};

export default HeroSection;
