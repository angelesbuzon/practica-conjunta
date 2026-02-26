import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';

function CardProducto({ producto, isCategory = false }) {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  // Adaptamos los datos de la API de TheMealDB al formato del componente
  const {
    idMeal = 0,
    strMeal = 'Producto sin nombre',
    strMealThumb = 'https://via.placeholder.com/300x200',
    strArea = 'Internacional',
    precio = 15.99
  } = producto || {};

  const liked = isFavorite(idMeal);

  const [showSuccess, setShowSuccess] = useState(false);
  const cartItem = cartItems?.find(item => item.idMeal === idMeal);
  const quantity = cartItem ? cartItem.cantidad : 0;

  const handleAddToCart = async () => {
    // Si el usuario no está logueado, redirigir a Login y abortar
    if (!user) {
      navigate('/login');
      return;
    }

    // Mostrar feedback visual solo si es la primera vez que se añade
    if (quantity === 0) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }

    // Buscamos los detalles completos si no tenemos los ingredientes
    if (!producto.strIngredient1) {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const res = await fetch(`${baseUrl}/meals/lookup.php?i=${idMeal}`);
        if (res.ok) {
          const data = await res.json();
          if (data.meals && data.meals[0]) {
            const fullMeal = { ...producto, ...data.meals[0] };
            fullMeal.precio = producto.precio; // Mantenemos el precio inyectado
            addToCart(fullMeal);
            return;
          }
        }
      } catch (err) {
        console.error("Error fetching full meal details", err);
      }
    }

    // Si ya los tenemos o falló la búsqueda, añadimos lo que hay
    addToCart(producto);
  };

  const handleToggleFavorite = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    toggleFavorite(producto);
  };

  return (
    <article className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col card-hover-effect h-full relative">

      {/* Toast de confirmación flotante */}
      {showSuccess && !isCategory && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-green-500 text-white px-4 py-2 rounded-lg font-bold shadow-xl shadow-green-500/40 flex items-center gap-2 animate-bounce">
          <span className="material-icons">check_circle</span>
          ¡Añadido!
        </div>
      )}

      {/* Imagen del producto */}
      <Link to={isCategory ? `/categoria/${strMeal}` : `/plato/${idMeal}`} className="relative h-48 overflow-hidden group block">
        <img
          alt={strMeal}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={strMealThumb}
        />

        {/* Badge con el origen del plato */}
        <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
          {strArea}
        </div>

        {/* Botón de favorito */}
        {!isCategory && (
          <button
            onClick={(e) => { e.preventDefault(); handleToggleFavorite(); }}
            className={`absolute top-3 right-3 p-2 backdrop-blur-sm rounded-full transition-all z-10 ${liked
              ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 scale-110'
              : 'bg-white/90 dark:bg-black/80 text-gray-400 hover:text-red-500'
              }`}
          >
            <span className="material-icons text-sm">
              {liked ? 'favorite' : 'favorite_border'}
            </span>
          </button>
        )}
      </Link>

      {/* Contenido de la tarjeta */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Título */}
        <div className="flex justify-between items-start mb-2">
          <Link to={isCategory ? `/categoria/${strMeal}` : `/plato/${idMeal}`}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white hover:text-primary cursor-pointer transition-colors line-clamp-1">
              {strMeal}
            </h2>
          </Link>
        </div>

        {/* Descripción */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 line-clamp-2">
          Delicious {strArea} cuisine
        </p>

        {/* Precio y botón de añadir */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800 min-h-[70px]">
          {isCategory ? (
            <Link
              to={`/categoria/${strMeal}`}
              className="w-full text-center bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-lg shadow-primary/30"
            >
              Ver Platos
            </Link>
          ) : (
            <>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Precio</span>
                <span className="text-lg font-bold text-primary">{Number(precio).toFixed(2)}€</span>
              </div>

              {quantity > 0 ? (
                <div className="flex items-center bg-gray-100 dark:bg-stone-800 rounded-lg p-1 border border-stone-200 dark:border-stone-700">
                  <button
                    onClick={() => removeFromCart(idMeal)}
                    className="w-8 h-8 rounded flex items-center justify-center text-stone-600 hover:bg-white dark:hover:bg-stone-700 hover:shadow-sm transition-all bg-transparent border-none cursor-pointer"
                  >
                    <span className="material-icons text-sm">remove</span>
                  </button>
                  <span className="w-8 text-center font-bold text-sm text-deep-green dark:text-white">{quantity}</span>
                  <button
                    onClick={handleAddToCart}
                    className="w-8 h-8 rounded flex items-center justify-center bg-primary text-white shadow-sm hover:brightness-110 transition-all border-none cursor-pointer"
                  >
                    <span className="material-icons text-sm">add</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 shadow-lg shadow-primary/30 active:scale-95"
                >
                  Añadir <span className="material-icons text-sm">add_shopping_cart</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export default CardProducto;
