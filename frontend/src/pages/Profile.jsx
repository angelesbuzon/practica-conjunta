import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
    const { user, login, logout } = useAuth();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        nombre: '',
        telefono: '',
        direccion: ''
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        
        // Cargar datos actuales del usuario al estado
        setFormData({
            nombre: user.nombre || '',
            telefono: user.telefono || '',
            direccion: user.direccion || ''
        });
    }, [user, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await fetch('http://localhost:8001/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                login(data); // Actualiza el contexto y localStorage con los nuevos datos
                setMessage({ type: 'success', text: 'Perfil actualizado correctamente.' });
            } else {
                setMessage({ type: 'error', text: 'Error al actualizar el perfil.' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'Error de conexión con el servidor.' });
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col py-12">
            <div className="max-w-4xl mx-auto px-4 w-full">
                
                {/* Header de la sección */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <span className="material-icons text-4xl text-primary bg-primary/10 p-3 rounded-full">person</span>
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Mi Perfil</h1>
                            <p className="text-gray-500">{user.email}</p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={handleLogout}
                        className="flex items-center justify-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                        <span className="material-icons text-sm">logout</span>
                        Cerrar Sesión
                    </button>
                </div>

                {/* Grid con Formulario y Accesos directos */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Formulario de actualización */}
                    <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">Detalles Personales</h2>
                        
                        {message.text && (
                            <div className={`mb-6 p-4 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleUpdate} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="nombre">Nombre Completo</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-icons text-gray-400 text-sm">person_outline</span>
                                    </div>
                                    <input 
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-primary focus:border-primary sm:text-sm"
                                        id="nombre" name="nombre" type="text"
                                        value={formData.nombre} onChange={handleChange} required
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="telefono">Teléfono</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-icons text-gray-400 text-sm">phone</span>
                                    </div>
                                    <input 
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-primary focus:border-primary sm:text-sm"
                                        id="telefono" name="telefono" type="tel"
                                        value={formData.telefono} onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="direccion">Dirección de Entrega</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-icons text-gray-400 text-sm">home</span>
                                    </div>
                                    <input 
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-primary focus:border-primary sm:text-sm"
                                        id="direccion" name="direccion" type="text"
                                        value={formData.direccion} onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t">
                                <button 
                                    disabled={loading}
                                    className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-70" 
                                    type="submit"
                                >
                                    {loading ? 'Guardando...' : 'Guardar Cambios'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Accesos Directos Laterales */}
                    <div className="md:col-span-1 space-y-4">
                        <Link to="/history" className="block bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:border-primary hover:shadow-md transition-all group cursor-pointer">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                                <span className="material-icons text-primary group-hover:text-white transition-colors">receipt_long</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">Historial de Pedidos</h3>
                            <p className="text-sm text-gray-500">Revisa tus compras anteriores y el estado de tus pedidos.</p>
                        </Link>

                        <Link to="/favorites" className="block bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:border-red-400 hover:shadow-md transition-all group cursor-pointer">
                            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-500 transition-colors">
                                <span className="material-icons text-red-500 group-hover:text-white transition-colors">favorite</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">Mis Favoritos</h3>
                            <p className="text-sm text-gray-500">Accede rápidamente a tus platos favoritos guardados.</p>
                        </Link>
                        
                        <div className="bg-primary/5 rounded-2xl border border-primary/10 p-6">
                            <h3 className="text-md font-bold text-primary mb-2 flex items-center gap-2">
                                <span className="material-icons text-sm">local_offer</span>
                                Club Come y Calla
                            </h3>
                            <p className="text-sm text-gray-600">Al mantener tu información actualizada, ayudas a nuestros repartidores a llevar tu comida más rápido y caliente. ¡Gracias por confiar en nosotros!</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
