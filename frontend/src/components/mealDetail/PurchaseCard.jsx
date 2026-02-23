import React, { useState } from 'react';

const PurchaseCard = ({ 
  title, 
  servings, 
  portions, 
  price, 
  originalPrice, 
  discount, 
  deliveryInfo,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="sticky top-24 space-y-6">
      {/* Main Purchase Card */}
      <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 p-6 sm:p-8 overflow-hidden relative">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-60"></div>
        
        <div className="hidden lg:block mb-6 relative z-10">
          <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">{title || 'Kit de Receta'}</h1>
          <p className="text-sm font-medium text-gray-500 mt-2">Para {servings || 1} personas • {portions || 1} Raciones generosas</p>
        </div>
        
        <div className="flex items-end gap-3 mb-8 relative z-10">
          <span className="text-[2.5rem] leading-none font-extrabold text-[#ef6c00]">{(price * quantity)?.toFixed(2) || '0.00'} €</span>
          {originalPrice && (
             <span className="text-gray-400 text-lg mb-1 line-through font-medium">{(originalPrice * quantity).toFixed(2)} €</span>
          )}
          {discount && (
             <span className="mb-2 ml-auto px-2.5 py-1 bg-[#e8f5e9] text-[#2e7d32] text-[11px] font-black rounded uppercase tracking-wide">{discount}</span>
          )}
        </div>
        
        {/* Quantity Stepper */}
        <div className="flex items-center justify-between mb-6 p-2 bg-gray-50 rounded-2xl relative z-10 border border-gray-100">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-white shadow-sm text-gray-700 hover:text-[#ef6c00] hover:shadow-md transition-all"
          >
            <span className="material-icons">remove</span>
          </button>
          <span className="font-extrabold text-lg text-gray-900">{quantity} Kit{quantity > 1 ? 's' : ''}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-white shadow-sm text-gray-700 hover:text-[#ef6c00] hover:shadow-md transition-all"
          >
            <span className="material-icons">add</span>
          </button>
        </div>

        {/* Delivery Info */}
        {deliveryInfo && (
          <div className="flex items-start gap-3 mb-8 p-4 bg-[#f0f4f8] rounded-xl relative z-10">
            <span className="material-icons text-blue-600 mt-0.5">local_shipping</span>
            <div>
              <p className="text-sm font-bold text-[#142354]">{deliveryInfo.urgency}</p>
              <p className="text-sm text-blue-600 mt-0.5">Recíbelo a las <span className="font-bold">{deliveryInfo.time}</span></p>
            </div>
          </div>
        )}

        {/* CTA Button */}
        <button 
          onClick={() => onAddToCart && onAddToCart(quantity)}
          className="relative z-10 w-full bg-[#ef6c00] hover:bg-[#e65100] text-white font-bold text-xl py-4 flex items-center justify-center gap-2 rounded-2xl shadow-[0_8px_20px_rgba(239,108,0,0.3)] transform hover:-translate-y-0.5 transition-all"
        >
          Añadir a la Cesta
          <span className="material-icons text-lg">shopping_basket</span>
        </button>
        
        <p className="relative z-10 text-center text-sm text-gray-400 mt-5 flex items-center justify-center gap-1.5 font-medium">
          <span className="material-icons text-base">verified_user</span> 100% Garantía de Frescura
        </p>
      </div>

    </div>
  );
};

export default PurchaseCard;
