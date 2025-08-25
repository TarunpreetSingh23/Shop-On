"use client";
import React from "react";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

const AboutUs = () => {
  return (
    <div className="max-w-[1200px] mt-[65px] mx-auto p-6">
   
      <div className="text-center bg-[#f8f9fa] p-8 rounded-xl shadow-md border border-gray-200">
        <h1 className="text-4xl font-bold text-[#20232a]">About ShopOn</h1>
        <p className="text-gray-700 mt-3 max-w-[700px] mx-auto">
          Welcome to ShopOn – your one-stop online destination for electronics, clothing, beauty, and more. We bring top-quality products from trusted brands, right to your doorstep.
        </p>
      </div>

    
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold text-[#20232a]">Our Mission</h2>
        <p className="text-gray-700 mt-2 max-w-[700px] mx-auto">
          To make online shopping easy, secure, and enjoyable by delivering premium products, seamless user experience, and quick support – all in one place.
        </p>
      </div>

  
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-center text-[#20232a]">
          Why Shop With Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {[
            "Wide Range of Products",
            "Trusted & Verified Brands",
            "Fast & Free Shipping",
            "Easy Returns & Refunds",
            "Secure Payments",
            "24/7 Customer Support",
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-lg shadow hover:shadow-lg text-center border border-gray-200"
            >
              <p className="font-semibold text-[#20232a]">{item}</p>
            </div>
          ))}
        </div>
      </div>

    
      <div className="mt-10 text-center">
        <h2 className="text-2xl font-bold text-[#20232a]">Our Story</h2>
        <p className="text-gray-700 mt-2 max-w-[700px] mx-auto">
          Founded in 2025, ShopOn was born out of a vision to offer a world-class online shopping experience to everyone. Today, we serve thousands of happy customers across the country.
        </p>
      </div>

   
      <div className="mt-12 bg-[#f1f2f4] p-6 rounded-lg shadow border border-gray-200">
        <h2 className="text-2xl font-bold text-[#20232a] text-center">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {[
            { name: "Anjali Gupta", review: "Fast delivery and great prices!", rating: 5 },
            { name: "Rohit Mehra", review: "Product quality is amazing!", rating: 4 },
            { name: "Simran Kaur", review: "ShopOn is my favorite shopping app!", rating: 5 },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
            >
              <div className="flex gap-1 text-yellow-500">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="mt-2 text-gray-700 italic">"{item.review}"</p>
              <p className="text-sm font-semibold text-[#20232a] mt-1">
                - {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>

       <div className="mt-8 text-center">
        <Link href={"/gadgets"}>
          <button className="bg-[#20232a] text-white px-6 py-3 rounded-full hover:bg-[#2c2f3b] transition">
            Start Shopping Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
