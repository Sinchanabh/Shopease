import { createContext, useContext, useState, useEffect } from 'react';
import { getWishlist, setWishlist } from '../utils/localStorage';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlistState] = useState([]);
  const [popupMessage, setPopupMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  useEffect(() => {
    setWishlistState(getWishlist());
  }, []);

  const addToWishlist = async (product) => {
    setIsAddingToWishlist(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate async operation
    const existingItem = wishlist.find(item => item.id === product.id);
    if (!existingItem) {
      const newWishlist = [...wishlist, product];
      setWishlistState(newWishlist);
      setWishlist(newWishlist);
      setPopupMessage('Item added to wishlist successfully!');
      setIsPopupVisible(true);
    }
    setIsAddingToWishlist(false);
  };

  const removeFromWishlist = (id) => {
    const newWishlist = wishlist.filter(item => item.id !== id);
    setWishlistState(newWishlist);
    setWishlist(newWishlist);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, popupMessage, isPopupVisible, closePopup }}>
      {children}
    </WishlistContext.Provider>
  );
};
