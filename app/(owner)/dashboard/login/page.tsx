"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const BusinessLogin = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email.trim()) {
      // Set cookie manually
      document.cookie = `email=${email}; path=/; max-age=${
        60 * 60 * 24 * 1000
      }`; // 1 day

      // Redirect to dashboard
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 px-4">
      <h1 className="text-4xl font-bold">Business Login</h1>
      <p className="mt-2 text-gray-600">
        Please enter your credentials to access the business dashboard.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 w-full max-w-sm space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default BusinessLogin;
