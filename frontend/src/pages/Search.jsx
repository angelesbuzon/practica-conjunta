import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CardProducto from '../components/CardProducto';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setProductos([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const url = `${baseUrl}/meals/search.php?s=${encodeURIComponent(query)}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al realizar la búsqueda');
        }
        return response.json();
      })
      .then(data => {
        if (data.meals && Array.isArray(data.meals)) {
          const platosFormateados = data.meals.map(meal => ({
            idMeal: meal.idMeal,
            strMeal: meal.strMeal,
            strMealThumb: meal.strMealThumb,
            strArea: meal.strArea || 'Varios',
            precio: meal.precio ? parseFloat(meal.precio) : 12.99
          }));
          setProductos(platosFormateados);
        } else {
          setProductos([]); // No se encontraron resultados
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching search results:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [query]);

  return (
    <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {query ? `Resultados de búsqueda para "${query}"` : 'Realiza una búsqueda'}
        </h1>
        {query && !loading && (
          <p className="text-gray-500 dark:text-gray-400">
            Se han encontrado {productos.length} resultados
          </p>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center min-h-[200px] bg-red-50 rounded-xl">
          <p className="text-lg text-red-600">Error: {error}</p>
        </div>
      ) : productos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productos.map(producto => (
            <CardProducto 
              key={producto.idMeal} 
              producto={producto} 
              isCategory={false} 
            />
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <span className="material-icons text-6xl text-gray-300 mb-4 block">search_off</span>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No hemos encontrado ningún plato</h2>
          <p className="text-gray-500">Prueba a buscar con otros términos o ingredientes.</p>
        </div>
      ) : null}
    </main>
  );
}
