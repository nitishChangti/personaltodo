// // src/components/taskboard/BoardHeader.jsx
// export default function BoardHeader({ onAdd }) {
//   return (
//     <div className="flex justify-between items-center mb-6">
//       <div>
//         <h2 className="text-2xl font-semibold">Task Board</h2>
//         <p className="text-gray-500">Manage and organize your tasks</p>
//       </div>
//       <button
//         onClick={onAdd}
//         className="bg-purple-600 text-white px-4 py-2 rounded-xl shadow-sm flex items-center gap-2"
//       >
//         <i className="ri-add-line"></i> Add Task
//       </button>
//     </div>
//   );
// }



// src/components/taskboard/BoardHeader.jsx

import { useState } from "react";

export default function BoardHeader({ onAdd, onFilterSelect }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <div className="flex justify-between items-center mb-6 relative">
      <div>
        <h2 className="text-2xl font-semibold">Task Board</h2>
        <p className="text-gray-500">Manage and organize your tasks</p>
      </div>

      <div className="flex items-center gap-3 relative">
        <button
          onClick={onAdd}
          className="bg-purple-600 text-white px-4 py-2 rounded-xl shadow-sm"
        >
          Add Task
        </button>

        {/* Three Dot Button */}
        <button
          onClick={() => {
            setOpenMenu(!openMenu);
            setActiveMenu(null);
          }}
          className="w-10 h-10 rounded-xl border flex items-center justify-center"
        >
          <i className="ri-more-2-line text-lg"></i>
        </button>

        {openMenu && (
          <div className="absolute right-0 top-12 w-56 bg-white border rounded-xl shadow-lg z-50 p-2">

            {!activeMenu && (
              <>
                <button
                  onClick={() => setActiveMenu("priority")}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg"
                >
                  Filter by Priority
                </button>

                <button
                  onClick={() => setActiveMenu("status")}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg"
                >
                  Filter by Status
                </button>

                <button
                  onClick={() => setActiveMenu("dueDate")}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg"
                >
                  Filter by Due Date
                </button>

                <button
                  onClick={() => {
                    onFilterSelect(null);
                    setOpenMenu(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  Reset Filters
                </button>
              </>
            )}

            {activeMenu === "priority" &&
              ["high", "medium", "low"].map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    onFilterSelect({ type: "priority", value: p });
                    setOpenMenu(false);
                  }}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg"
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}

            {activeMenu === "status" &&
              ["todo", "progress", "done"].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    onFilterSelect({ type: "status", value: s });
                    setOpenMenu(false);
                  }}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg"
                >
                  {s === "todo"
                    ? "To Do"
                    : s === "progress"
                    ? "In Progress"
                    : "Completed"}
                </button>
              ))}

            {activeMenu === "dueDate" &&
              ["overdue", "today", "week"].map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    onFilterSelect({ type: "dueDate", value: d });
                    setOpenMenu(false);
                  }}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg"
                >
                  {d === "overdue"
                    ? "Overdue"
                    : d === "today"
                    ? "Due Today"
                    : "Due This Week"}
                </button>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}