import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CardProducto from '../components/CardProducto';

function Categoria() {
  const { cat: categoryParam } = useParams(); // e.g., /categoria/Chicken

  const [productos, setProductos] = useState([]);
  const [precioMaximo, setPrecioMaximo] = useState(30); // Estado para el filtro de precio
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    
    // Si hay un parámetro de categoría, buscamos los platos de esa categoría
    // Si no, mostramos todas las categorías disponibles
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const url = categoryParam 
      ? `${baseUrl}/meals/filter.php?c=${categoryParam}`
      : `${baseUrl}/meals/categories.php`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar los datos');
        }
        return response.json();
      })
      .then(data => {
        if (categoryParam) {
          // La API devuelve { meals: [...] } para filter.php
          if (data.meals && Array.isArray(data.meals)) {
            const platosFormateados = data.meals.map(meal => ({
              idMeal: meal.idMeal,
              strMeal: meal.strMeal,
              strMealThumb: meal.strMealThumb,
              strArea: categoryParam, // Usamos el nombre de la categoría como área
              precio: meal.precio ? parseFloat(meal.precio) : 12.99 // El proxy inyecta el precio, o usamos uno por defecto
            }));
            setProductos(platosFormateados);
          } else {
            setProductos([]);
          }
        } else {
          // La API devuelve { categories: [...] } para categories.php
          if (data.categories && Array.isArray(data.categories)) {
            const categoriasFormateadas = data.categories.map(cat => ({
              idMeal: cat.idCategory,
              strMeal: cat.strCategory,
              strMealThumb: cat.strCategoryThumb,
              strArea: cat.strCategory,
              precio: parseFloat('15.99') // Precio por defecto para categorías
            }));
            setProductos(categoriasFormateadas);
          } else {
            setProductos([]);
          }
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [categoryParam]);

  if (loading) {
    return (
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-lg text-gray-500">Cargando platos...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-lg text-red-500">Error: {error}</p>
        </div>
      </main>
    );
  }

  // Filtramos los productos basándonos en el precio máximo seleccionado
  const productosFiltrados = productos.filter(producto => producto.precio <= precioMaximo);

  return (
    <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
          {/* Mobile Filter Toggle (Visible only on small screens) */}
          <div className="lg:hidden mb-4">
            <button className="w-full flex items-center justify-center gap-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-medium text-gray-700 dark:text-gray-200">
              <span className="material-icons">tune</span>
              Show Filters
            </button>
          </div>
          
          <div className="hidden lg:block space-y-8 sticky top-24">
            {/* Price Range Slider */}
            <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Precio máximo</h3>
              <div className="relative pt-6 pb-2">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="absolute top-0 left-0 h-1 bg-primary rounded-full" style={{width: 'calc(60% - 2px)'}}></div>
                <input 
                  type="range" 
                  min="0" 
                  max="50" 
                  step="1"
                  defaultValue="30"
                  className="absolute top-0 left-0 w-full h-1 bg-transparent appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:shadow"
                  onInput={(e) => {
                    const percent = (e.target.value / e.target.max) * 100;
                    // Ajustamos el ancho para que termine justo donde empieza el borde del círculo
                    // El círculo mide 16px, su centro está a 8px, y el borde a 2px del centro
                    e.target.previousElementSibling.style.width = `calc(${percent}% - ${percent === 0 ? 0 : percent === 100 ? 0 : 2}px)`;
                    e.target.parentElement.nextElementSibling.children[1].textContent = e.target.value + '€';
                    setPrecioMaximo(Number(e.target.value));
                  }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>0€</span>
                <span className="font-medium text-primary">30€</span>
                <span>50€</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Recipe Grid */}
        <section className="flex-grow">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {categoryParam ? `Platos de ${categoryParam}` : 'Categorías Disponibles'}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Mostrando <span className="font-semibold text-gray-900 dark:text-white">{productosFiltrados.length}</span> {categoryParam ? 'platos' : 'categorías'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {productosFiltrados.map(producto => (
              <CardProducto 
                key={producto.idMeal} 
                producto={producto} 
                isCategory={!categoryParam} 
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Categoria;