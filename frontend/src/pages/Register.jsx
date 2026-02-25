import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoUrl from '../img/logo_no_bg.png';
import bgImage from '../img/pasta.png';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        nombre: '',
        telefono: '',
        direccion: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL;
            const response = await fetch(`${baseUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Auto-login to establish backend session cookie
                try {
                    const loginResponse = await fetch(`${baseUrl}/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                        body: JSON.stringify({ email: formData.email, password: formData.password })
                    });
                    
                    if (loginResponse.ok) {
                        const loginData = await loginResponse.json();
                        login(loginData);
                        setSuccess('¡Cuenta creada exitosamente! Redirigiendo...');
                        setTimeout(() => navigate('/'), 1500);
                    } else {
                        throw new Error('No se pudo establecer sesión auto-login');
                    }
                } catch (loginErr) {
                    console.error('Auto-login error:', loginErr);
                    // Just fallback to frontend login state if backend session fails to establish automatically
                    const data = await response.json();
                    login(data); 
                    setSuccess('¡Cuenta creada! Por favor inicia sesión de nuevo si tienes problemas.');
                    setTimeout(() => navigate('/login'), 2000);
                }
            } else {
                const data = await response.json();
                setError(data.error || 'No se pudo crear la cuenta');
            }
        } catch (err) {
            console.error('Registration fetch error:', err);
            setError('Error de conexión con el servidor.');
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-text-dark antialiased min-h-[calc(100vh-160px)] flex flex-col overflow-hidden">
            <div className="grow flex w-full h-full">
                {/* Left Side: Visual Showcase */}
                <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-background-dark">
                    <div className="absolute inset-0 z-0 bg-[#0F2215]">
                        <img alt="Fresh pasta" className="w-full h-full object-cover opacity-80" src={bgImage}/>
                        <div className="absolute inset-0 bg-linear-to-t from-background-dark/95 via-background-dark/40 to-transparent"></div>
                    </div>
                    
                    <div className="relative z-10 w-full h-full flex flex-col justify-between p-12 text-white">
                        <div className="flex items-center gap-2">
                            <img alt="Come y Calla Logo" className="w-auto h-20" src={logoUrl}/>
                            <span className="text-2xl font-bold tracking-tight">Come y Calla</span>
                        </div>
                        <div className="max-w-md mb-12 animate-fade-in">
                            <h1 className="text-5xl font-bold mb-6 leading-tight">Empieza tu viaje <span className="text-primary">gastronómico</span>.</h1>
                            <p className="text-lg text-gray-200 font-light leading-relaxed">
                                Crea tu cuenta para ver tu historial de pedidos y recibir nuestras recomendaciones personalizadas.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Register Form */}
                <div className="w-full lg:w-1/2 overflow-y-auto flex flex-col justify-center items-center bg-background-cream dark:bg-background-dark relative p-6 lg:p-12">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>
                    
                    <div className="lg:hidden absolute top-6 left-6 flex items-center gap-2">
                        <img alt="Come y Calla Logo" className="w-auto h-16" src={logoUrl}/>
                    </div>
                    
                    <div className="w-full max-w-md my-8 z-10 bg-white dark:bg-white/5 p-8 rounded-2xl shadow-xl shadow-primary/5 border border-primary/10 backdrop-blur-sm animate-fade-in relative">
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-extrabold text-text-dark dark:text-white mb-2 font-display">Crea tu cuenta</h2>
                            <p className="text-gray-500 dark:text-gray-400">Únete a nuestra cocina hoy.</p>
                        </div>
                        
                        {error && (
                            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm text-center">
                                {success}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 ml-1" htmlFor="nombre">Nombre Completo</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-icons text-gray-400 text-xl">person_outline</span>
                                    </div>
                                    <input 
                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-background-light dark:bg-background-dark/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all duration-200" 
                                        id="nombre" name="nombre" placeholder="Chef Ramsay" required type="text"
                                        value={formData.nombre} onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 ml-1" htmlFor="email">Correo Electrónico</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-icons text-gray-400 text-xl">mail_outline</span>
                                    </div>
                                    <input 
                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-background-light dark:bg-background-dark/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all duration-200" 
                                        id="email" name="email" placeholder="chef@ejemplo.com" required type="email"
                                        value={formData.email} onChange={handleChange}
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 ml-1" htmlFor="telefono">Teléfono</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-icons text-gray-400 text-xl">phone</span>
                                    </div>
                                    <input 
                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-background-light dark:bg-background-dark/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all duration-200" 
                                        id="telefono" name="telefono" placeholder="+34 600 000 000" type="tel"
                                        value={formData.telefono} onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 ml-1" htmlFor="direccion">Dirección</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-icons text-gray-400 text-xl">home</span>
                                    </div>
                                    <input 
                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-background-light dark:bg-background-dark/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all duration-200" 
                                        id="direccion" name="direccion" placeholder="Calle Falsa 123" type="text"
                                        value={formData.direccion} onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 ml-1" htmlFor="password">Contraseña</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-icons text-gray-400 text-xl">lock_outline</span>
                                    </div>
                                    <input 
                                        className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-background-light dark:bg-background-dark/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all duration-200" 
                                        id="password" name="password" placeholder="••••••••" required type="password"
                                        value={formData.password} onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <button className="w-full flex justify-center py-3 px-4 mt-2 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 transform hover:-translate-y-0.5" type="submit">
                                Crear Cuenta
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                ¿Ya tienes una cuenta? {' '}
                                <Link className="font-semibold text-primary hover:text-primary-dark transition-colors relative inline-block group" to="/login">
                                    Iniciar Sesión
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

export default Register;
