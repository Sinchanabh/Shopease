import { createContext, useContext, useState, useEffect } from 'react';
import { getWishlist, setWishlist } from '../utils/localStorage';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlistState] = useState([]);

  useEffect(() => {
    setWishlistState(getWishlist());
  }, []);

  const addToWishlist = (product) => {
    const existingItem = wishlist.find(item => item.id === product.id);
    if (!existingItem) {
      const newWishlist = [...wishlist, product];
      setWishlistState(newWishlist);
      setWishlist(newWishlist);
    }
  };

  const removeFromWishlist = (id) => {
    const newWishlist = wishlist.filter(item => item.id !== id);
    setWishlistState(newWishlist);
    setWishlist(newWishlist);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
