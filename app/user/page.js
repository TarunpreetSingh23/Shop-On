"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaRegUser } from "react-icons/fa6";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  useEffect(() => {
    if (session?.user?.email) {
      fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session.user.email }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && Array.isArray(data.orders)) {
            setOrders(data.orders);
          } else {
            setOrders([]);
          }
        })
        .catch(() => setOrders([]))
        .finally(() => setLoadingOrders(false));
    }
  }, [session]);

  if (status === "loading") return <p className="p-6">Loading...</p>;
  if (!session) {
    router.push("/register");
    return null;
  }

  const handleCancel = async (orderId) => {
    const order = orders.find((o) => o._id === orderId);
    if (order?.isDispatched) {
      alert("This order has already been dispatched and cannot be cancelled.");
      return;
    }

    if (!confirm("Are you sure you want to cancel this order?")) return;

    try {
      const res = await fetch("/api/order/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Order cancelled successfully. Now refresh the page");
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, cancelled: true } : order
          )
        );
      } else {
        alert(data.message || "Failed to cancel order.");
      }
    } catch {
      alert("Something went wrong.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-[70px] p-6 space-y-10 text-gray-800">
      <h1 className="text-3xl font-bold tracking-tight">👤 My Profile</h1>

   
      <div className="bg-white p-6 shadow-lg rounded-2xl flex flex-col sm:flex-row items-center gap-6">
        <div className="bg-blue-100 p-4 rounded-full">
          <FaRegUser className="w-10 h-10 text-blue-500" />
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-semibold">{session.user.name}</h2>
          <p className="text-gray-600">{session.user.email}</p>
        </div>
      </div>

    
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-4">📦 My Orders</h3>
        {loadingOrders ? (
          <p className="text-gray-500">Loading your orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          <ul className="space-y-6">
            {orders.map((order) => (
              <li
                key={order._id}
                className="p-4 border rounded-xl hover:shadow-md transition"
              >
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div>
                    <p className="font-medium">
                      <span className="text-gray-500">Order ID:</span>{" "}
                      {order._id.slice(-6)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Date: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm">
                      Total:{" "}
                      <span className="text-blue-600 font-semibold">
                        ${order.total.toFixed(2)}
                      </span>
                    </p>
                    <p className="text-sm">
                      Status:{" "}
                      <span
                        className={`font-semibold ${
                          order.isDispatched
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {order.isDispatched ? "Dispatched" : "Pending"}
                      </span>
                    </p>
                  </div>

                  {!order.isDispatched && !order.cancelled && (
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  )}
                </div>

              
                <div className="mt-3">
                  <h4 className="font-semibold text-sm mb-1">Items:</h4>
                  <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                    {order.products.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex justify-between items-center border-b py-1"
                      >
                        <span>{item.name}</span>
                        <span className="text-gray-600">${item.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      
      <div className="grid md:grid-cols-2 gap-6">
       
        <Link href="/cart">
          <div className="cursor-pointer bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3">🛒 My Cart</h3>
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {cartItems.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center border-b pb-1"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-600">₹{item.price}</p>
                    </div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Link>

       
        <div className="bg-white shadow-lg rounded-2xl p-6 space-y-4">
          <h3 className="text-xl font-semibold">📢 Sponsored</h3>
          {[
            {
              title: "🔥 30% Off on Puma",
              desc: "Hurry! Limited time offer.",
              href: "/puma",
              bg: "bg-blue-100",
            },
            {
              title: "🎧 Trending Boat Gadgets",
              desc: "Check out new arrivals.",
              href: "/boat",
              bg: "bg-green-100",
            },
           
          ].map((ad, idx) => (
            <Link href={ad.href} key={idx}>
              <div
                className={`rounded-lg p-4 cursor-pointer hover:opacity-90 transition ${ad.bg}`}
              >
                <h4 className="font-semibold">{ad.title}</h4>
                <p className="text-sm text-gray-700">{ad.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
