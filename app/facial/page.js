'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
const facialProducts = [
  {
    id: 201,
    name: 'Ponds Face Wash',
    description: 'Deep clean face wash for glowing skin.',
    price: 12.99,
    originalPrice: 19.99,
    discount: '35%',
    image: '/images/pond10.webp',
    rating: 4.5,
  },
  {
    id: 202,
    name: 'ponds age miracle',
    description: 'Gentle exfoliation for acne-prone skin.',
    price: 6.5,
    originalPrice: 9.99,
    discount: '35%',
    image: '/images/pond6.webp',
    rating: 4.2,
  },
  {
    id: 207,
    name: 'Pond’s hydra Cream',
    description: 'Instant coverage with skincare benefits.',
    price: 5.99,
    originalPrice: 8.99,
    discount: '33%',
    image: '/New_folder/ponds_cream.webp',
    rating: 4.7,
  },
  {
    id: 204,
    name: 'pond Moisturizer',
    description: 'Hydrating cream for all-day softness.',
    price: 7.99,
    originalPrice: 12.50,
    discount: '36%',
    image: '/images/pon5.webp',
    rating: 4.8,
  },
  {
    id: 205,
    name: 'ponds Night Cream',
    description: 'Repair and nourish your skin overnight.',
    price: 11.5,
    originalPrice: 16.99,
    discount: '32%',
    image: '/images/pond7.webp',
    rating: 4.6,
  },
  {
    id: 206,
    name: 'Ponds Light',
    description: 'Complete facial care with natural glow.',
    price: 18.0,
    originalPrice: 25.00,
    discount: '28%',
    image: '/images/pond11.webp',
    rating: 4.9,
  },
  {
    id: 203,
    name: 'Ponds gel pack',
    description: 'Turmeric-based for tan removal and glow.',
    price: 9.99,
    originalPrice: 14.99,
    discount: '33%',
    image: '/images/pond12.webp',
    rating: 4.4,
  },
  {
    id: 208,
    name: 'Ponds gel cream',
    description: 'Remove makeup and cleanse without rinsing.',
    price: 4.99,
    originalPrice: 7.50,
    discount: '33%',
    image: '/images/pond13.webp',
    rating: 4.7,
  }
];

export default function FacialPage() {
  const [cartItems, setCartItems] = useState([]);
  const [search, setSearch] = useState('');
  const router = useRouter();
  const {data:session}=useSession();

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  const addToCart = (product) => {
     toast.success("item added to cart")
    const updated = [...cartItems, product];
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const buyNow = (product) => {
    if(!session){
      alert("Login required");
      router.push("/login");

    }
    else{


      addToCart(product);
      router.push('/checkout');
    }
  };

  const filteredProducts = facialProducts.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="min-h-screen mt-[65px] p-[25px] bg-no-repeat bg-cover pt-[70px]"
      //style={{ backgroundImage: "url('/New_folder/facial2.png')" }}
    >
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-3xl bg-white/60 backdrop-blur-2xl rounded-2xl px-6 py-3 font-bold text-black shadow-lg mb-4">
         Women Facial Care Ponds Products
        </h2>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm px-4 bg-white py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-6 px-4 pb-24">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white w-full sm:w-[47%] md:w-[32%] lg:w-[280px] rounded-xl shadow-md p-4 text-center transition hover:shadow-xl cursor-pointer flex flex-col justify-between"
            onClick={() => router.push(`/product/${product.id}`)}
          >
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[180px] object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-blue-700 font-bold text-lg sm:text-xl">${product.price.toFixed(2)}</span>
                <span className="text-gray-500 line-through text-sm">${product.originalPrice.toFixed(2)}</span>
                <span className="text-red-500 text-sm font-semibold">({product.discount} OFF)</span>
              </div>
              <div className="flex justify-center text-yellow-400 mt-1">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <button
                className="bg-[#1e263b] text-white px-4 py-2 rounded-md hover:bg-[#334166] transition text-sm flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
              >
                Add to Cart
              </button>
              <button
                className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-md hover:from-orange-500 hover:to-orange-600 transition text-sm flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  buyNow(product);
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
        
        {filteredProducts.length === 0 && (
          <p className="text-white text-lg bg-black/60 px-4 py-2 rounded-md shadow-md">
            No products found.
          </p>
        )}
      </div>

      <div
        className="fixed bottom-6 right-6 w-14 h-14 md:w-16 md:h-16 hover:bg-gray-800 bg-blue-100 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer z-50"
        onClick={() => router.push('/cart')}
      >
        🛒
        {cartItems.length > 0 && (
          <span className="absolute top-[-5px] right-[-5px] bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
      </div>
    </div>
  );
}