import React from "react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-teal-500 to-green-500 text-white text-center py-24 px-4 relative overflow-hidden">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Smart Task Management <br /> for Modern Teams
      </h1>
      <p className="max-w-2xl mx-auto text-sm md:text-base mb-2 opacity-90">
        Streamline your workflow with our intelligent task management system.
        Track progress, analyze performance, and achieve more together.
      </p>
      <p className="text-xs opacity-80 mb-8">
        Secure JWT Authentication • Role-Based Access Control • Real-time Analytics
      </p>

      <div className="flex justify-center gap-4">
        <button className="px-6 py-3 rounded-md bg-purple-600 text-white font-medium">
          Start Free Trial
        </button>
        <button className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border-2 border-white text-white hover:border-violet-500 hover:text-violet-600 focus:ring-violet-500 bg-white/10 backdrop-blur-sm px-6 py-3 text-base px-8 hover:bg-white/20 whitespace-nowrap">
          View Demo Dashboard
        </button>
      </div>
    </section>
  );
}