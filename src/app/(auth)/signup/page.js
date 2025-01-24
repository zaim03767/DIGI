"use client";
import React from "react";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  return (
    <div className="container px-4 mx-auto w-full h-screen flex items-center justify-center">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold capitalize">
            Register yourself
          </h2>
        </div>
        <form action="">
          <div className="mb-6">
            <label className="block mb-2 font-extrabold" htmlFor="">
              Username
            </label>
            <input
              className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded"
              type="text"
              placeholder="username"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-extrabold" htmlFor="">
              Email
            </label>
            <input
              className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded"
              type="email"
              placeholder="email"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-extrabold" htmlFor="">
              Password
            </label>
            <input
              className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded"
              type="password"
              placeholder="**********"
            />
          </div>
          <button className="inline-block w-full py-4 px-6 mb-6 text-center text-lg leading-6 text-white font-extrabold bg-indigo-800 hover:bg-indigo-900 border-3 border-indigo-900 shadow rounded transition duration-200">
            Register
          </button>
          <p className="text-center font-extrabold">
            Already have an account?{" "}
            <a
              className="text-red-500 hover:underline"
              href="#"
              onClick={() => router.push("/signin")}
            >
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default page;
