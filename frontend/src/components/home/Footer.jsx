import React from "react";
import logo from "../../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#0b1220] text-gray-400 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src={logo} alt="TaskFlow" className="h-6 w-6" />
            <span className="text-white font-semibold">TaskFlow</span>
          </div>
          <p className="text-sm">
            Smart task management system built with modern technologies.
            Secure, reliable, and designed for productivity.
          </p>
        </div>

        <div>
          <h4 className="text-white font-medium mb-2">Product</h4>
          <ul className="text-sm space-y-1">
            <li>Dashboard</li>
            <li>Kanban Board</li>
            <li>Analytics</li>
            <li>Important Tasks</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-2">Resources</h4>
          <ul className="text-sm space-y-1">
            <li>Documentation</li>
            <li>GitHub</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
      </div>

      <p className="text-center text-xs mt-8">
        © 2025 TaskFlow. All rights reserved.
      </p>
    </footer>
  );
}