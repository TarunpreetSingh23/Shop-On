import React from 'react';
import Link from 'next/link';
import { IoBagHandle } from "react-icons/io5";
// import { useState } from 'react';
//import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Assumes you have react-icons installed

const Footer = (e) => {

  return (
    <footer className="bg-red-900 text-gray-300 py-10 px-4 md:px-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-700 pb-8">
      
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Shop ON</h3>
          <p className="text-sm">
            Your one-stop shop for all your needs. We are committed to providing the best products and service.
          </p>
         
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Customer Service</h4>
          <ul className="space-y-2">
            
            {/* <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">FAQ</a></li>
            <li><a href="#" className="hover:text-white transition">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li> */}
            <Link href={"/about"}> <li className="hover:text-white transition">About Us</li></Link>  
             <Link href={"/shipping"}> <li className="hover:text-white transition">Shipping & return </li> </Link>  
            <Link href={"/privacy"}> <li className="hover:text-white transition">Privacy Policy</li> </Link>  
            {/* <Link href={"/boat"}> <li className="hover:text-white transition">Boat Products</li> </Link>   */}
          </ul>
        </div>

        
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
          <Link href={"/gadgets"}> <li className="hover:text-white transition">Gadgets</li> </Link>  
             <Link href={"/clothing"}> <li className="hover:text-white transition">Clothing </li> </Link>  
            <Link href={"/facial"}> <li className="hover:text-white transition">Facial Products</li> </Link>  
             <Link href={"/bag"}> <li className="hover:text-white transition">Leather Bags</li> </Link> 
          <Link href={"/boat"}> <li className="hover:text-white transition">Boat Products</li> </Link>  
          </ul>
        </div>
      

      
      </div>

   
      <div className="text-center mt-8">
        &copy; 2025 Shop ON. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
