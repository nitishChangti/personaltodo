// // export default function Dashboard() {
// //     return (
// //         <div className="min-h-screen flex font-inter bg-[#F8FAFC]">
// //             {/* Sidebar */}
// //             <aside className="w-48 bg-gradient-to-b from-[#0F172A] to-[#020617] text-white flex flex-col">
// //                 <div className="p-6 flex items-center gap-2">
// //                     <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center">
// //                         <i className="ri-checkbox-circle-line text-xl"></i>
// //                     </div>
// //                     <div>
// //                         <h1 className="font-semibold text-sm">TaskFlow</h1>
// //                         <p className="text-xs text-gray-400">Smart Management</p>
// //                     </div>
// //                 </div>

// //                 <div className="px-4 text-xs text-gray-500 uppercase tracking-wide mt-6 mb-3">Main Menu</div>
// //                 <nav className="px-4 space-y-1">
// //                     <SidebarItem active icon="ri-dashboard-line" text="Dashboard" />
// //                     <SidebarItem icon="ri-layout-grid-line" text="Task Board" />
// //                     <SidebarItem icon="ri-bar-chart-line" text="Analytics" />
// //                     <SidebarItem icon="ri-star-line" text="Important" />
// //                 </nav>

// //                 <div className="mt-auto p-4 flex items-center gap-3 border-t border-gray-700">
// //                     <img src="https://i.pravatar.cc/40" className="rounded-full w-10 h-10" />
// //                     <div className="flex-1">
// //                         <p className="text-sm font-medium">User</p>
// //                         <p className="text-xs text-gray-400">View profile</p>
// //                     </div>
// //                 </div>
// //             </aside>

// //             {/* Main */}
// //             <main className="flex-1 p-8">
// //                 {/* Header */}
// //                 <div className="flex justify-between items-center mb-8">
// //                     <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm w-80">
// //                         <i className="ri-search-line text-gray-400"></i>
// //                         <input
// //                             placeholder="Search tasks..."
// //                             className="flex-1 outline-none text-sm bg-transparent"
// //                         />
// //                         <span className="text-xs text-gray-400">⌘K</span>
// //                     </div>
// //                     <div className="flex items-center gap-4">
// //                         <i className="ri-notification-3-line text-xl text-gray-600 cursor-pointer"></i>
// //                         <img src="https://i.pravatar.cc/40" className="rounded-full w-10 h-10" />
// //                     </div>
// //                 </div>

// //                 <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
// //                 <p className="text-gray-500 mb-8">Welcome back! Here is your task overview.</p>

// //                 {/* Stats */}
// //                 <div className="grid grid-cols-4 gap-6 mb-8">
// //                     <StatCard icon="ri-checkbox-circle-line" title="Total Tasks" value="12" percentage="+12%" color="purple" />
// //                     <StatCard icon="ri-checkbox-circle-line" title="Completed" value="3" percentage="+8%" color="green" />
// //                     <StatCard icon="ri-close-circle-line" title="Overdue" value="9" percentage="-3%" color="red" />
// //                     <StatCard icon="ri-star-line" title="Important Tasks" value="4" color="yellow" />
// //                 </div>

// //                 {/* Content */}
// //                 <div className="grid grid-cols-3 gap-6">
// //                     <div className="col-span-2">
// //                         <RecentTasks />
// //                     </div>
// //                     <RightPanel />
// //                 </div>
// //             </main>
// //         </div>
// //     );
// // }

// // function SidebarItem({ icon, text, active }) {
// //     return (
// //         <div className={`flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer text-sm transition-colors
// //             ${active ? "bg-purple-600 text-white" : "text-gray-400 hover:bg-white/10"}`}>
// //             <i className={`${icon} text-lg`} />
// //             {text}
// //         </div>
// //     );
// // }

// // function StatCard({ icon, title, value, percentage, color }) {
// //     const colorMap = {
// //         purple: "bg-purple-100",
// //         green: "bg-green-100",
// //         red: "bg-red-100",
// //         yellow: "bg-yellow-100"
// //     };

// //     return (
// //         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
// //             <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
// //                 <i className={`${icon} text-xl`}></i>
// //             </div>
// //             <div className="flex justify-between items-end mt-4">
// //                 <div>
// //                     <p className="text-gray-500 text-sm">{title}</p>
// //                     <h3 className="text-3xl font-bold">{value}</h3>
// //                 </div>
// //                 {percentage && <span className="text-green-600 text-sm font-medium">{percentage}</span>}
// //             </div>
// //         </div>
// //     );
// // }

// // function RecentTasks() {
// //     const tasks = [
// //         { name: "Email Notification System", desc: "Build scalable email notification service with templates, scheduling, and delivery tracking for...", date: "1/3/2025", status: "low" },
// //         { name: "Content Management System", desc: "Create headless CMS for marketing team to manage blog posts, landing pages, and...", date: "1/3/2025", status: "low" },
// //         { name: "Mobile App Performance Optimization", desc: "Optimize React Native app performance by reducing bundle size, implementing lazy...", date: "2/2/2025", status: "medium" },
// //         { name: "Customer Feedback Portal", desc: "Develop customer feedback collection portal with survey forms, rating system, and admi...", date: "1/2/2025", status: "medium", progress: "In progress" },
// //         { name: "Accessibility Compliance", desc: "Ensure WCAG 2.1 AA compliance across all web applications with keyboard navigation...", date: "2/1/2025", status: "medium" }
// //     ];

// //     return (
// //         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
// //             <div className="flex justify-between items-center mb-6">
// //                 <h3 className="font-semibold text-lg">Recent Tasks</h3>
// //                 <a href="#" className="text-purple-600 text-sm font-medium">View all</a>
// //             </div>
// //             <div className="space-y-3">
// //                 {tasks.map((t) => (
// //                     <div key={t.name} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer transition">
// //                         <i className="ri-checkbox-blank-circle-line text-xl text-gray-400"></i>
// //                         <div className="flex-1">
// //                             <p className="font-medium text-sm">{t.name}</p>
// //                             <p className="text-gray-500 text-xs mt-1">{t.desc}</p>
// //                             <div className="flex items-center gap-4 mt-2">
// //                                 <span className="text-xs text-gray-400">{t.progress || "Todo"}</span>
// //                                 <span className="text-xs text-gray-400">{t.date}</span>
// //                             </div>
// //                         </div>
// //                         <span className={`text-xs font-medium px-2 py-1 rounded-full ${
// //                             t.status === "low" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
// //                         }`}>{t.status}</span>
// //                     </div>
// //                 ))}
// //             </div>
// //         </div>
// //     );
// // }

// // function RightPanel() {
// //     return (
// //         <div className="space-y-6">
// //             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
// //                 <div className="flex justify-between items-start mb-6">
// //                     <div>
// //                         <p className="text-gray-500 text-sm">Completion Rate</p>
// //                         <h2 className="text-4xl font-bold mt-2">25%</h2>
// //                     </div>
// //                     <i className="ri-more-2-line text-gray-400 cursor-pointer"></i>
// //                 </div>
// //                 <div className="flex justify-center">
// //                     <svg className="w-32 h-32" viewBox="0 0 120 120">
// //                         <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="8" />
// //                         <circle cx="60" cy="60" r="50" fill="none" stroke="#7c3aed" strokeWidth="8" strokeDasharray="78.5 314" strokeLinecap="round" transform="rotate(-90 60 60)" />
// //                     </svg>
// //                 </div>
// //                 <p className="text-center text-gray-500 text-xs mt-4">1 of 12 tasks completed</p>
// //             </div>

// //             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
// //                 <div className="flex justify-between items-start mb-4">
// //                     <p className="font-semibold">Tasks by Priority</p>
// //                     <i className="ri-more-2-line text-gray-400 cursor-pointer"></i>
// //                 </div>
// //                 <div className="space-y-3">
// //                     <div className="flex items-center justify-between">
// //                         <span className="text-sm text-gray-600">High</span>
// //                         <div className="flex-1 mx-3 bg-red-500 h-2 rounded-full" style={{width: "70%"}}></div>
// //                         <span className="text-sm font-medium">5</span>
// //                     </div>
// //                     <div className="flex items-center justify-between">
// //                         <span className="text-sm text-gray-600">Medium</span>
// //                         <div className="flex-1 mx-3 bg-orange-400 h-2 rounded-full" style={{width: "70%"}}></div>
// //                         <span className="text-sm font-medium">5</span>
// //                     </div>
// //                     <div className="flex items-center justify-between">
// //                         <span className="text-sm text-gray-600">Low</span>
// //                         <div className="flex-1 mx-3 bg-green-500 h-2 rounded-full" style={{width: "40%"}}></div>
// //                         <span className="text-sm font-medium">2</span>
// //                     </div>
// //                 </div>
// //             </div>

// //             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
// //                 <p className="font-semibold mb-4">Quick Actions</p>
// //                 <button className="w-full py-3 rounded-lg bg-purple-50 text-purple-600 font-medium text-sm hover:bg-purple-100 transition mb-3 flex items-center justify-center gap-2">
// //                     <i className="ri-add-line"></i> New Task
// //                 </button>
// //                 <button className="w-full py-3 rounded-lg bg-gray-50 text-gray-600 font-medium text-sm hover:bg-gray-100 transition flex items-center justify-center gap-2">
// //                     <i className="ri-bar-chart-line"></i> Analytics
// //                 </button>
// //             </div>
// //         </div>
// //     );
// // }

// import Sidebar from "../components/dashboard/Sidebar";
// import StatCard from "../components/dashboard/StatCard";
// import RecentTasks from "../components/dashboard/RecentTasks";
// import RightPanel from "../components/dashboard/RightPanel";


// export default function Dashboard() {
//   return (
//     <div className="min-h-screen flex font-inter bg-[#F8FAFC]">
//       <Sidebar />

//       {/* Main */}
//       <main className="flex-1 p-8">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm w-80">
//             <i className="ri-search-line text-gray-400"></i>
//             <input
//               placeholder="Search tasks..."
//               className="flex-1 outline-none text-sm bg-transparent"
//             />
//             <span className="text-xs text-gray-400">⌘K</span>
//           </div>
//           <div className="flex items-center gap-4">
//             <i className="ri-notification-3-line text-xl text-gray-600 cursor-pointer"></i>
//             <img
//               src="https://i.pravatar.cc/40"
//               className="rounded-full w-10 h-10"
//             />
//           </div>
//         </div>

//         <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
//         <p className="text-gray-500 mb-8">
//           Welcome back! Here is your task overview.
//         </p>    
//         {/* Stats */}
//         <div className="grid grid-cols-4 gap-6 mb-8">
//   <StatCard
//     icon="ri-task-line"
//     title="Total Tasks"
//     value="12"
//     percentage="+12%"
//     color="purple"
//   />
//   <StatCard
//     icon="ri-checkbox-circle-line"
//     title="Completed"
//     value="3"
//     percentage="+8%"
//     color="green"
//   />
//   <StatCard
//     icon="ri-time-line"
//     title="Overdue"
//     value="9"
//     percentage="-3%"
//     color="red"
//   />
//   <StatCard
//     icon="ri-star-line"
//     title="Important Tasks"
//     value="4"
//     color="yellow"
//   />
// </div>

//         {/* Content */}
//         <div className="grid grid-cols-3 gap-6">
//           <div className="col-span-2">
//             <RecentTasks />
//           </div>
//           <RightPanel />
//         </div>
//       </main>
//     </div>
//   );
// }

// src/pages/Dashboard.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../store/taskSlice";

import Sidebar from "../components/dashboard/Sidebar";
import StatCard from "../components/dashboard/StatCard";
import RecentTasks from "../components/dashboard/RecentTasks";
import RightPanel from "../components/dashboard/RightPanel";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.tasks);

  // 🔥 Fetch tasks on mount
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // ===============================
  // 📊 Dynamic Calculations
  // ===============================

  const totalTasks = list.length;
  console.log(
    'total task',totalTasks
  );
  const completedTasks = list.filter(
    (task) => task.status === "Completed"
  ).length;

  const overdueTasks = list.filter(
    (task) =>
      new Date(task.dueDate) < new Date() &&
      task.status !== "Completed"
  ).length;

  const importantTasks = list.filter(
    (task) => task.important === true
  ).length;

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="min-h-screen flex font-inter bg-[#F8FAFC]">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm w-80">
            <i className="ri-search-line text-gray-400"></i>
            <input
              placeholder="Search tasks..."
              className="flex-1 outline-none text-sm bg-transparent"
            />
            <span className="text-xs text-gray-400">⌘K</span>
          </div>

          <div className="flex items-center gap-4">
            <i className="ri-notification-3-line text-xl text-gray-600 cursor-pointer"></i>
            <img
              src="https://i.pravatar.cc/40"
              className="rounded-full w-10 h-10"
              alt="profile"
            />
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
        <p className="text-gray-500 mb-8">
          Welcome back! Here is your task overview.
        </p>

        {/* ===============================
            📊 STAT CARDS (REAL DATA)
        =============================== */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <StatCard
            icon="ri-task-line"
            title="Total Tasks"
            value={totalTasks}
            percentage={`${completionRate}%`}
            color="purple"
          />

          <StatCard
            icon="ri-checkbox-circle-line"
            title="Completed"
            value={completedTasks}
            color="green"
          />

          <StatCard
            icon="ri-time-line"
            title="Overdue"
            value={overdueTasks}
            color="red"
          />

          <StatCard
            icon="ri-star-line"
            title="Important Tasks"
            value={importantTasks}
            color="yellow"
          />
        </div>

        {/* ===============================
            📦 MAIN CONTENT
        =============================== */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <RecentTasks />
          </div>
          <RightPanel
            completionRate={completionRate}
            completedTasks={completedTasks}
            totalTasks={totalTasks}
          />
        </div>
      </main>
    </div>
  );
}