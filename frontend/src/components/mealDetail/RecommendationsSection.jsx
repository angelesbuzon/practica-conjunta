import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const RecommendationsSection = () => {
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const res = await fetch(`${baseUrl}/meals/filter.php?c=Side`);
        const data = await res.json();
        
        if (data.meals) {
          // Tomar 4 platos al azar como recomendaciones
          const shuffled = data.meals.sort(() => 0.5 - Math.random());
          const selected = shuffled.slice(0, 4);
          
          const formattedRecs = selected.map(meal => ({
            id: meal.idMeal,
            name: meal.strMeal,
            price: (meal.precio || "4.99") + " €",
            // Mockeamos la calificación para mantener la estética
            rating: (4 + Math.random()).toFixed(1),
            reviews: Math.floor(Math.random() * 900) + 100,
            img: meal.strMealThumb
          }));
          
          setRecommendations(formattedRecs);
        }
      } catch (err) {
        console.error("Error fetching recommendations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const handleAdd = (item, idx) => {
    // Convertir el precio mock ("4.50 €") a un número decimal para el contexto ("4.50")
    const numericPrice = item.price.replace(' €', '').trim();
    
    // Generar un sufijo único si se añade múltiples veces el mismo acompañante como items separados
    // o simplemente usar su id verdadero
    const cartFormatItem = {
      idMeal: item.id, 
      strMeal: item.name,
      strMealThumb: item.img,
      precio: numericPrice,
      strCategory: 'Acompañante',
      strArea: 'General'
    };
    
    addToCart(cartFormatItem, 1);
    
    // Feedback visual temporal
    setAddedItems(prev => ({ ...prev, [idx]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [idx]: false }));
    }, 1500);
  };

  if (loading) {
    return (
      <div className="mt-8 pt-8">
        <h2 className="text-[22px] font-extrabold text-[#1a1b24] mb-6">Complete Your Meal</h2>
        <div className="flex gap-5 overflow-x-auto">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="min-w-[260px] h-[340px] bg-gray-100 animate-pulse rounded-[1.2rem]"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 pt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[22px] font-extrabold text-[#1a1b24]">Complete Your Meal</h2>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full border border-orange-600 bg-orange-500 hover:bg-orange-700 text-white flex items-center justify-center transition-colors shadow-sm">
            <span className="material-icons text-sm">chevron_left</span>
          </button>

          <button className="w-8 h-8 rounded-full border border-orange-600 bg-orange-500 hover:bg-orange-700 text-white flex items-center justify-center transition-colors shadow-sm">
            <span className="material-icons text-sm">chevron_right</span>
          </button>
        </div>
      </div>
      
      <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4 snap-x">
        {recommendations.map((item, idx) => (
          <div key={idx} className="min-w-[260px] snap-start bg-white rounded-[1.2rem] overflow-hidden group shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 flex flex-col">
            <Link to={`/plato/${item.id}`} className="h-44 overflow-hidden relative block group-hover:cursor-pointer">
              <img alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={item.img} />
              
              {/* Corazón en la imagen */}
              <button 
                className="absolute top-3 right-3 w-8 h-8 bg-white/95 rounded-full text-gray-300 hover:text-red-500 transition-colors shadow-sm flex items-center justify-center border border-gray-100"
                onClick={(e) => {
                  e.preventDefault(); // Evitar navegación al hacer clic en el corazón
                  // Lógica del corazón favorita...
                }}
              >
                <span className="material-icons text-[16px]">favorite_border</span>
              </button>
            </Link>
            
            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <Link to={`/plato/${item.id}`} className="hover:text-primary transition-colors block">
                  <h3 className="font-extrabold text-[#1a1b24] text-[15px] truncate hover:text-primary transition-colors">{item.name}</h3>
                </Link>
                <div className="flex items-center gap-1 mt-1.5 mb-5">
                  <span className="material-icons text-[15px] text-[#FFC107]">star</span>
                  <span className="text-[13px] font-bold text-gray-700">{item.rating}</span>
                  <span className="text-[12px] text-gray-400 font-medium ml-0.5">({item.reviews})</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-auto">
                <span className="font-extrabold text-primary text-[16px]">{item.price}</span>
                <button 
                  onClick={() => handleAdd(item, idx)}
                  className={`w-8 h-8 rounded-full transition-colors flex items-center justify-center border-none cursor-pointer ${
                    addedItems[idx] 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-primary/10 text-primary hover:bg-primary/20'
                  }`}
                >
                  <span className="material-icons text-[18px]">
                    {addedItems[idx] ? 'check' : 'add'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsSection;
