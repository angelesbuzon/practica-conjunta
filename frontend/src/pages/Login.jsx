import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoUrl from '../img/logo_no_bg.png';
import bgImage from '../img/vegetables.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        try {
            const response = await fetch(`${baseUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                login(data);
                navigate('/history'); // Or wherever appropriate
            } else {
                const data = await response.json();
                setError(data.error || 'Credenciales inválidas');
            }
        } catch (err) {
            setError('Error de conexión con el servidor.');
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-text-dark antialiased min-h-[calc(100vh-160px)] flex flex-col overflow-hidden">
            <div className="grow flex w-full h-full">
                {/* Left Side: Visual Showcase */}
                <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-background-dark">
                    <div className="absolute inset-0 z-0">
                        <img alt="Fresh vegetables" className="w-full h-full object-cover opacity-90" src={bgImage}/>
                        <div className="absolute inset-0 bg-linear-to-t from-background-dark/90 via-background-dark/30 to-transparent"></div>
                    </div>
                    
                    <div className="relative z-10 w-full h-full flex flex-col justify-between p-12 text-white">
                        <div className="flex items-center gap-2">
                            <img alt="Come y Calla Logo" className="w-auto h-20" src={logoUrl}/>
                            <span className="text-2xl font-bold tracking-tight">Come y Calla</span>
                        </div>
                        <div className="max-w-md mb-12 animate-fade-in">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-2xl font-bold tracking-tight">Come y Calla</span>
                            </div>
                            <h1 className="text-5xl font-bold mb-6 leading-tight">Ingredientes frescos, <br/> maestría <span className="text-primary">culinaria</span>.</h1>
                            <p className="text-lg text-gray-200 font-light leading-relaxed">
                                Únete a miles de entusiastas de la comida descubriendo nuevos platos y recibiendo ingredientes frescos de la granja en su puerta.
                            </p>
                            <div className="mt-8 flex items-center gap-4 pt-8 border-t border-white/10">
                                <img alt="Chef Portrait" className="w-12 h-12 rounded-full border-2 border-primary object-cover" src="https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"/>
                                <div>
                                    <p className="text-sm font-medium">"La calidad de la albahaca esta semana es excepcional."</p>
                                    <p className="text-xs text-gray-400">Chef Aitor Tilla., Estrella Michelin</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-background-cream dark:bg-background-dark relative p-6 lg:p-12">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>
                    
                    <div className="lg:hidden absolute top-6 left-6 flex items-center gap-2">
                        <img alt="Come y Calla Logo" className="w-auto h-16" src={logoUrl}/>
                        <span className="text-xl font-bold text-text-dark dark:text-white">Come y Calla</span>
                    </div>
                    
                    <div className="w-full max-w-md z-10 bg-white dark:bg-white/5 p-8 rounded-2xl shadow-xl shadow-primary/5 border border-primary/10 backdrop-blur-sm animate-fade-in">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-extrabold text-text-dark dark:text-white mb-2 font-display">Bienvenido de nuevo</h2>
                            <p className="text-gray-500 dark:text-gray-400">Saborea el momento. Inicia sesión en tu cocina.</p>
                        </div>
                        
                        {error && (
                            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 ml-1" htmlFor="email">Correo Electrónico</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-icons text-gray-400 text-xl">mail_outline</span>
                                    </div>
                                    <input 
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-background-light dark:bg-background-dark/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all duration-200" 
                                        id="email" 
                                        name="email" 
                                        placeholder="chef@ejemplo.com" 
                                        required 
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">Contraseña</label>
                                    <a className="text-sm font-medium text-primary hover:text-primary-dark transition-colors" href="#">¿Olvidaste tu contraseña?</a>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-icons text-gray-400 text-xl">lock_outline</span>
                                    </div>
                                    <input 
                                        className="block w-full pl-10 pr-10 py-3 border border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-background-light dark:bg-background-dark/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all duration-200" 
                                        id="password" 
                                        name="password" 
                                        placeholder="••••••••" 
                                        required 
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center ml-1">
                                <input className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer" id="remember-me" name="remember-me" type="checkbox"/>
                                <label className="ml-2 block text-sm text-gray-600 dark:text-gray-400 cursor-pointer select-none" htmlFor="remember-me">
                                    Mantener sesión iniciada
                                </label>
                            </div>

                            <button className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 transform hover:-translate-y-0.5" type="submit">
                                Iniciar Sesión
                            </button>
                        </form>

                        <div className="relative mt-8 mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white dark:bg-gray-800 text-gray-400">O continuar con</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm bg-white dark:bg-background-dark hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Google</span>
                            </button>
                            <button className="flex items-center justify-center px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm bg-white dark:bg-background-dark hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Apple</span>
                            </button>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                ¿Nuevo en la cocina? {' '}
                                <Link className="font-semibold text-primary hover:text-primary-dark transition-colors relative inline-block group" to="/register">
                                    Crear una Cuenta
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
