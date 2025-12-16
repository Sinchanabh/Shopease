import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import products from '../data/products.json';

const Home = () => {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200">

      {/* Hero Section with Background Image */}
      <div
        className="py-28 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1607082349566-1870b2c47d06')"
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-12">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
              Welcome to ShopEase
            </h1>

            <p className="text-lg text-gray-700 mb-8">
              Discover premium quality products crafted for modern lifestyles.
              Enjoy seamless shopping with trusted quality and great value.
            </p>

            <Link
              to="/products"
              className="inline-block bg-black text-white px-10 py-3 rounded-full font-semibold hover:bg-gray-800 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="container mx-auto px-4 py-14">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Featured Products
        </h2>

        <p className="text-center text-gray-600 mb-12">
          Carefully selected items just for you
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.slice(0, 3).map(product => (
            <div
              key={product.id}
              className="bg-white/70 backdrop-blur-md rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {product.title}
                </h3>

                <p className="text-gray-600 text-sm mb-3">
                  {product.shortDescription}
                </p>

                <p className="text-2xl font-bold text-gray-900 mb-4">
                  ${product.price}
                </p>

                <div className="flex gap-3">
                  <Link
                    to={`/product/${product.id}`}
                    className="flex-1 text-center border border-gray-800 text-gray-800 py-2 rounded hover:bg-gray-800 hover:text-white transition"
                  >
                    View Details
                  </Link>

                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-14">
          <Link
            to="/products"
            className="inline-block border border-gray-900 text-gray-900 px-10 py-3 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition"
          >
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
