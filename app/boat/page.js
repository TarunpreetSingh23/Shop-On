'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

const products = [
 
  {
    id: 900,
    name: 'Boat Stone 1200',
    description: 'Powerful 14W speaker with RGB lights, dual EQ modes, and a 9-hour battery backup. IPX7 waterproof design.',
    price: 79.99,
    originalPrice: 120.0,
    discount: '33%',
    image: '/New_folder/boat_speaker2.png',
    category: 'speakers',
    rating: 4.6,
  },
  {
    id: 901,
    name: 'Boat Stone 650',
    description: 'Rugged Bluetooth speaker with immersive stereo sound, 1800mAh battery, and water resistance.',
    price: 69.99,
    originalPrice: 105.0,
    discount: '33%',
    image: '/New_folder/boat_speaker3.png',
    category: 'speakers',
    rating: 4.4,
  },
  {
    id: 902,
    name: 'Boat Stone Grenade',
    description: 'Compact grenade-shaped speaker with punchy bass, 7 hours playtime, and shockproof build.',
    price: 49.99,
    originalPrice: 75.0,
    discount: '33%',
    image: '/New_folder/boat3.png',
    category: 'speakers',
    rating: 4.2,
  },
  {
    id: 903,
    name: 'Boat Stone 350',
    description: 'Wireless portable speaker with Type-C charging, 10W RMS sound, and IPX7 waterproof rating.',
    price: 59.99,
    originalPrice: 90.0,
    discount: '33%',
    image: '/New_folder/boat_speaker4.jpg',
    category: 'speakers',
    rating: 4.5,
  },

  // AIRPODS STYLE EARBUDS
  {
    id: 904,
    name: 'AirPods Pro Gen 2',
    description: 'Advanced noise cancellation, adaptive transparency, and up to 6 hours of listening time.',
    price: 129.99,
    originalPrice: 195.0,
    discount: '33%',
    image: '/New_folder/boat10.jpg',
    category: 'airpods',
    rating: 4.8,
  },
  {
    id: 905,
    name: 'headphone 3rd Gen',
    description: 'Spatial audio with dynamic head tracking, sweat & water resistance, and MagSafe charging case.',
    price: 119.99,
    originalPrice: 180.0,
    discount: '33%',
    image: '/New_folder/boat5.png',
    category: 'airpods',
    rating: 4.7,
  },
  {
    id: 906,
    name: 'AirPods Lite',
    description: 'Entry-level AirPods with 24-hour battery support and seamless Apple ecosystem integration.',
    price: 99.99,
    originalPrice: 150.0,
    discount: '33%',
    image: '/New_folder/boat2.jpg',
    category: 'airpods',
    rating: 4.3,
  },
  {
    id: 907,
    name: 'AirPods Studio Buds',
    description: 'Compact earbuds with strong bass, noise isolation, and Siri support. Designed for music on-the-go.',
    price: 109.99,
    originalPrice: 165.0,
    discount: '33%',
    image: '/New_folder/boat11.png',
    category: 'airpods',
    rating: 4.6,
  }
];

export default function GadgetsPage() {
  const [cartItems, setCartItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const router = useRouter();
  const {data:session}=useSession();

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  const addToCart = (product) => {
    toast.success("item added to cart")
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const buyNow = (product) => {
    if(!session){
      
      router.push("/login");
      alert("Login required");

    }
    else{

      localStorage.setItem('cart', JSON.stringify([product]));
      router.push('/checkout');
    }
  };

  const filteredProducts = products.filter((product) => {
    if (filter === 'all') return true;
    return product.category === filter;
  });

  return (
    <div
      className="bg-[#e3e6f3] min-h-screen pt-[80px] p-[25px] px-4 sm:px-6"
      style={{ backgroundImage: "url('/New_folder/electronic23.png')" }}
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-white/70 backdrop-blur-xl rounded-xl px-4 py-2 w-fit mx-auto text-black mb-6 shadow">
        ELECTRONIC ITEMS
      </h2>

     
      <div className="flex justify-center gap-3 mb-6 flex-wrap">
        {['all', 'airpods', 'speakers'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full border font-medium transition ${
              filter === type
                ? 'bg-orange-500 text-white border-orange-500'
                : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {type === 'all' ? 'All Items' : type === 'airpods' ? '🎧 AirPods' : '🔊 Speakers'}
          </button>
        ))}
      </div>

     
      <div className="flex flex-wrap items-center justify-center gap-6 pb-24">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => router.push(`/product/${product.id}`)}
            className="bg-white sm:w-[47%] md:w-[32%] lg:w-[280px] rounded-xl shadow-md p-4 text-center transition hover:shadow-xl cursor-pointer flex flex-col"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[220px] object-cover rounded-lg mb-3"
            />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{product.name}</h3>
            <p className="text-sm sm:text-base text-gray-600 mt-1 line-clamp-2">{product.description}</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="text-black font-bold text-lg sm:text-xl">${product.price.toFixed(2)}</span>
              <span className="text-gray-500 line-through text-sm">${product.originalPrice.toFixed(2)}</span>
              <span className="text-red-500 text-sm font-semibold">({product.discount} OFF)</span>
            </div>
            <div className="flex justify-center text-yellow-400 mt-1">
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
               {/* <span className="text-gray-600 ml-2 text-sm">({product.rating})</span> */}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <button
                className="flex-1 bg-[#1e263b] text-white px-3 py-2 rounded hover:bg-blue-700 text-sm sm:text-base"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
              >
                Add to Cart
              </button>
              <button
                className="flex-1 bg-orange-500 text-white px-3 py-2 rounded hover:bg-orange-600 text-sm sm:text-base"
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
      </div>

     
      <div
        className="fixed bottom-6 right-6 w-14 h-14 sm:w-16 sm:h-16 bg-blue-200 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer z-50 hover:bg-blue-900"
        onClick={() => router.push('/cart')}
      >
        🛒
        {cartItems.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
      </div>
    </div>
  );
}