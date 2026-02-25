import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Cart() {
    const { cartItems, removeFromCart, addToCart, clearCart, totalPrice, deliveryFee, taxes, finalTotal, cartCount } = useCart();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [promoCode, setPromoCode] = useState('');
    
    // Address Selection State
    const [addressType, setAddressType] = useState('registered');
    const [customAddress, setCustomAddress] = useState('');
    const [addressError, setAddressError] = useState(null);

    // Payment Selection State
    const [paymentMethod, setPaymentMethod] = useState('Tarjeta');

    const navigate = useNavigate();

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    // Delivery and Taxes are now calculated in CartContext
    
    // Initialize address selection based on user auth
    useEffect(() => {
        if (!user || !user.direccion) {
            setAddressType('custom');
        } else {
            setAddressType('registered');
        }
    }, [user]);

    const handleCheckout = async () => {
        if (cartItems.length === 0) return;
        
        // Validate Address
        let deliveryAddress = '';
        setAddressError(null);
        
        if (addressType === 'registered') {
             if (!user || !user.direccion) {
                 setAddressError('Por favor, selecciona o introduce una dirección de entrega.');
                 return;
             }
             deliveryAddress = user.direccion;
        } else {
             if (!customAddress.trim()) {
                 setAddressError('Por favor, introduce una dirección de entrega.');
                 return;
             }
             deliveryAddress = customAddress;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${baseUrl}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    items: cartItems,
                    metodo_pago: paymentMethod,
                    direccion_envio: deliveryAddress
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Error al procesar el pedido');
            }

            setSuccessMessage("¡Pedido realizado con éxito!");
            clearCart();
            // Removed automatic redirect to show confirmation view

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Full remove from cart handler
    const fullyRemoveFromCart = (idMeal) => {
        // Repeatedly call removeFromCart or we can just access state if we had a dedicated function.
        // For simplicity with existing context, we'll just implement a quick workaround or clear the specific item
        // Wait, current CartContext removeFromCart reduces by 1 and deletes if 1. We'll just loop till removed.
        const item = cartItems.find(i => i.idMeal === idMeal);
        if (item) {
            for(let i=0; i<item.cantidad; i++){
                removeFromCart(idMeal);
            }
        }
    };

    if (successMessage) {
        return (
            <main className="grow flex items-center justify-center py-20 px-4 bg-gray-50 min-h-[calc(100vh-80px)]">
                <div className="bg-white p-12 rounded-3xl shadow-xl border border-stone-100 text-center max-w-xl w-full">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                        <span className="material-icons text-6xl text-green-500">check_circle</span>
                    </div>
                    <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">{successMessage}</h2>
                    <p className="text-lg text-gray-500 mb-10">Tu pedido ha sido procesado y está en preparación. ¡Gracias por confiar en nosotros!</p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            to="/history"
                            className="bg-primary text-white py-3 px-8 rounded-xl font-bold text-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-md shadow-primary/20"
                        >
                            <span className="material-icons text-sm">receipt_long</span>
                            Ir al Historial de Pedidos
                        </Link>
                        <Link 
                            to="/"
                            className="bg-stone-100 text-gray-800 py-3 px-8 rounded-xl font-bold text-lg hover:bg-stone-200 transition-all flex items-center justify-center gap-2"
                        >
                            <span className="material-icons text-sm">restaurant_menu</span>
                            Volver al Menú
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
                
                {/* Left Column: Cart Items */}
                <div className="lg:col-span-8 space-y-8">
                    
                    {/* Cart Header */}
                    <div className="flex justify-between items-end border-b border-stone-200 dark:border-stone-800 pb-4">
                        <h2 className="text-xl font-semibold">{cartCount} {cartCount === 1 ? 'Producto' : 'Productos'} en el Carrito</h2>
                        {cartItems.length > 0 && (
                            <button 
                                onClick={clearCart} 
                                className="text-sm text-stone-500 dark:text-stone-400 hover:text-red-500 transition-colors bg-transparent border-none cursor-pointer"
                            >
                                Vaciar Carrito
                            </button>
                        )}
                    </div>

                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-xl border border-red-200 dark:border-red-800/30">
                            {error}
                        </div>
                    )}

                    {cartItems.length === 0 ? (
                        <div className="bg-white dark:bg-stone-900 rounded-xl shadow-sm p-12 text-center border border-stone-100 dark:border-stone-800 flex flex-col items-center">
                            <span className="material-icons text-6xl text-stone-300 dark:text-stone-700 mb-4 block">remove_shopping_cart</span>
                            <h2 className="text-2xl font-bold text-deep-green dark:text-white mb-2">Tu carrito está vacío</h2>
                            <p className="text-stone-500 mb-8">Aún no has añadido ningún plato a tu pedido.</p>
                            <Link 
                                to="/"
                                className="bg-primary text-deep-green py-3 px-8 rounded-full font-bold hover:brightness-110 transition-all duration-200 inline-flex items-center gap-2"
                            >
                                <span className="material-icons text-sm">restaurant_menu</span>
                                Descubrir Menú
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {cartItems.map((item) => (
                                <div key={item.idMeal} className="group bg-white dark:bg-stone-900 rounded-xl shadow-sm border border-stone-100 dark:border-stone-800 p-4 sm:p-6 transition-all hover:shadow-md">
                                    <div className="flex flex-col sm:flex-row gap-6">
                                        {/* Image */}
                                        <div className="w-full sm:w-40 h-40 shrink-0 rounded-lg overflow-hidden relative">
                                            <img 
                                                alt={item.strMeal} 
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                                src={item.strMealThumb}
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-2">
                                                <span className="text-white text-xs font-medium flex items-center gap-1">
                                                    <span className="material-icons text-[14px] text-primary">schedule</span> 30m
                                                </span>
                                            </div>
                                        </div>
                                        {/* Content */}
                                        <div className="grow flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-deep-green dark:text-white line-clamp-1">{item.strMeal}</h3>
                                                        <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">{item.strCategory || 'Plato'} - {item.strArea || 'General'}</p>
                                                    </div>
                                                    <span className="font-bold text-lg text-deep-green dark:text-white">{item.precio || '10.00'} €</span>
                                                </div>
                                                
                                                {/* Ingredients Accordion Mock */}
                                                <div className="mt-4 bg-background-light dark:bg-background-dark rounded-lg p-3 border border-stone-200 dark:border-stone-700">
                                                    <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">Ingredientes (Tags):</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {item.strTags ? item.strTags.split(',').slice(0, 4).map(tag => (
                                                            <span key={tag} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                                                                {tag.trim()}
                                                            </span>
                                                        )) : (
                                                            <span className="text-xs text-stone-400 italic">No especificados</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Actions */}
                                            <div className="flex justify-between items-center mt-6">
                                                <button 
                                                    onClick={() => fullyRemoveFromCart(item.idMeal)}
                                                    className="text-sm text-stone-400 hover:text-red-500 flex items-center gap-1 transition-colors bg-transparent border-none cursor-pointer p-0"
                                                >
                                                    <span className="material-icons text-lg">delete_outline</span> Eliminar
                                                </button>
                                                <div className="flex items-center bg-background-light dark:bg-stone-800 rounded-lg p-1 border border-stone-200 dark:border-stone-700">
                                                    <button 
                                                        onClick={() => removeFromCart(item.idMeal)}
                                                        className="w-8 h-8 rounded flex items-center justify-center text-stone-500 hover:bg-white dark:hover:bg-stone-700 hover:shadow-sm transition-all bg-transparent border-none cursor-pointer"
                                                    >
                                                        <span className="material-icons text-sm">remove</span>
                                                    </button>
                                                    <span className="w-8 text-center font-medium text-sm text-deep-green dark:text-white">{item.cantidad}</span>
                                                    <button 
                                                        onClick={() => addToCart(item)}
                                                        className="w-8 h-8 rounded flex items-center justify-center bg-primary text-deep-green shadow-sm hover:brightness-110 transition-all border-none cursor-pointer"
                                                    >
                                                        <span className="material-icons text-sm">add</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Column: Order Summary */}
                <div className="lg:col-span-4 mt-8 lg:mt-0">
                    <div className="sticky top-28 bg-white dark:bg-stone-900 rounded-xl shadow-lg border border-primary/20 p-6 overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                        <h2 className="text-xl font-bold mb-6 text-deep-green dark:text-white">Resumen del Pedido</h2>
                        
                        {/* Cost Breakdown */}
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-stone-600 dark:text-stone-400">Subtotal ({cartCount} {cartCount === 1 ? 'producto' : 'productos'})</span>
                                <span className="font-medium text-deep-green dark:text-stone-200">{totalPrice} €</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-stone-600 dark:text-stone-400">Gastos de Envío</span>
                                <span className="font-medium text-deep-green dark:text-stone-200">{deliveryFee.toFixed(2)} €</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-stone-600 dark:text-stone-400 flex items-center gap-1">
                                    Impuestos
                                    <span className="material-icons text-xs text-stone-400 cursor-help" title="33% de IVA estimado">info</span>
                                </span>
                                <span className="font-medium text-deep-green dark:text-stone-200">{taxes.toFixed(2)} €</span>
                            </div>
                        </div>

                        {/* Promo Code */}
                        <div className="mb-6">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">Código Promocional</label>
                            <div className="flex gap-2">
                                <input 
                                    className="grow rounded-lg border-stone-200 dark:border-stone-700 bg-background-light dark:bg-stone-800 text-sm focus:ring-primary focus:border-primary px-3 py-2 outline-none"  
                                    placeholder="Introduce tu código" 
                                    type="text"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                />
                                <button className="px-4 py-2 bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-300 rounded-lg text-sm font-medium hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors border-none cursor-pointer">
                                    Aplicar
                                </button>
                            </div>
                        </div>

                        {/* Delivery Address Selection */}
                        <div className="mb-6 bg-gray-50 dark:bg-stone-800/50 p-4 rounded-xl border border-stone-200 dark:border-stone-700">
                             <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                                <span className="material-icons text-primary/80 text-[20px]">local_shipping</span> 
                                Dirección de Entrega
                             </h3>
                             
                             <div className="space-y-3">
                                <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${!user || !user.direccion ? 'opacity-50 cursor-not-allowed' : addressType === 'registered' ? 'bg-primary/5 border-primary' : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700'}`}>
                                    <div className="flex items-center h-5">
                                        <input 
                                            type="radio" 
                                            name="deliveryAddress" 
                                            value="registered" 
                                            className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary"
                                            checked={addressType === 'registered'}
                                            onChange={() => setAddressType('registered')}
                                            disabled={!user || !user.direccion}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">Mi dirección principal</span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            {user && user.direccion ? user.direccion : 'No tienes dirección registrada'}
                                        </span>
                                    </div>
                                </label>

                                <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${addressType === 'custom' ? 'bg-primary/5 border-primary' : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700'}`}>
                                    <div className="flex items-center h-5">
                                        <input 
                                            type="radio" 
                                            name="deliveryAddress" 
                                            value="custom" 
                                            className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary"
                                            checked={addressType === 'custom'}
                                            onChange={() => setAddressType('custom')}
                                        />
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Otra dirección</span>
                                        {addressType === 'custom' && (
                                            <input 
                                                type="text"
                                                placeholder="Ej. Calle Mayor 12, 3ºA, Madrid"
                                                className="w-full text-sm border-stone-200 dark:border-stone-600 rounded-md focus:ring-primary focus:border-primary px-3 py-2 bg-white dark:bg-stone-900"
                                                value={customAddress}
                                                onChange={(e) => setCustomAddress(e.target.value)}
                                                autoFocus
                                            />
                                        )}
                                    </div>
                                </label>
                                
                                {addressError && (
                                    <p className="text-red-500 text-xs mt-1 animate-pulse flex items-center gap-1">
                                        <span className="material-icons text-[14px]">error_outline</span>
                                        {addressError}
                                    </p>
                                )}
                             </div>
                        </div>

                        {/* Payment Method Selection */}
                        <div className="mb-6 bg-gray-50 dark:bg-stone-800/50 p-4 rounded-xl border border-stone-200 dark:border-stone-700">
                             <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                                <span className="material-icons text-primary/80 text-[20px]">payment</span> 
                                Método de Pago
                             </h3>
                             
                             <div className="space-y-3">
                                <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${paymentMethod === 'Tarjeta' ? 'bg-primary/5 border-primary' : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700'}`}>
                                    <div className="flex items-center h-5">
                                        <input 
                                            type="radio" 
                                            name="paymentMethod" 
                                            value="Tarjeta" 
                                            className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary"
                                            checked={paymentMethod === 'Tarjeta'}
                                            onChange={() => setPaymentMethod('Tarjeta')}
                                        />
                                    </div>
                                    <div className="flex flex-col flex-grow">
                                        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">Tarjeta de Crédito / Débito</span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex gap-2">
                                            <span className="material-icons text-sm">credit_card</span>
                                            Pago seguro en Checkout
                                        </span>
                                    </div>
                                </label>

                                <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${paymentMethod === 'PayPal' ? 'bg-primary/5 border-primary' : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700'}`}>
                                    <div className="flex items-center h-5">
                                        <input 
                                            type="radio" 
                                            name="paymentMethod" 
                                            value="PayPal" 
                                            className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary"
                                            checked={paymentMethod === 'PayPal'}
                                            onChange={() => setPaymentMethod('PayPal')}
                                        />
                                    </div>
                                    <div className="flex flex-col flex-grow">
                                        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">PayPal</span>
                                        <span className="text-xs text-info dark:text-blue-400 mt-1">Conecta con tu cuenta</span>
                                    </div>
                                </label>
                                
                                <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${paymentMethod === 'ApplePay' ? 'bg-primary/5 border-primary' : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700'}`}>
                                    <div className="flex items-center h-5">
                                        <input 
                                            type="radio" 
                                            name="paymentMethod" 
                                            value="ApplePay" 
                                            className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary"
                                            checked={paymentMethod === 'ApplePay'}
                                            onChange={() => setPaymentMethod('ApplePay')}
                                        />
                                    </div>
                                    <div className="flex flex-col flex-grow">
                                        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">Apple Pay / Google Pay</span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Pago rápido desde tu dispositivo</span>
                                    </div>
                                </label>
                             </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-dashed border-stone-300 dark:border-stone-700 my-6"></div>

                        {/* Total */}
                        <div className="flex justify-between items-center mb-8">
                            <span className="text-lg font-bold text-deep-green dark:text-white">Total</span>
                            <div className="text-right">
                                <span className="block text-2xl font-bold text-deep-green dark:text-white">{finalTotal} €</span>
                                <span className="text-xs text-stone-500">IVA incluido</span>
                            </div>
                        </div>

                        {/* Primary Action */}
                        <button 
                            onClick={handleCheckout}
                            disabled={loading || cartItems.length === 0}
                            className={`w-full text-white font-bold text-lg py-4 rounded-xl shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 group cursor-pointer border-none
                                ${loading || cartItems.length === 0 ? 'bg-stone-400 cursor-not-allowed opacity-70' : 'hover:bg-[#e66d1e]'}`}
                            style={{ backgroundColor: (loading || cartItems.length === 0) ? undefined : '#FF7A21' }}
                        >
                            {loading ? (
                                <span className="material-icons animate-spin">refresh</span>
                            ) : (
                                <>
                                    Terminar Pedido
                                    <span className="material-icons group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </>
                            )}
                        </button>

                        {/* Trust Signals */}
                        <div className="mt-6 flex justify-center gap-4 text-stone-400">
                            <span className="material-icons text-2xl" title="Pago Seguro">lock</span>
                            <span className="material-icons text-2xl" title="Envío Rápido">local_shipping</span>
                            <span className="material-icons text-2xl" title="Garantía de Frescura">verified</span>
                        </div>
                        <p className="text-center text-xs text-stone-400 mt-2">Pago seguro procesado por Stripe</p>
                    </div>
                </div>

            </div>
        </main>
    );
}
