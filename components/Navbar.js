"use client";
import React, { useState } from "react";
import "flowbite";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
// import ProfileDropdown from "@/components/ProfileDropdown";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [openMenu, setOpenMenu] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  return (
    <div className="relative ">
      <div className="bg-[#20232a] text-white  border-5 rounded-2xl rounded-b-2xl border-white shadow-md  z-50 w-full font-semibold text-xl p-3 fixed top-0">
        <nav className="flex justify-between items-center w-[100%] rounded-2xl">
       <Link href={"/"}>  <div className="text-2xl flex font-bold tracking-wider gap-1"><span className="translate-1.5 hidden sm:block"><FaCartShopping /></span><span className="translate-x-2 hidden sm:block">Shop ON</span>  </div></Link> 

          <div className="flex items-center gap-4">
          
            <GiHamburgerMenu
              className="block sm:hidden text-3xl translate-x-[-240%] cursor-pointer"
              onClick={() => setOpenMenu(true)}
            />

           
            <div className="hidden sm:flex text-[16px] flex-row gap-6 bg-blue-50 px-4 py-2 rounded-2xl">
              <Link href="/" className=" hover:text-blue-500 text-blue-950 transition-all">
                HOME
              </Link>

              <div
                className="relative group cursor-pointer "
                onClick={()=>{setShowCategories(!showCategories)}}
             
              ><div className="flex flex-row gap-2 hover:text-blue-500 ">

                <span className="hover:undeline hover:text-blue-500 transition-all   text-blue-950 ">CATEGORIES 
</span><span><IoIosArrowDown  className="text-gray-900 translate-y-1 "/></span>
              </div>

              
                {showCategories && (
                  <div className="absolute top-8 left-0 w-48 bg-white text-[#20232a] shadow-lg rounded-md z-50 p-1 space-y-1 animate-fadeIn">
                     <Link href={"/clothing"} className="block px-3 py-2 hover:bg-gray-100 rounded">
                      <div className="flex flex-row justify-between">
                       <span>
                        Clothing
                        </span>
                        <span>
                          <IoIosArrowForward className="translate-1" />
                          </span>
                      </div>
                    </Link>
                    <Link href={"/gadgets"} className="block px-3 py-2 hover:bg-gray-100 rounded">
                     <div className="flex flex-row justify-between">
                       <span>
                        Gadgets
                        </span>
                        <span>
                          <IoIosArrowForward className="translate-1" />
                          </span>
                      </div>

                    </Link>
                    <Link href={"/facial"} className="block px-3 py-2 hover:bg-gray-100 rounded">
                      <div className="flex flex-row justify-between">
                       <span>
                        Facial Products
                        </span>
                        <span>
                          <IoIosArrowForward className="translate-1" />
                          </span>
                      </div>
                    </Link>
                     <Link href={"/bag"} className="block px-3 py-2 hover:bg-gray-100 rounded">
                     <div className="flex flex-row justify-between">
                       <span>
                        Leather Bags
                        </span>
                        <span>
                          <IoIosArrowForward className="translate-1" />
                          </span>
                      </div>
                    </Link>
                 
                   
                  </div>
                )}
              </div>

              
              <Link href="/about" className="hover:text-blue-500  text-blue-950  transition-all">
                ABOUT
              </Link>
            </div>
          </div>
   
         
          {!session ? (
            <div className="flex flex-row gap-2 items-center">
              <Link href={"/register"}>
                <button className="bg-blue-50 text-[#20232a] shadow-md hover:shadow-lg transition-all duration-300 text-sm py-2 px-5 rounded-full border border-gray-300">
                  Sign up
                </button>

              </Link>
              <Link href={"/login"}>
                <button className="bg-blue-50 text-[#20232a] shadow-md hover:shadow-lg transition-all duration-300 text-sm py-2 px-5 rounded-full border border-gray-400">
                  Login
                </button>

              </Link>
              <Link href={"/cart"}>
                <button className="text-gray-800 flex gap-1 bg-blue-50 hover:bg-gradient-to-l text-sm py-2 rounded-full px-4">
                  <FaCartShopping className=" my-0.5 mx-1"/>
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-row gap-2 items-center">
              <button
                onClick={() => signOut()}
                className="text-gray-800 bg-blue-50 hover:bg-gradient-to-l text-sm py-2 rounded-4xl px-4"
              >
                Logout
              </button>
              <Link href={"/user"}>
                <button className="text-gray-800 flex gap-1 bg-blue-50 hover:bg-gradient-to-l text-sm py-2 rounded-full px-4">
                  <FaUser  className="translate-y-1"/><span className="hidden  sm:inline">{session?.user?.name}</span>
                </button>
              </Link>
               <Link href={"/cart"}>
                <button className="text-gray-800 flex gap-1 bg-blue-50 hover:bg-gradient-to-l text-sm py-2 rounded-full px-4">
                  <FaCartShopping className=" my-0.5 mx-1"/>
                </button>
              </Link>

            </div>
          )}
        </nav>
      </div>


      {openMenu && (
        <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 p-5 transition-transform duration-300">
          <IoMdClose
            className="text-2xl cursor-pointer mb-5"
            onClick={() => setOpenMenu(false)}
          />

          <div className="flex flex-col gap-4 text-lg font-semibold text-[#20232a]">
            <Link href="/" onClick={() => setOpenMenu(false)}>
              HOME
            </Link>
            <div className="flex flex-col gap-1">
              <span className="text-gray-700">CATEGORIES</span>
              <Link href="/gadgets" onClick={() => setOpenMenu(false)} className="ml-3 text-sm">
                Gadgets
              </Link>
              <Link href="/facial" onClick={() => setOpenMenu(false)} className="ml-3 text-sm">
                Ponds Products
              </Link>
              <Link href="/bag" onClick={() => setOpenMenu(false)} className="ml-3 text-sm">
                Stylish Bags
              </Link>
              <Link href="/clothing" onClick={() => setOpenMenu(false)} className="ml-3 text-sm">
                Clothing
              </Link>
            </div>
           
            <Link href="/about" onClick={() => setOpenMenu(false)}>
              ABOUT
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
