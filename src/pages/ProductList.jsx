import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import products from '../data/products.json';

const ProductList = () => {
  const { addToCart, isAddingToCart } = useCart();
  const { addToWishlist, isAddingToWishlist } = useWishlist();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded">
            <img src={product.images[0]} alt={product.title} className="w-full h-48 object-cover mb-4" />
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="text-gray-600 mb-2">{product.shortDescription}</p>
            <p className="text-lg font-bold mb-4">${product.price}</p>
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-2">
                <Link to={`/product/${product.id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 active:bg-blue-700 transition">View Details</Link>
                <button
                  onClick={() => addToCart(product)}
                  disabled={isAddingToCart}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 active:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                </button>
              </div>
              <button
                onClick={() => addToWishlist(product)}
                disabled={isAddingToWishlist}
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 active:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {isAddingToWishlist ? 'Adding...' : 'Add to Wishlist'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
