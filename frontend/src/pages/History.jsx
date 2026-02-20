import React, { useState, useEffect } from 'react';

export default function History() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch(`${baseUrl}/orders/history`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // Add Authorization header here later when Auth is fully integrated
                    }
                });

                if (!response.ok) {
                    // Try to parse JSON error message if any
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.error || `Error: ${response.status}`);
                }

                const data = await response.json();
                
                // data.history will come from our Symfony backend
                setOrders(data.history || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [baseUrl]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col py-12">
            <div className="max-w-4xl mx-auto px-4 w-full">
                <div className="flex items-center gap-4 mb-8">
                    <span className="material-icons text-4xl text-primary bg-primary/10 p-3 rounded-full">history</span>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Mi Historial de Pedidos
                    </h1>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded shadow-sm">
                        <p className="text-red-700">Hubo un problema cargando tus pedidos: {error}</p>
                    </div>
                )}

                {orders.length === 0 && !error ? (
                    <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
                        <span className="material-icons text-6xl text-gray-300 mb-4 block">receipt_long</span>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Aún no tienes pedidos</h2>
                        <p className="text-gray-500">Cuando realices una compra, aparecerá aquí.</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {orders.map((order, orderIdx) => {
                            // Calculate total cost for the current order
                            const orderTotal = order.platos?.reduce((total, p) => 
                                total + (parseFloat(p.precio_unitario || 0) * (p.cantidad || 1)), 0
                            ) || 0;

                            return (
                                <div key={order.order_id || orderIdx} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                                    <div className="bg-gray-50 border-b border-gray-100 p-6 flex flex-wrap justify-between items-center gap-4">
                                        <div>
                                            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">
                                                Pedido #{order.order_id}
                                            </p>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <span className="material-icons text-sm">location_on</span>
                                                <span className="text-sm">{order.direccion_envio}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600 mt-1">
                                                <span className="material-icons text-sm">payment</span>
                                                <span className="text-sm">{order.metodo_pago}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500 mb-1">Total del Pedido</p>
                                            <p className="text-2xl font-black text-primary">{orderTotal.toFixed(2)} €</p>
                                        </div>
                                    </div>
                                    
                                    <div className="p-6">
                                        <ul className="divide-y divide-gray-100">
                                            {order.platos?.map((plato, idx) => (
                                                <li key={idx} className="py-4 flex flex-col sm:flex-row items-center gap-4">
                                                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                                                        {plato.plato_imagen ? (
                                                            <img src={plato.plato_imagen} alt={plato.plato_nombre} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                                <span className="material-icons">restaurant</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="grow text-center sm:text-left">
                                                        <h4 className="font-bold text-gray-900">{plato.plato_nombre}</h4>
                                                        <p className="text-sm text-gray-500">{plato.cantidad}x  {parseFloat(plato.precio_unitario || 0).toFixed(2)} € / ud.</p>
                                                    </div>
                                                    <div className="font-bold text-gray-900">
                                                        {(parseFloat(plato.precio_unitario || 0) * (plato.cantidad || 1)).toFixed(2)} €
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
