import React from "react";
import { RiKanbanView } from "react-icons/ri";

export default function Features() {
  const features = [
    ["Kanban Board", "Visualize your workflow with drag-and-drop task management across customizable columns."],
    ["Analytics Dashboard", "Track productivity with detailed charts and insights on task completion and progress."],
    ["Important Tasks", "Mark and prioritize critical tasks for quick access and better focus."],
    ["Team Collaboration", "Work together with shared workspaces, comments, and real-time updates."],
    ["Secure & Reliable", "Enterprise-grade security with JWT authentication and role-based access control."],
    ["Responsive Design", "Access your tasks from any device with our fully responsive interface."],
  ];

  return (
    <section className="py-20 bg-gray-50">
      <h2 className="text-2xl font-semibold text-center mb-2">
        Everything you need to stay organized
      </h2>
      <p className="text-center text-gray-500 mb-10 text-sm">
        Powerful features designed to help you manage tasks efficiently and collaborate seamlessly.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
        {features.map(([title, desc], i) => (
          <div
            key={i}
            className="bg-slate-100 hover:bg-teal-50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group rounded-xl p-6 shadow-sm"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <RiKanbanView className="text-white text-2xl" />
            </div>
            <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}