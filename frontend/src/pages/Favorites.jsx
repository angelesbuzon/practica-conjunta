import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import CardProducto from '../components/CardProducto';

export default function Favorites() {
    const { user } = useAuth();
    const { favorites, loading: favsLoading } = useFavorites();
    const navigate = useNavigate();
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
    }, [user, navigate]);

    // Cuando cambian los favoritos, cargar los datos de cada plato desde la API
    useEffect(() => {
        if (!user || favsLoading) return;

        const fetchFavoriteMeals = async () => {
            if (favorites.size === 0) {
                setMeals([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const mealPromises = Array.from(favorites).map(async (apiId) => {
                    const res = await fetch(`http://localhost:8001/api/meals/lookup?i=${apiId}`);
                    if (res.ok) {
                        const data = await res.json();
                        return data.meals?.[0] || null;
                    }
                    return null;
                });

                const results = await Promise.all(mealPromises);
                setMeals(results.filter(Boolean));
            } catch (err) {
                console.error('Error al cargar platos favoritos:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchFavoriteMeals();
    }, [favorites, favsLoading, user]);

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/profile" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <span className="material-icons text-gray-600">arrow_back</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className="material-icons text-4xl text-red-500 bg-red-50 p-3 rounded-full">favorite</span>
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Mis Favoritos</h1>
                            <p className="text-gray-500">{favorites.size} plato{favorites.size !== 1 ? 's' : ''} guardado{favorites.size !== 1 ? 's' : ''}</p>
                        </div>
                    </div>
                </div>

                {/* Contenido */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : meals.length === 0 ? (
                    <div className="text-center py-20">
                        <span className="material-icons text-6xl text-gray-300 mb-4 block">favorite_border</span>
                        <h2 className="text-2xl font-bold text-gray-400 mb-2">No tienes favoritos aún</h2>
                        <p className="text-gray-400 mb-6">Explora nuestros platos y marca los que más te gusten.</p>
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg shadow-primary/30"
                        >
                            <span className="material-icons text-sm">restaurant_menu</span>
                            Explorar Platos
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {meals.map((meal) => (
                            <CardProducto key={meal.idMeal} producto={meal} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
