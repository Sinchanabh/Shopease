import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useUser } from '../contexts/UserContext';

const Navbar = () => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout } = useUser();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <nav className="bg-black text-white p-4 hover:bg-gray-800 transition

">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl foint-bold">E-Commerce</Link>
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative">
            Cart ({cartCount})
          </Link>
          <Link to="/wishlist" className="relative">
            Wishlist ({wishlistCount})
          </Link>
          {user ? (
            <div className="flex items-center space-x-4">
              <span>Welcome, {user.email}</span>
              <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
