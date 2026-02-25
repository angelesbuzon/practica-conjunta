import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    useCallback,
} from "react";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState(new Set());
    const [loading, setLoading] = useState(false);

    // Cargar favoritos al iniciar sesión
    const fetchFavorites = useCallback(async () => {
        if (!user) {
            setFavorites(new Set());
            return;
        }
        setLoading(true);
        try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL;
            const res = await fetch(`${baseUrl}/favorites`, {
                credentials: "include",
            });
            if (res.ok) {
                const data = await res.json();
                setFavorites(new Set(data.favorites));
            }
        } catch (err) {
            console.error("Error al cargar favoritos:", err);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]);

    const isFavorite = (apiId) => favorites.has(String(apiId));

    const toggleFavorite = async (producto) => {
        if (!user) return false;

        const apiId = String(producto.idMeal);
        const wasFav = isFavorite(apiId);

        // Actualización optimista
        setFavorites((prev) => {
            const next = new Set(prev);
            if (wasFav) {
                next.delete(apiId);
            } else {
                next.add(apiId);
            }
            return next;
        });

        try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL;
            const url = `${baseUrl}/favorites/${apiId}`;
            const res = await fetch(url, {
                method: wasFav ? "DELETE" : "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: wasFav
                    ? undefined
                    : JSON.stringify({
                          strMeal: producto.strMeal,
                          strMealThumb: producto.strMealThumb,
                          strArea: producto.strArea,
                          precio: producto.precio,
                      }),
            });

            if (!res.ok) {
                // Revertir si falla
                setFavorites((prev) => {
                    const next = new Set(prev);
                    if (wasFav) {
                        next.add(apiId);
                    } else {
                        next.delete(apiId);
                    }
                    return next;
                });
            }
        } catch (err) {
            console.error("Error al toggle favorito:", err);
            // Revertir
            setFavorites((prev) => {
                const next = new Set(prev);
                if (wasFav) {
                    next.add(apiId);
                } else {
                    next.delete(apiId);
                }
                return next;
            });
        }
    };

    return (
        <FavoritesContext.Provider
            value={{ favorites, isFavorite, toggleFavorite, loading }}
        >
            {children}
        </FavoritesContext.Provider>
    );
};
