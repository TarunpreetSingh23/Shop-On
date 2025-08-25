"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "card",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
  });

  const DELIVERY_CHARGE = 40;
  const TAX_RATE = 0.18;

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedCoupon = localStorage.getItem("coupon");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    if (savedCoupon === "SAVE10") {
      setDiscount(0.1);
    } else {
      setDiscount(0);
    }
  }, []);

  const subtotal = cart.reduce((acc, item) => {
    const quantity = item.quantity || 1;
    return acc + item.price * quantity;
  }, 0);

  const tax = subtotal * TAX_RATE;
  const discountAmount = subtotal * discount;
  const total = subtotal + tax + DELIVERY_CHARGE - discountAmount;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOrder = () => {
    if (!form.name || !form.phone || !form.address) {
      setMessage("Please fill in all shipping details.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(form.phone)) {
      setMessage("Phone number must be 10 digits.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    if (form.paymentMethod === "card") {
      if (!form.cardNumber || !form.cardExpiry || !form.cardCVC) {
        setMessage("Please fill in all card details.");
        setTimeout(() => setMessage(""), 3000);
        return;
      }

      const cardNumberPattern = /^\d{16}$/;
      if (!cardNumberPattern.test(form.cardNumber)) {
        setMessage("Card number must be 16 digits.");
        setTimeout(() => setMessage(""), 3000);
        return;
      }

      const expiryPattern = /^(\d{2}\/?\d{2})$/;
      if (!expiryPattern.test(form.cardExpiry)) {
        setMessage("Card expiry must be in MMYY or MM/YY format.");
        setTimeout(() => setMessage(""), 3000);
        return;
      }

      const cvcPattern = /^\d{3}$/;
      if (!cvcPattern.test(form.cardCVC)) {
        setMessage("CVC must be 3 digits.");
        setTimeout(() => setMessage(""), 3000);
        return;
      }
    }

    const orderDetails = {
      name: form.name,
      phone: form.phone,
      address: form.address,
      paymentMethod: form.paymentMethod,
      total: total.toFixed(2),
      discount: discountAmount.toFixed(2),
      tax: tax.toFixed(2),
      delivery: DELIVERY_CHARGE.toFixed(2),
      subtotal: subtotal.toFixed(2),
      products: cart.map((item) => ({
        name: item.name,
        price: item.price,
        size: item.size || "N/A",
        quantity: item.quantity || 1,
      })),
    };

    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
    localStorage.removeItem("coupon");
    localStorage.removeItem("cart");

    router.push("/thankyou");
  };

  return (
    <div className="min-h-screen mt-[65px] px-4 md:px-20 py-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {message && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white font-semibold bg-red-500 z-50">
          {message}
        </div>
      )}

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto bg-white p-6 rounded shadow">
          <div>
            <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                maxLength={10}
                value={form.phone}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
              />
              <textarea
                name="address"
                placeholder="Shipping Address"
                value={form.address}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
              />

              <div>
                <label className="block mb-1 font-medium">Payment Method</label>
                <select
                  name="paymentMethod"
                  value={form.paymentMethod}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-md"
                >
                  <option value="card">Card</option>
                  <option value="cod">Cash on Delivery</option>
                </select>
              </div>

              {form.paymentMethod === "card" && (
                <div className="space-y-3">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    maxLength={16}
                    value={form.cardNumber}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 rounded-md"
                  />
                  <div className="flex gap-4">
                    <input
                      type="text"
                      name="cardExpiry"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={form.cardExpiry}
                      onChange={handleChange}
                      className="w-1/2 border px-4 py-2 rounded-md"
                    />
                    <input
                      type="text"
                      name="cardCVC"
                      placeholder="CVC"
                      maxLength={3}
                      value={form.cardCVC}
                      onChange={handleChange}
                      className="w-1/2 border px-4 py-2 rounded-md"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <ul className="mb-4 border-b pb-4">
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between py-1">
                  <span className="text-gray-700">
                    {item.name} ({item.size || "N/A"})
                  </span>
                  <span className="text-gray-900 font-medium">
                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="space-y-2 text-gray-800">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (18%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span>${DELIVERY_CHARGE.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>Coupon Discount (SAVE10)</span>
                  <span>- ${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <hr className="my-3" />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleOrder}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
