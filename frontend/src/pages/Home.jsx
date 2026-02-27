import React from "react";
import Header from "../components/home/Header";
import Hero from "../components/home/Hero";
import Preview from "../components/home/Preview";
import Features from "../components/home/Features";
import CTA from "../components/home/CTA";
import Footer from "../components/home/Footer";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <Hero />
      <Preview />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}