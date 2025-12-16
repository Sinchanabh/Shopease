import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import products from '../data/products.json';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const product = products.find(p => p.id === parseInt(id));
  const [mainImage, setMainImage] = useState(0);

  if (!product) {
    return <div className="container mx-auto p-4">Product not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img src={product.images[mainImage]} alt={product.title} className="w-full h-96 object-cover mb-4" />
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className={`w-20 h-20 object-cover cursor-pointer border-2 ${mainImage === index ? 'border-blue-500' : 'border-gray-300'}`}
                  onClick={() => setMainImage(index)}
                />
              ))}
            </div>
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-lg text-gray-700 mb-4">{product.shortDescription}</p>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-2xl font-bold mb-6">${product.price}</p>
            <div className="flex space-x-4">
              <button
                onClick={() => addToCart(product)}
                className="bg-green-500 text-white px-6 py-3 rounded text-lg"
              >
                Add to Cart
              </button>
              <button
                onClick={() => addToWishlist(product)}
                className="bg-blue-500 text-white px-6 py-3 rounded text-lg"
              >
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
