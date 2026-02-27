import React from "react";
import logo from "../../assets/logo.png";

export default function Header() {
  return (
    <nav className="flex items-center justify-between px-10 py-4 bg-[#dff5ef]">
      <div className="flex items-center gap-2">
        <img src={logo} alt="TaskFlow" className="h-8 w-8" />
        <span className="font-bold text-lg">TaskFlow</span>
      </div>
      <div className="flex items-center gap-4">
        <a href="/login" className="text-sm text-gray-700">
          Sign In
        </a>
        <button className="px-4 py-2 rounded-md bg-purple-600 text-white text-sm">
          Get Started
        </button>
      </div>
    </nav>
  );
}