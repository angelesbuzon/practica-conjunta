import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        // Aquí podrías hacer también la llamada a fetch('/api/logout')
    };

    const checkSession = async () => {
        if (!user) return;

        try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL;
            // Usamos /favorites como endpoint ligero para verificar sesión (401 si expiró)
            const response = await fetch(`${baseUrl}/favorites`, {
                credentials: 'include'
            });
            if (response.status === 401) {
                logout();
            }
        } catch (error) {
            console.error('Error verificando sesión:', error);
        }
    };

    // Al cargar la app, revisamos si la sesión sigue activa en el backend
    useEffect(() => {
        if (user) {
            checkSession();
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, checkSession }}>
            {children}
        </AuthContext.Provider>
    );
};
