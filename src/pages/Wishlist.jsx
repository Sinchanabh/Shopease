import { useWishlist } from '../contexts/WishlistContext';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return <div className="container mx-auto p-4">Your wishlist is empty</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlist.map(item => (
          <div key={item.id} className="border p-4 rounded shadow">
            <img src={item.images[0]} alt={item.title} className="w-full h-48 object-cover mb-4" />
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="text-gray-600">${item.price}</p>
            <button
              onClick={() => removeFromWishlist(item.id)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove from Wishlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
