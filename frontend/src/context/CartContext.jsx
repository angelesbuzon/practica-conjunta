import React, { createContext, useState, useContext } from 'react';

// Creamos el contexto
const CartContext = createContext();

// Componente Proveedor que englobará nuestra app
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Añadir un plato al carrito
  const addToCart = (meal, qty = 1) => {
    setCartItems((prevItems) => {
      // Comprobamos si el plato ya está en el carrito
      const existingItem = prevItems.find((item) => item.idMeal === meal.idMeal);
      
      if (existingItem) {
        // Si existe, incrementamos su cantidad
        return prevItems.map((item) =>
          item.idMeal === meal.idMeal
            ? { ...item, cantidad: item.cantidad + qty }
            : item
        );
      }
      
      // Si no existe, lo añadimos con cantidad qty
      // Añadimos un precio mock de 10.00 € si la API no lo trae
      return [...prevItems, { ...meal, cantidad: qty, precio: meal.precio || "10.00" }];
    });
  };

  // Eliminar un plato (reduce cantidad o lo elimina si llega a 0)
  const removeFromCart = (idMeal) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.idMeal === idMeal);
      
      if (existingItem?.cantidad === 1) {
        return prevItems.filter((item) => item.idMeal !== idMeal);
      }
      
      return prevItems.map((item) =>
        item.idMeal === idMeal
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      );
    });
  };

  // Vaciar todo el carrito (después de comprar)
  const clearCart = () => setCartItems([]);

  // Calcular la cantidad total de items (para el globito rojo del Header)
  const cartCount = cartItems.reduce((total, item) => total + item.cantidad, 0);

  // Calcular el subtotal (solo el coste de los platos)
  const subtotal = cartItems.reduce(
    (total, item) => total + (parseFloat(item.precio) * item.cantidad),
    0
  );

  // Calcular Gastos de Envío, Impuestos y Total Final
  const deliveryFee = cartItems.length > 0 ? 4.99 : 0;
  const taxes = cartItems.length > 0 ? parseFloat((subtotal * 0.33).toFixed(2)) : 0;
  const finalTotal = (subtotal + deliveryFee + taxes).toFixed(2);
  const totalPrice = subtotal.toFixed(2); // Mantenemos totalPrice como subtotal por si se necesita

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      cartCount,
      totalPrice, // Subtotal
      deliveryFee,
      taxes,
      finalTotal // Total real a pagar
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el carrito fácilmente en cualquier componente
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};
