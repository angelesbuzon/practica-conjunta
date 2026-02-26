import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';

function CardProducto({ producto, isCategory = false }) {
  const { addToCart } = useCart();
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

  const handleAddToCart = () => {
    // Si el usuario no está logueado, redirigir a Login y abortar
    if (!user) {
      navigate('/login');
      return;
    }
    // Añadimos el producto al carrito usando el contexto
    addToCart(producto);
    console.log('Añadido al carrito:', producto.strMeal);
  };

  const handleToggleFavorite = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    toggleFavorite(producto);
  };

  return (
    <article className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col card-hover-effect h-full">
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
            className={`absolute top-3 right-3 p-2 backdrop-blur-sm rounded-full transition-all z-10 ${
              liked
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
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
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
              <button 
                onClick={handleAddToCart}
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 shadow-lg shadow-primary/30"
              >
                Añadir <span className="material-icons text-sm">add_shopping_cart</span>
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export default CardProducto;
