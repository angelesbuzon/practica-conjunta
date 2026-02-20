import React from 'react';

const IngredientsSection = ({ ingredients = [], pantryCheck }) => {
  return (
    <div>
      <h2 className="text-[26px] font-extrabold mb-8 text-[#1a1b24] flex items-center gap-3">
        {/* Usamos un check o inventory acorde a su icono visual. En su captura se ve un emoji o caja pequeñita */}
        <span className="material-icons text-[#ef6c00] text-3xl">inventory_2</span> What's in the box
      </h2>
      
      {ingredients.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {ingredients.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-gray-100/80 flex flex-col items-center text-center gap-4 shadow-[0_2px_15px_rgb(0,0,0,0.02)]">
              {/* Círculo tenue estilo beige atrás de la imagen */}
              <div className="w-20 h-20 rounded-full bg-[#faf5f0] flex items-center justify-center overflow-hidden">
                {/* Imagen del ingrediente ajustada (un poco de margin o size) */}
                <div className="w-14 h-14 bg-white rounded flex items-center justify-center shadow-sm overflow-hidden">
                  <img alt={item.name} className="w-full h-full object-cover" src={item.img} />
                </div>
              </div>
              <div className="space-y-1 mt-2">
                <p className="font-extrabold text-[15px] text-[#1a1b24] tracking-wide">{item.name}</p>
                <p className="text-sm font-medium text-gray-400">{item.amount}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No ingredients listed.</p>
      )}

      {pantryCheck && (
        <div className="mt-8 p-4 rounded-xl bg-[#fff8ef] border border-[#fef0dd]">
          <p className="text-[14px] text-gray-600 flex items-start gap-3">
            <span className="material-icons text-[#ef6c00] text-xl">info</span>
            <span><strong className="text-[#1a1b24] font-extrabold">Pantry check:</strong> {pantryCheck}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default IngredientsSection;
