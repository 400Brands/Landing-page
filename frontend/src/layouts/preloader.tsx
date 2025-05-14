"use client";
import { useEffect, useState } from "react";

export const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "auto";
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative w-32 h-32">
        {/* Animated logo */}
        <div className="absolute inset-0 flex items-center justify-center animate-spin">
          <div className="w-24 h-24 rounded-full border-4 border-yellow-500 border-t-transparent"></div>
        </div>

        {/* Countdown */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-2xl font-bold">400</span>
        </div>

        {/* Loading text */}
        <div className="absolute -bottom-10 w-full text-center">
          <p className="text-yellow-500 font-medium">Loading...</p>
          <div className="h-1 bg-gradient-to-r from-yellow-500 to-purple-500 mt-2 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
