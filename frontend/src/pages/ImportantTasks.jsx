// src/pages/ImportantTasks.jsx

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/dashboard/Sidebar";
import TopBar from "../components/importantTask/TopBar";
import ImportantTaskCard from "../components/importantTask/ImportantTaskCard";
import { fetchTasks } from "../store/taskSlice";

export default function ImportantTasks() {
  const dispatch = useDispatch();
  const { list: tasks, loading } = useSelector((s) => s.tasks);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // 🔥 Extract important tasks from Redux
  const importantTasks = useMemo(() => {
    return (tasks || [])
      .filter((t) => Boolean(t.isImportant))
      .map((t) => ({
        _id: t._id,
        title: t.title,
        desc: t.description,
        tags: t.tags || [],
        priority: t.priority,
        date: t.dueDate
          ? new Date(t.dueDate).toLocaleDateString()
          : "",
        starred: true,
        status:
          t.status === "Todo"
            ? "todo"
            : t.status === "In Progress"
            ? "progress"
            : "done",
      }));
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    if (filter === "all") return importantTasks;
    return importantTasks.filter((t) => t.status === filter);
  }, [filter, importantTasks]);

  const total = importantTasks.length;
  const completed = importantTasks.filter(
    (t) => t.status === "done"
  ).length;
  const pending = total - completed;

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">

      {/* 🔥 LEFT SIDEBAR */}
      <Sidebar />

      {/* 🔥 RIGHT CONTENT */}
      <div className="flex-1 overflow-auto">

        <TopBar />

        <div className="p-6">

          {/* Header */}
          <div className="rounded-2xl p-6 bg-gradient-to-r from-orange-400 to-orange-600 text-white mb-6">
            <h2 className="text-2xl font-bold">
              ⭐ Important Tasks
            </h2>

            <div className="flex gap-4 mt-4">
              <Stat label="Total" value={total} />
              <Stat label="Completed" value={completed} />
              <Stat label="Pending" value={pending} />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3 mb-6">
            {[
              { key: "all", label: "All" },
              { key: "todo", label: "To Do" },
              { key: "progress", label: "In Progress" },
              { key: "done", label: "Completed" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-2 rounded-full text-sm ${
                  filter === f.key
                    ? "bg-purple-600 text-white"
                    : "bg-white shadow"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTasks.length === 0 ? (
              <p className="text-gray-500">
                No important tasks found.
              </p>
            ) : (
              filteredTasks.map((item) => (
                <ImportantTaskCard
                  key={item._id}
                  item={item}
                />
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-white/20 px-4 py-2 rounded-xl">
      <p className="text-xs">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}