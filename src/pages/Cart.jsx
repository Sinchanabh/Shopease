import { useState } from 'react';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { cart, updateQuantity, removeItem, getTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('');

  if (cart.length === 0) {
    return <div className="container mx-auto p-4">Your cart is empty</div>;
  }

  const handleProceedToBuy = () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }
    // Simulate payment success
    alert(`Payment successful using ${paymentMethod}!`);
    clearCart();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="space-y-4">
        {cart.map(item => (
          <div key={item.id} className="flex items-center justify-between border p-4 rounded">
            <div className="flex items-center space-x-4">
              <img src={item.images[0]} alt={item.title} className="w-16 h-16 object-cover" />
              <div>
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-gray-600">${item.price}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="bg-gray-300 px-2 py-1 rounded">-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="bg-gray-300 px-2 py-1 rounded">+</button>
              <button onClick={() => removeItem(item.id)} className="bg-red-500 text-white px-4 py-2 rounded">Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-right">
        <p className="text-2xl font-bold">Total: ${getTotal()}</p>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Payment Options</h2>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              value="Credit Card"
              checked={paymentMethod === 'Credit Card'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            Credit Card
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="PayPal"
              checked={paymentMethod === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            PayPal
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="Cash on Delivery"
              checked={paymentMethod === 'Cash on Delivery'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            Cash on Delivery
          </label>
        </div>
        <button
          onClick={handleProceedToBuy}
          className="mt-4 bg-green-500 text-white px-6 py-3 rounded font-bold"
        >
          Proceed to Buy
        </button>
      </div>
    </div>
  );
};

export default Cart;
