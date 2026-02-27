import React from "react";

export default function Preview() {
  return (
    <section className="py-16 text-center">
      <h2 className="text-2xl font-semibold mb-2">See TaskFlow in Action</h2>
      <p className="text-gray-500 text-sm mb-8">
        Experience our intuitive Kanban board and powerful analytics dashboard
      </p>

      <div className="flex justify-center">
        <div className="w-[80%] h-[350px] rounded-xl bg-gray-200 blur-sm shadow-xl"></div>
      </div>
    </section>
  );
}