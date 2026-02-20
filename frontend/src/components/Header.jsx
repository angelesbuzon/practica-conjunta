import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import logoUrl from '../img/logo.png';

// Componente del Encabezado (Header)
const Header = () => {
const { cartCount, totalPrice } = useCart();
// Estado para controlar si el buscador movil esta abierto
const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo del restaurante (solo icono en movil, completo en desktop) */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 cursor-pointer">
            <img 
              alt="" 
              className="w-auto h-16" 
              src={logoUrl} 
            />
            <span className="hidden md:block font-bold text-xl tracking-tight text-gray-900">Come y <span className="text-primary">Calla</span></span>
          </Link>

          {/* Buscador para ordenadores (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-icons text-black group-hover:text-primary group-focus-within:text-primary transition-colors">search</span>
              </div>
              <input
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary sm:text-sm transition-shadow duration-200"
                placeholder="Buscar recetas, ingredientes..."
                type="text"
              />
            </div>
          </div>

          {/* Iconos de acciones (Perfil, Carrito, Menu) */}
          <div className="flex items-center gap-4">
            {/* Perfil de usuario (Historial MOCKEADO ahora apuntará a history) */}
            <Link to="/history" className="p-2 rounded-full hover:bg-primary/10 transition-colors relative group">
              <span className="material-icons text-black group-hover:text-primary active:text-primary transition-colors">person_outline</span>
            </Link>

            {/* Bolsa de la compra estilizada (tipo pastilla) */}
            <Link to="/cart" className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-all relative group">
              <span className="material-icons text-primary transition-colors">shopping_bag</span>
              <span className="text-primary font-bold text-sm sm:text-base">{totalPrice} €</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-[20px] px-1 bg-primary text-white text-[11px] font-bold rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>   

            {/* Botón para moviles (abre el buscador) */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors group"
            >
              <span className="material-icons text-black group-hover:text-primary active:text-primary transition-colors">
                {isMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Buscador especial para vista movil */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pb-4">
          <div className="relative w-full group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-icons text-black group-hover:text-primary active:text-primary group-focus-within:text-primary transition-colors">search</span>
            </div>
            <input
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary sm:text-sm transition-shadow duration-200"
              placeholder="Buscar..."
              type="text"
              autoFocus={isMenuOpen}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
