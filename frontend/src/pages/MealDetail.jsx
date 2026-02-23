import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/mealDetail/Breadcrumb';
import HeroSection from '../components/mealDetail/HeroSection';
import InfoHeader from '../components/mealDetail/InfoHeader';
import IngredientsSection from '../components/mealDetail/IngredientsSection';
import PurchaseCard from '../components/mealDetail/PurchaseCard';
import RecommendationsSection from '../components/mealDetail/RecommendationsSection';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const MealDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [recipeData, setRecipeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const mealId = id || '52772'; // Teriyaki Chicken por defecto si no hay ID
        // Conectar al backend de Symfony, que actúa de proxy a TheMealDB e inyecta el precio.
        const res = await fetch(`${baseUrl}/meals/lookup.php?i=${mealId}`);
        if (!res.ok) throw new Error('Error al contactar con la API del servidor');
        
        const data = await res.json();
        if (!data.meals || !data.meals[0]) {
            setNotFound(true);
            return;
        }
        const meal = data.meals[0];

        // Mapear dinámicamente hasta 20 ingredientes
        const ingredientsList = [];
        for (let i = 1; i <= 20; i++) {
          const name = meal[`strIngredient${i}`];
          const amount = meal[`strMeasure${i}`];
          if (name && name.trim() !== '') {
            ingredientsList.push({
              name: name,
              amount: amount || '',
              // TheMealDB provee una url de imagen de ingredientes base
              img: `https://www.themealdb.com/images/ingredients/${encodeURIComponent(name)}-Small.png`
            });
          }
        }

        setRecipeData({
          id: meal.idMeal,
          category: meal.strCategory || 'General',
          title: meal.strMeal,
          description: meal.strInstructions 
            ? meal.strInstructions.substring(0, 180) + '...' 
            : 'Una deliciosa receta internacional lista para tu paladar.',
          imageAlt: meal.strMeal,
          imageSrc: meal.strMealThumb,
          isBestseller: true,
          rating: '4.8',
          reviewsCount: '1.2k',
          ingredients: ingredientsList,
          purchaseParams: {
            servings: 2,
            portions: 4,
            price: parseFloat(meal.precio || '15.00'),
            originalPrice: parseFloat(meal.precio || '15.00') + 4,
            discount: '15% Off',
            deliveryInfo: {
              urgency: 'Order within 2h 15m',
              time: '7:00 PM today'
            }
          }
        });
      } catch (err) {
        console.error('Error fetching recipe data:', err);
        setError(err.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[70vh] text-center px-4">
        <span className="material-icons text-8xl text-stone-300 dark:text-stone-700 mb-6 block">restaurant_menu</span>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">¡Plato no encontrado!</h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-md mb-8">
          Lo sentimos, no hemos podido encontrar la receta que estás buscando en nuestro catálogo. Es posible que haya sido descatalogada.
        </p>
        <button 
          onClick={() => window.location.href = '/'} 
          className="px-8 py-3 bg-[#ef6c00] text-white rounded-full font-bold shadow-lg hover:bg-[#e65c00] transition-all transform hover:scale-105 border-none cursor-pointer"
        >
          Volver al Menú Principal
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[70vh] text-center px-4">
        <span className="material-icons text-6xl text-red-500 mb-4">error_outline</span>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Error de conexión.</h2>
        <p className="text-gray-500 mb-6">Asegúrate de que el backend de Symfony está encendido en el puerto 8000. Detalles: {error}</p>
        <button onClick={() => window.location.reload()} className="px-6 py-2 bg-[#ef6c00] text-white rounded-full font-bold hover:bg-[#e65c00] border-none cursor-pointer">
          Reintentar
        </button>
      </div>
    );
  }

  if (!recipeData) return null;

  return (
    <main className="max-w-[1400px] w-full mx-auto px-4 md:px-8 lg:px-12 py-8 font-sans">
      <Breadcrumb category={recipeData.category} recipeName={recipeData.title}  />
      
      <div className="lg:grid lg:grid-cols-12 lg:gap-13 xl:gap-24">
        {/* Left Column: Visuals & Content */}
        <div className="lg:col-span-8 space-y-8">
          <HeroSection 
            imageSrc={recipeData.imageSrc}
            imageAlt={recipeData.imageAlt}
            isBestseller={recipeData.isBestseller}
            rating={recipeData.rating}
            reviewsCount={recipeData.reviewsCount}
          />
          <InfoHeader title={recipeData.title} description={recipeData.description} />
          <IngredientsSection 
            ingredients={recipeData.ingredients} 
            pantryCheck={recipeData.pantryCheck} 
          />
        </div>

        {/* Right Column: Sticky Purchase Card */}
        <div className="lg:col-span-4 mt-8 lg:mt-0">
          <PurchaseCard 
            title={recipeData.title + " Kit"}
            servings={recipeData.purchaseParams.servings}
            portions={recipeData.purchaseParams.portions}
            price={recipeData.purchaseParams.price}
            originalPrice={recipeData.purchaseParams.originalPrice}
            discount={recipeData.purchaseParams.discount}
            deliveryInfo={recipeData.purchaseParams.deliveryInfo}
            onAddToCart={(qty) => {
              // Mapear los datos de vuelta al formato que espera el Carrito (propiedades de la API original)
              const cartItemFormat = {
                idMeal: recipeData.id,
                strMeal: recipeData.title,
                strMealThumb: recipeData.imageSrc,
                precio: recipeData.purchaseParams.price.toFixed(2),
                strCategory: recipeData.category,
                strArea: 'General' // O extraer si lo tenemos
              };
              addToCart(cartItemFormat, qty);
              navigate('/cart');
            }}
          />
        </div>
      </div>

      <RecommendationsSection />
    </main>
  );
};

export default MealDetail;
