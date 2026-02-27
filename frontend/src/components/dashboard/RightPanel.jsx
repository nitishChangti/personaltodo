// // src/components/RightPanel.jsx

// export default function RightPanel() {
//   return (
//     <div className="space-y-6">
//       {/* Completion Rate */}
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//         <div className="flex justify-between items-start mb-6">
//           <div>
//             <p className="text-gray-500 text-sm">Completion Rate</p>
//             <h2 className="text-4xl font-bold mt-2">25%</h2>
//           </div>
//           <i className="ri-more-2-line text-gray-400 cursor-pointer"></i>
//         </div>

//         <div className="flex justify-center">
//           <svg className="w-32 h-32" viewBox="0 0 120 120">
//             <circle
//               cx="60"
//               cy="60"
//               r="50"
//               fill="none"
//               stroke="#e5e7eb"
//               strokeWidth="8"
//             />
//             <circle
//               cx="60"
//               cy="60"
//               r="50"
//               fill="none"
//               stroke="#7c3aed"
//               strokeWidth="8"
//               strokeDasharray="78.5 314"
//               strokeLinecap="round"
//               transform="rotate(-90 60 60)"
//             />
//           </svg>
//         </div>

//         <p className="text-center text-gray-500 text-xs mt-4">
//           1 of 12 tasks completed
//         </p>
//       </div>

//       {/* Tasks by Priority */}
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//         <div className="flex justify-between items-start mb-4">
//           <p className="font-semibold">Tasks by Priority</p>
//           <i className="ri-more-2-line text-gray-400 cursor-pointer"></i>
//         </div>

//         <div className="space-y-3">
//           <div className="flex items-center justify-between">
//             <span className="text-sm text-gray-600">High</span>
//             <div
//               className="flex-1 mx-3 bg-red-500 h-2 rounded-full"
//               style={{ width: "70%" }}
//             ></div>
//             <span className="text-sm font-medium">5</span>
//           </div>

//           <div className="flex items-center justify-between">
//             <span className="text-sm text-gray-600">Medium</span>
//             <div
//               className="flex-1 mx-3 bg-orange-400 h-2 rounded-full"
//               style={{ width: "70%" }}
//             ></div>
//             <span className="text-sm font-medium">5</span>
//           </div>

//           <div className="flex items-center justify-between">
//             <span className="text-sm text-gray-600">Low</span>
//             <div
//               className="flex-1 mx-3 bg-green-500 h-2 rounded-full"
//               style={{ width: "40%" }}
//             ></div>
//             <span className="text-sm font-medium">2</span>
//           </div>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//         <p className="font-semibold mb-4">Quick Actions</p>

//         <button className="w-full py-3 rounded-lg bg-purple-50 text-purple-600 font-medium text-sm hover:bg-purple-100 transition mb-3 flex items-center justify-center gap-2">
//           <i className="ri-add-line"></i> New Task
//         </button>

//         <button className="w-full py-3 rounded-lg bg-gray-50 text-gray-600 font-medium text-sm hover:bg-gray-100 transition flex items-center justify-center gap-2">
//           <i className="ri-bar-chart-line"></i> Analytics
//         </button>
//       </div>
//     </div>
//   );
// }
// src/components/dashboard/RightPanel.jsx

import { useSelector } from "react-redux";

export default function RightPanel({
  completionRate,
  completedTasks,
  totalTasks,
}) {
  const { list } = useSelector((state) => state.tasks);

  // 🔥 Calculate priority counts
  const highCount = list.filter(t => t.priority === "high").length;
  const mediumCount = list.filter(t => t.priority === "medium").length;
  const lowCount = list.filter(t => t.priority === "low").length;

  const total = list.length || 1; // prevent divide by zero

  const highPercent = (highCount / total) * 100;
  const mediumPercent = (mediumCount / total) * 100;
  const lowPercent = (lowCount / total) * 100;

  const circumference = 2 * Math.PI * 50;
  const strokeDasharray = `${(completionRate / 100) * circumference} ${circumference}`;

  return (
    <div className="space-y-6">
      
      {/* ================= Completion Rate ================= */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="mb-6">
          <p className="text-gray-500 text-sm">Completion Rate</p>
          <h2 className="text-4xl font-bold mt-2">
            {completionRate}%
          </h2>
        </div>

        <div className="flex justify-center">
          <svg className="w-32 h-32" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#7c3aed"
              strokeWidth="8"
              strokeDasharray={strokeDasharray}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
            />
          </svg>
        </div>

        <p className="text-center text-gray-500 text-xs mt-4">
          {completedTasks} of {totalTasks} tasks completed
        </p>
      </div>

      {/* ================= Tasks by Priority ================= */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <p className="font-semibold mb-4">Tasks by Priority</p>

        <div className="space-y-4">

          {/* High */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 w-16">High</span>

            <div className="flex-1 mx-3 bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-red-500 h-2 rounded-full transition-all"
                style={{ width: `${highPercent}%` }}
              />
            </div>

            <span className="text-sm font-medium w-6 text-right">
              {highCount}
            </span>
          </div>

          {/* Medium */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 w-16">Medium</span>

            <div className="flex-1 mx-3 bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-orange-400 h-2 rounded-full transition-all"
                style={{ width: `${mediumPercent}%` }}
              />
            </div>

            <span className="text-sm font-medium w-6 text-right">
              {mediumCount}
            </span>
          </div>

          {/* Low */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 w-16">Low</span>

            <div className="flex-1 mx-3 bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{ width: `${lowPercent}%` }}
              />
            </div>

            <span className="text-sm font-medium w-6 text-right">
              {lowCount}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}