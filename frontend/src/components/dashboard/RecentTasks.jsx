// // src/components/RecentTasks.jsx

// export default function RecentTasks() {
//   const tasks = [
//     {
//       name: "Email Notification System",
//       desc: "Build scalable email notification service with templates, scheduling, and delivery tracking for...",
//       date: "1/3/2025",
//       status: "low",
//     },
//     {
//       name: "Content Management System",
//       desc: "Create headless CMS for marketing team to manage blog posts, landing pages, and...",
//       date: "1/3/2025",
//       status: "low",
//     },
//     {
//       name: "Mobile App Performance Optimization",
//       desc: "Optimize React Native app performance by reducing bundle size, implementing lazy...",
//       date: "2/2/2025",
//       status: "medium",
//     },
//     {
//       name: "Customer Feedback Portal",
//       desc: "Develop customer feedback collection portal with survey forms, rating system, and admi...",
//       date: "1/2/2025",
//       status: "medium",
//       progress: "In progress",
//     },
//     {
//       name: "Accessibility Compliance",
//       desc: "Ensure WCAG 2.1 AA compliance across all web applications with keyboard navigation...",
//       date: "2/1/2025",
//       status: "medium",
//     },
//   ];

//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="font-semibold text-lg">Recent Tasks</h3>
//         <a href="#" className="text-purple-600 text-sm font-medium">
//           View all
//         </a>
//       </div>

//       <div className="space-y-3">
//         {tasks.map((t) => (
//           <div
//             key={t.name}
//             className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer transition"
//           >
//             {/* Left icon */}
//             <div className="bg-[#EDE9FE] p-2 rounded-lg">
//               <i className="ri-circle-line text-xl text-[#7C67F2]"></i>
//             </div>

//             <div className="flex-1">
//               <p className="font-medium text-sm">{t.name}</p>
//               <p className="text-gray-500 text-xs mt-1">{t.desc}</p>

//               <div className="flex items-center gap-4 mt-2">
//                 <span className="text-xs text-gray-800 font-semibold bg-[#e7e8e9] px-2 rounded-md">
//                   {t.progress || "Todo"}
//                 </span>

//                 {/* Calendar date */}
//                 <span className="flex items-center gap-1 text-xs text-gray-400">
//                   <i className="ri-calendar-line text-sm"></i>
//                   {t.date}
//                 </span>
//               </div>
//             </div>

//             <span
//               className={`text-xs font-medium px-2 py-1 rounded-full ${
//                 t.status === "low"
//                   ? "bg-green-100 text-green-600"
//                   : "bg-orange-100 text-orange-600"
//               }`}
//             >
//               {t.status}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// src/components/dashboard/RecentTasks.jsx

import { useSelector } from "react-redux";

export default function RecentTasks() {
  const { list, loading } = useSelector((state) => state.tasks);

  // Sort newest first
  const recentTasks = [...list]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <p className="text-gray-500">Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg">Recent Tasks</h3>
      </div>

      <div className="space-y-3">
        {recentTasks.length === 0 ? (
          <p className="text-gray-400 text-sm">No tasks found.</p>
        ) : (
          recentTasks.map((task) => (
            <div
              key={task._id}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
            >
              {/* Left Icon */}
              <div className="bg-[#EDE9FE] p-2 rounded-lg">
                <i className="ri-circle-line text-xl text-[#7C67F2]"></i>
              </div>

              {/* Task Info */}
              <div className="flex-1">
                <p className="font-medium text-sm">{task.title}</p>
                <p className="text-gray-500 text-xs mt-1 line-clamp-1">
                  {task.description}
                </p>

                <div className="flex items-center gap-4 mt-2">
                  {/* Status */}
                  <span
                    className={`text-xs px-2 py-1 rounded-md font-semibold ${
                      task.status === "Completed"
                        ? "bg-green-100 text-green-600"
                        : task.status === "In Progress"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {task.status}
                  </span>

                  {/* Due Date */}
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <i className="ri-calendar-line"></i>
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Priority Badge */}
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  task.priority === "low"
                    ? "bg-green-100 text-green-600"
                    : task.priority === "medium"
                    ? "bg-orange-100 text-orange-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {task.priority}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}