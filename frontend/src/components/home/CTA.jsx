import React from "react";

export default function CTA() {
  return (
    <section className="bg-gradient-to-r from-teal-500 to-green-500 text-white text-center py-16">
      <h2 className="text-2xl font-semibold mb-2">
        Ready to boost your productivity?
      </h2>
      <p className="text-sm mb-6">
        Join teams who are already managing their tasks smarter with TaskFlow.
      </p>
      <div className="flex justify-center gap-4">
        <button className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 focus:ring-violet-500 shadow-lg shadow-violet-500/25 px-6 py-3 text-base px-8">
          Get Started Free
        </button>
        <button className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border-2 border-white text-white hover:border-violet-500 hover:text-violet-600 focus:ring-violet-500 bg-white/10 backdrop-blur-sm px-6 py-3 text-base px-8 hover:bg-white/20 whitespace-nowrap">
          Sign In
        </button>
      </div>
    </section>
  );
}