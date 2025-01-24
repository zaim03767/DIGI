"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err) {
      console.log("Error signing in:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container px-4 mx-auto w-full h-screen flex items-center justify-center">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold">Sign in</h2>
        </div>
        <form onSubmit={handleSignIn}>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="mb-6">
            <label className="block mb-2 font-extrabold" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-extrabold" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="inline-block w-full py-4 px-6 mb-6 text-center text-lg leading-6 text-white font-extrabold bg-indigo-800 hover:bg-indigo-900 border-3 border-indigo-900 shadow rounded transition duration-200"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
          <p className="text-center font-extrabold">
            Don&rsquo;t have an account?{" "}
            <a
              className="text-red-500 hover:underline"
              onClick={() => router.push("/signup")}
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
