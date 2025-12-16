import { createContext, useContext, useState, useEffect } from 'react';
import { getCart, setCart } from '../utils/localStorage';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCartState] = useState([]);

  useEffect(() => {
    setCartState(getCart());
  }, []);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      const newCart = [...cart, { ...product, quantity: 1 }];
      setCartState(newCart);
      setCart(newCart);
    }
  };

  const updateQuantity = (id, quantity) => {
    const newCart = cart.map(item =>
      item.id === id ? { ...item, quantity } : item
    ).filter(item => item.quantity > 0);
    setCartState(newCart);
    setCart(newCart);
  };

  const removeItem = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    setCartState(newCart);
    setCart(newCart);
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeItem, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};
