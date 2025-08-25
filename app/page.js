"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import HeroCarousel from "@/components/herocarosel";
import SaleSection from "@/components/salesection";
import Salemoving from "@/components/salemoving";

export default function Home() {
  const {data:session}=useSession();
  const router=useRouter();
  const [services, setServices] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      setloading(true)
      const res = await fetch("/api/services");
      const data = await res.json();
      setTimeout(() => {
        setloading(false);
        setServices(data);
      }, 1000);
   
    }
    fetchServices();
  }, []);
  

  return (
    <>
    <div className="mt-[65px] w-screen mb-4">

    <HeroCarousel/>
    </div>
    
      

     
      <div className="max-w-[1400px] mx-auto p-8">
        {/* <div className="flex gap-4 justify-between">
               <div className="w-[25vw]"><Salemoving/></div>
                 <div className="w-[25vw]"><Salemoving/></div>
                   <div className="w-[25vw]"><Salemoving/></div>
        </div> */}
          <div>
            <h2 className="text-3xl font-thin text-gray-800 mb-6 mt-4 ">
          BIGGEST DEALS ON TOP BRANDS
        </h2>

<div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-4">
  <Link href="/nike">
    <motion.img
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      src="/New_folder/nike1.png"
      alt="Nike"
      className="cursor-pointer rounded-lg shadow-sm hover:shadow-md hover:opacity-90"
    />
  </Link>

  <Link href="/puma">
    <motion.img
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      src="/New_folder/puma1.png"
      alt="Puma"
      className="cursor-pointer rounded-lg shadow-sm hover:shadow-md hover:opacity-90"
    />
  </Link>

 

  

 

 

  <Link href="/polo">
    <motion.img
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      src="/New_folder/polo1.png"
      alt="Polo"
      className="cursor-pointer rounded-lg shadow-sm hover:shadow-md hover:opacity-90"
    />
  </Link>

  <Link href="/tommy">
    <motion.img
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      src="/New_folder/tommy1.png"
      alt="Tommy Hilfiger"
      className="cursor-pointer rounded-lg shadow-sm hover:shadow-md hover:opacity-90"
    />
  </Link>
</div>

          </div>
          <h2 className="text-3xl font-thin text-gray-800 mt-4 mb-4 ">
          GRAND REDUCTION DEAL
        </h2>
        
         
         <div className="w-full">
           <SaleSection />
        </div>
     

      </div>   
    </>
  );
}
