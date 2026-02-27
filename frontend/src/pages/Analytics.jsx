// import { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   RiKanbanView,
//   RiDashboardLine,
//   RiBarChartBoxLine,
//   RiStarLine,
// } from "react-icons/ri";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";
// import { fetchTasks } from "../store/taskSlice";

// const COLORS = ["#22c55e", "#8b5cf6", "#cbd5e1"];

// export default function Analytics() {
//   const dispatch = useDispatch();

//   // ✅ FIXED: correct redux state mapping
//   const { list: tasks = [], loading: isLoading, error } = useSelector(
//     (state) => state.tasks
//   );

//   const [range, setRange] = useState(30);

//   useEffect(() => {
//     dispatch(fetchTasks());
//   }, [dispatch]);

//   // Normalize MongoDB date format
//   const getDate = (d) => {
//     if (!d) return null;
//     if (typeof d === "string") return new Date(d);
//     if (d.$date) return new Date(d.$date);
//     return new Date(d);
//   };

//   // Normalize status
//   const normalizeStatus = (s) => (s ? s.toLowerCase().replace(" ", "-") : "");

//   const filteredTasks = useMemo(() => {
//     const now = new Date();
//     const start = new Date();
//     start.setDate(now.getDate() - range);

//     return tasks.filter((t) => {
//       const created = getDate(t.createdAt);
//       return created && created >= start;
//     });
//   }, [tasks, range]);

//   const totalTasks = filteredTasks.length;

//   const completedTasks = filteredTasks.filter(
//     (t) => normalizeStatus(t.status) === "completed"
//   ).length;

//   const overdueTasks = filteredTasks.filter((t) => {
//     const due = getDate(t.dueDate);
//     return (
//       due &&
//       normalizeStatus(t.status) !== "completed" &&
//       due < new Date()
//     );
//   }).length;

//   const completionRate = totalTasks
//     ? Math.round((completedTasks / totalTasks) * 100)
//     : 0;

//   const trendData = useMemo(() => {
//     const map = {};
//     filteredTasks.forEach((t) => {
//       const day = getDate(t.createdAt)?.toLocaleDateString("en-IN");
//       if (!day) return;

//       if (!map[day]) map[day] = { name: day, created: 0, completed: 0 };
//       map[day].created += 1;
//       if (normalizeStatus(t.status) === "completed") {
//         map[day].completed += 1;
//       }
//     });
//     return Object.values(map);
//   }, [filteredTasks]);

//   const statusData = [
//     {
//       name: "Completed",
//       value: filteredTasks.filter(
//         (t) => normalizeStatus(t.status) === "completed"
//       ).length,
//     },
//     {
//       name: "In Progress",
//       value: filteredTasks.filter(
//         (t) => normalizeStatus(t.status) === "in-progress"
//       ).length,
//     },
//     {
//       name: "To Do",
//       value: filteredTasks.filter(
//         (t) => normalizeStatus(t.status) === "todo"
//       ).length,
//     },
//   ];

//   const priorityCounts = useMemo(() => {
//     const counts = { high: 0, medium: 0, low: 0 };

//     filteredTasks.forEach((t) => {
//       if (counts[t.priority] !== undefined) {
//         counts[t.priority] += 1;
//       }
//     });

//     const total = filteredTasks.length || 1;

//     return {
//       high: Math.round((counts.high / total) * 100),
//       medium: Math.round((counts.medium / total) * 100),
//       low: Math.round((counts.low / total) * 100),
//     };
//   }, [filteredTasks]);

//   if (isLoading) return <div className="p-10">Loading analytics…</div>;
//   if (error) return <div className="p-10 text-red-500">{error}</div>;

//   return (
//     <div className="flex h-screen bg-slate-50">
//       {/* Sidebar */}
//       <aside className="w-[260px] h-full bg-gradient-to-b from-[#0F172A] to-[#020617] text-white">
//         <nav className="mt-10 space-y-2 px-4">
//           <MenuItem icon={<RiDashboardLine />} label="Dashboard" />
//           <MenuItem icon={<RiKanbanView />} label="Task Board" />
//           <MenuItem active icon={<RiBarChartBoxLine />} label="Analytics" />
//           <MenuItem icon={<RiStarLine />} label="Important" />
//         </nav>
//       </aside>

//       {/* Main */}
//       <main className="flex-1 p-8 overflow-y-auto">
//         {/* Filters */}
//         <div className="flex justify-between mb-6">
//           <h1 className="text-2xl font-semibold">Analytics</h1>
//           <div className="flex gap-2">
//             <FilterBtn active={range === 7} onClick={() => setRange(7)}>
//               Last 7 Days
//             </FilterBtn>
//             <FilterBtn active={range === 30} onClick={() => setRange(30)}>
//               Last 30 Days
//             </FilterBtn>
//             <FilterBtn active={range === 90} onClick={() => setRange(90)}>
//               Last 90 Days
//             </FilterBtn>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-4 gap-6 mb-6">
//           <StatCard title="Total Tasks" value={totalTasks} />
//           <StatCard title="Completed" value={completedTasks} />
//           <StatCard title="Overdue" value={overdueTasks} />
//           <StatCard title="Completion Rate" value={`${completionRate}%`} />
//         </div>

//         {/* Charts */}
//         <div className="grid grid-cols-3 gap-6">
//           <div className="col-span-2 h-[320px] bg-white rounded-xl shadow-sm p-6">
//             <h2 className="font-semibold mb-2">Task Completion Trend</h2>
//             <div className="h-[260px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={trendData}>
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="created" fill="#a78bfa" />
//                   <Bar dataKey="completed" fill="#34d399" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           <div className="h-[320px] bg-white rounded-xl shadow-sm p-6">
//             <h2 className="font-semibold mb-2">Tasks by Status</h2>
//             <div className="h-[260px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={statusData}
//                     dataKey="value"
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={60}
//                     outerRadius={90}
//                   >
//                     {statusData.map((_, i) => (
//                       <Cell key={i} fill={COLORS[i % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>

//         {/* Tasks by Priority */}
//         <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
//           <h2 className="font-semibold mb-4">Tasks by Priority</h2>
//           <div className="space-y-4">
//             <Priority label="High Priority" percent={priorityCounts.high} color="bg-red-500" />
//             <Priority label="Medium Priority" percent={priorityCounts.medium} color="bg-orange-400" />
//             <Priority label="Low Priority" percent={priorityCounts.low} color="bg-green-400" />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// function MenuItem({ icon, label, active }) {
//   return (
//     <div
//       className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer ${
//         active
//           ? "bg-indigo-600/20 text-indigo-400"
//           : "text-slate-300 hover:bg-white/5"
//       }`}
//     >
//       {icon}
//       <span className="text-sm">{label}</span>
//     </div>
//   );
// }

// function StatCard({ title, value }) {
//   return (
//     <div className="bg-white rounded-xl shadow-sm p-5">
//       <p className="text-sm text-slate-500">{title}</p>
//       <h2 className="text-2xl font-semibold">{value}</h2>
//     </div>
//   );
// }

// function FilterBtn({ children, active, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`px-4 py-2 rounded-lg text-sm ${
//         active
//           ? "bg-indigo-600 text-white"
//           : "bg-white shadow-sm text-slate-600"
//       }`}
//     >
//       {children}
//     </button>
//   );
// }

// function Priority({ label, percent, color }) {
//   return (
//     <div>
//       <div className="flex justify-between text-sm mb-1">
//         <span>{label}</span>
//         <span>{percent}%</span>
//       </div>
//       <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
//         <div className={`${color} h-full`} style={{ width: `${percent}%` }} />
//       </div>
//     </div>
//   );
// }
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/dashboard/Sidebar";
import { fetchTasks } from "../store/taskSlice";

import AnalyticsHeader from "../components/analytics/AnalyticsHeader";
import StatsGrid from "../components/analytics/StatsGrid";
import TrendChart from "../components/analytics/TrendChart";
import StatusPie from "../components/analytics/StatusPie";
import PrioritySection from "../components/analytics/PrioritySection";

export default function Analytics() {
  const dispatch = useDispatch();
  const { list: tasks = [], loading, error } = useSelector(
    (state) => state.tasks
  );

  const [range, setRange] = useState(30);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const getDate = (d) => {
    if (!d) return null;
    if (typeof d === "string") return new Date(d);
    if (d?.$date) return new Date(d.$date);
    return new Date(d);
  };

  const normalizeStatus = (s) =>
    s ? s.toLowerCase().replace(" ", "-") : "";

  const filteredTasks = useMemo(() => {
    const start = new Date();
    start.setDate(new Date().getDate() - range);

    return tasks.filter((t) => {
      const created = getDate(t.createdAt);
      return created && created >= start;
    });
  }, [tasks, range]);

  const stats = useMemo(() => {
    const total = filteredTasks.length;

    const completed = filteredTasks.filter(
      (t) => normalizeStatus(t.status) === "completed"
    ).length;

    const overdue = filteredTasks.filter((t) => {
      const due = getDate(t.dueDate);
      return (
        due &&
        normalizeStatus(t.status) !== "completed" &&
        due < new Date()
      );
    }).length;

    return {
      total,
      completed,
      overdue,
      completionRate: total
        ? Math.round((completed / total) * 100)
        : 0,
    };
  }, [filteredTasks]);

  const trendData = useMemo(() => {
    const map = {};

    filteredTasks.forEach((t) => {
      const day = getDate(t.createdAt)?.toLocaleDateString("en-IN");
      if (!day) return;

      if (!map[day]) map[day] = { name: day, created: 0, completed: 0 };

      map[day].created++;
      if (normalizeStatus(t.status) === "completed")
        map[day].completed++;
    });

    return Object.values(map);
  }, [filteredTasks]);

  const statusData = useMemo(() => {
    return [
      {
        name: "Completed",
        value: filteredTasks.filter(
          (t) => normalizeStatus(t.status) === "completed"
        ).length,
      },
      {
        name: "In Progress",
        value: filteredTasks.filter(
          (t) => normalizeStatus(t.status) === "in-progress"
        ).length,
      },
      {
        name: "To Do",
        value: filteredTasks.filter(
          (t) => normalizeStatus(t.status) === "todo"
        ).length,
      },
    ];
  }, [filteredTasks]);

  const priorityData = useMemo(() => {
    const counts = { high: 0, medium: 0, low: 0 };

    filteredTasks.forEach((t) => {
      if (counts[t.priority] !== undefined) counts[t.priority]++;
    });

    const total = filteredTasks.length || 1;

    return {
      high: Math.round((counts.high / total) * 100),
      medium: Math.round((counts.medium / total) * 100),
      low: Math.round((counts.low / total) * 100),
    };
  }, [filteredTasks]);

  if (loading) return <div className="p-10">Loading analytics…</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <AnalyticsHeader range={range} setRange={setRange} />
        <StatsGrid stats={stats} />

        <div className="grid grid-cols-3 gap-6">
          <TrendChart data={trendData} />
          <StatusPie data={statusData} />
        </div>

        <PrioritySection data={priorityData} />
      </main>
    </div>
  );
}