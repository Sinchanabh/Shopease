import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Popup from './components/Popup';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Register from './pages/Register';
import { CartProvider, useCart } from './contexts/CartContext';
import { WishlistProvider, useWishlist } from './contexts/WishlistContext';
import { UserProvider, useUser } from './contexts/UserContext';

const PopupWrapper = () => {
  const { popupMessage: cartMessage, isPopupVisible: cartVisible, closePopup: closeCartPopup } = useCart();
  const { popupMessage: wishlistMessage, isPopupVisible: wishlistVisible, closePopup: closeWishlistPopup } = useWishlist();
  const { popupMessage: userMessage, isPopupVisible: userVisible, closePopup: closeUserPopup } = useUser();

  const message = cartVisible ? cartMessage : wishlistVisible ? wishlistMessage : userVisible ? userMessage : '';
  const isVisible = cartVisible || wishlistVisible || userVisible;
  const onClose = () => {
    if (cartVisible) closeCartPopup();
    if (wishlistVisible) closeWishlistPopup();
    if (userVisible) closeUserPopup();
  };

  return <Popup message={message} isVisible={isVisible} onClose={onClose} />;
};

function App() {
  return (
    <UserProvider>
      <WishlistProvider>
        <CartProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
            <Footer />
          </Router>
          <PopupWrapper />
        </CartProvider>
      </WishlistProvider>
    </UserProvider>
  );
}

export default App;
