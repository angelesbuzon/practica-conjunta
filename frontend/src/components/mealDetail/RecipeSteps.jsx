import React from 'react';

const RecipeSteps = ({ steps = [], onFullGuideClick }) => {
  if (!steps || steps.length === 0) return null;

  return (
    <div>
      <div className="space-y-6 relative pl-4 border-l-2 border-gray-200 dark:border-gray-800 ml-3">
        {steps.map((step, index) => {
          return (
            <div key={index} className="relative pl-6">
              <div className="absolute -left-[31px] top-0 bg-white dark:bg-[#221810] p-1">
                <div 
                  className={`w-8 h-8 rounded-sm flex items-center justify-center font-bold text-sm bg-gray-900 text-white shadow-md`}
                >
                  {index + 1}
                </div>
              </div>
              {/* Hemos quitado el <h3> con el título del paso */}
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-[15px] pt-1.5">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
      
      {onFullGuideClick && (
        <button 
          onClick={onFullGuideClick}
          className="mt-6 text-gray-800 font-bold hover:text-black flex items-center gap-1 transition-colors text-sm"
        >
          View full step-by-step guide <span className="material-icons text-sm">arrow_forward</span>
        </button>
      )}
    </div>
  );
};

export default RecipeSteps;
