'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState('');
  const { data: session } = useSession();
  const router = useRouter();

  const DELIVERY_CHARGE = 40;
  const TAX_RATE = 0.18;

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      setCartItems(JSON.parse(saved));
    }
    const savedCoupon = localStorage.getItem('coupon');
    if (savedCoupon) {
      setCoupon(savedCoupon);
      setDiscount(0.1);
    }
  }, []);

  const handleclick = () => {
    if (!session) {
      alert("Login required");
      router.push("/login");
    } else {
      router.push("/checkout");
    }
  };

  const removeItem = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));

    if (newCart.length === 0) {
      localStorage.removeItem('coupon');
    }
  };

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'SAVE10') {
      setDiscount(0.1);
      localStorage.setItem('coupon', 'SAVE10');
      setMessage('Coupon Applied!');
    } else {
      setDiscount(0);
      localStorage.removeItem('coupon');
      setMessage('Invalid Coupon');
    }
    setTimeout(() => setMessage(''), 3000); // Hide message after 3 seconds
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + DELIVERY_CHARGE - subtotal * discount;

  return (
    <div className="min-h-screen mt-[65px] bg-[#f3f4f6] py-10 px-4 md:px-20">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">🛒 Your Cart</h1>

      {message && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white font-semibold transition-opacity duration-300 ${message === 'Invalid Coupon' ? 'bg-red-500' : 'bg-green-500'}`}>
          {message}
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">Your cart is empty.</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover"
                />
               <div className="flex-1 p-4">
  <h3 className="text-lg font-semibold">{item.name}</h3>
  <p className="text-sm text-gray-600">{item.description}</p>
  {
    !(
      item.category === "facial" ||
      item.category === "electronic" ||
      item.category === "boat" ||
      item.category === "caprese" ||
      item.category === "haute sauce"||
      item.category === "airpods"||
      item.category === "speakers"


    ) && (
      <p className="text-sm text-gray-500 mt-1">
        Size: <span className="font-semibold text-gray-800">{item.size}</span>
      </p>
    )
  }
  <p className="text-md text-green-700 font-bold mt-1">${item.price.toFixed(2)}</p>
</div>
                <button
                  className="text-red-600 px-4 text-sm font-semibold hover:text-red-800"
                  onClick={() => removeItem(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax (18%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Delivery Charges</span>
              <span>${DELIVERY_CHARGE.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between mb-2 text-green-600 font-semibold">
                <span>Coupon Discount</span>
                <span>− ${(subtotal * discount).toFixed(2)}</span>
              </div>
            )}

            <hr className="my-4" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="mt-6">
              <input
                type="text"
                placeholder="Apply Coupon "
                className="w-full px-4 py-2 border rounded-md mb-3"
                value={coupon}
                onChange={(e) => {
                  setCoupon(e.target.value);
                  setDiscount(0); 
                  localStorage.removeItem("coupon"); 
                }}
              />
              <button
                onClick={applyCoupon}
                className="w-full bg-gray-700 hover:bg-gray-900 text-white py-2 rounded-md transition"
              >
                Apply Coupon
              </button>
            </div>

            <button onClick={handleclick} className="mt-6 w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-900 transition">
              Proceed to Checkout
            </button>

          </div>
        </div>
      )}
    </div>
  );
}
