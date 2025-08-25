'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const images = [
  {
    src: '/images/bag.png',
    alt: 'Nike Men',
    link: '/caprese',
  },
  {
    src: '/images/running.png',
    alt: 'Nike Women',
    link: '/nike',
  },
  {
    src: '/images/bag2.png',
    alt: 'Puma',
    link: '/haute',
  },
  {
    src: '/images/pond2.jpg',
    alt: 'Puma',
    link: '/facial',
  },

];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide without dependency
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-screen max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden h-[30vh] sm:h-[45vh]">
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              currentIndex === index ? 'opacity-100 z-20' : 'opacity-0 z-10'
            }`}
          >
            <Link href={image.link}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cotain w-full h-full"
                priority={index === 0}
              />
            </Link>
          </div>
        ))}
      </div>

      {/* Prev Button */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full z-30 shadow"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full z-30 shadow"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'bg-black scale-110' : 'bg-gray-300'
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}
