"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";


const Signup = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("All fields are required");
      setSuccess("");
      return;
    }
    if(password.length<=4){
      setError("password must contain 5 characters")
      setSuccess("");
      return;
    }

    const Existuser = await fetch("/api/userexist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const { user } = await Existuser.json();

    if (user) {
      setSuccess("");
      setError("User already exists");
      return;
    }

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (res.ok) {
      e.target.reset();
      setError("");
      setSuccess("User registered successfully!");
      await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
     
      router.push("/")
      // setTimeout(() => router.push("/"), 1000);
     
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-no-repeat bg-cover"  style={{ backgroundImage: "url('/New_folder/bg5.avif')" }}>
      <div className="bg-white/70 backdrop-blur-lg border-1 shadow-xl rounded-2xl p-8 w-[90%] sm:w-[400px]">
        <h1 className="text-2xl font-bold text-center text-[#1e263b] mb-6">
          Create a New Account
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 "
            type="text"
            placeholder="Username"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 "
            type="email"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 "
            type="password"
            placeholder="Password"
          />

          <button
            type="submit"
            className="mt-2 w-full text-white bg-gradient-to-r from-[#1e263b] to-[#3a3954] hover:bg-gradient-to-l py-2 rounded-lg transition-all duration-300"
          >
            Sign Up
          </button>

          {error && (
            <p className="text-center bg-red-500 text-white py-2 rounded-lg text-sm">
              {error}
            </p>
          )}

          {success && (
            <p className="text-center bg-green-500 text-white py-2 rounded-lg text-sm">
              {success}
            </p>
          )}
        </form>
        <Link href={"/login"}>
        
       <h2 className="text-center m-2 hover:underline">already have an account?</h2>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
