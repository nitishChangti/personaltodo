// // src/pages/TaskBoard.jsx
// import { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { DndContext, closestCenter } from "@dnd-kit/core";
// import Sidebar from "../components/dashboard/Sidebar";
// import BoardHeader from "../components/taskboard/BoardHeader";
// import BoardFilters from "../components/taskboard/BoardFilters";
// import TaskColumn from "../components/taskboard/TaskColumn";
// import BoardPagination from "../components/taskboard/BoardPagination";
// import AddTaskModal from "../components/taskboard/AddTaskModal";
// import { fetchTasks, moveTaskStatus } from "../store/taskSlice";

// const normalizeTask = (t) => {
//   if (!t) return null;
//   return {
//     _id: t._id,
//     title: t.title,
//     desc: t.description,
//     tags: t.tags || [],
//     priority: t.priority,
//     date: t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "",
//     starred: !!t.isImportant,
//     status:
//       t.status === "Todo"
//         ? "todo"
//         : t.status === "In Progress"
//         ? "progress"
//         : "done",
//   };
// };

// export default function TaskBoard() {
//   const dispatch = useDispatch();
//   const { list: tasks, loading, error } = useSelector((s) => s.tasks);

//   const [open, setOpen] = useState(false);
//   const [editTask, setEditTask] = useState(null);
//   const [search, setSearch] = useState("");
//   const [priority, setPriority] = useState("all");

//   useEffect(() => {
//     dispatch(fetchTasks());
//   }, [dispatch]);

//   const normalized = useMemo(() => {
//     return (tasks || [])
//       .map(normalizeTask)
//       .filter(Boolean)
//       .filter(
//         (t) =>
//           t.title.toLowerCase().includes(search.toLowerCase()) &&
//           (priority === "all" || t.priority === priority)
//       );
//   }, [tasks, search, priority]);

//   const grouped = {
//     todo: normalized.filter((t) => t.status === "todo"),
//     progress: normalized.filter((t) => t.status === "progress"),
//     done: normalized.filter((t) => t.status === "done"),
//   };

//   const handleDragEnd = ({ active, over }) => {
//     if (!over) return;

//     const task = normalized.find((t) => t._id === active.id);
//     const newStatus = over.id; // "todo" | "progress" | "done"

//     if (!task || task.status === newStatus) return;

//     dispatch(moveTaskStatus({ id: active.id, status: newStatus }));
//   };

//   if (loading) return <div className="p-8">Loading tasks...</div>;
//   if (error) return <div className="p-8 text-red-500">{error}</div>;

//   return (
//     <div className="min-h-screen flex bg-[#F8FAFC]">
//       <Sidebar />
//       <main className="flex-1 p-8">
//         <BoardHeader onAdd={() => { setEditTask(null); setOpen(true); }} />
//         <BoardFilters
//           search={search}
//           setSearch={setSearch}
//           priority={priority}
//           setPriority={setPriority}
//         />

//         <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {[
//               { id: "todo", title: "To Do", bg: "bg-[#F4F7FB]", items: grouped.todo },
//               { id: "progress", title: "In Progress", bg: "bg-[#F6F5FF]", items: grouped.progress },
//               { id: "done", title: "Completed", bg: "bg-[#ECFDF3]", items: grouped.done },
//             ].map((col) => (
//               <TaskColumn
//                 key={col.id}
//                 id={col.id}
//                 title={col.title}
//                 bg={col.bg}
//                 items={col.items || []}
//                 count={(col.items || []).length}
//                 onEdit={(task) => {
//                   setEditTask(task);
//                   setOpen(true);
//                 }}
//               />
//             ))}
//           </div>
//         </DndContext>

//         <BoardPagination />
//       </main>

//       <AddTaskModal open={open} task={editTask} onClose={() => setOpen(false)} />
//     </div>
//   );
// }


// src/pages/TaskBoard.jsx
// src/pages/TaskBoard.jsx

// import { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { DndContext, closestCenter } from "@dnd-kit/core";
// import Sidebar from "../components/dashboard/Sidebar";
// import BoardHeader from "../components/taskboard/BoardHeader";
// import BoardFilters from "../components/taskboard/BoardFilters";
// import TaskColumn from "../components/taskboard/TaskColumn";
// import BoardPagination from "../components/taskboard/BoardPagination";
// import AddTaskModal from "../components/taskboard/AddTaskModal";
// import { fetchTasks, moveTaskStatus } from "../store/taskSlice";

// const normalizeTask = (t) => {
//   if (!t) return null;
//   return {
//     _id: t._id,
//     title: t.title,
//     desc: t.description,
//     tags: t.tags || [],
//     priority: t.priority,
//     dueDate: t.dueDate,
//     date: t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "",
//     starred: !!t.isImportant,
//     status:
//       t.status === "Todo"
//         ? "todo"
//         : t.status === "In Progress"
//         ? "progress"
//         : "done",
//   };
// };

// export default function TaskBoard() {
//   const dispatch = useDispatch();
//   const { list: tasks, loading, error } = useSelector((s) => s.tasks);

//   const [open, setOpen] = useState(false);
//   const [editTask, setEditTask] = useState(null);
//   const [search, setSearch] = useState("");
//   const [priority, setPriority] = useState("all");
//   const [advancedFilter, setAdvancedFilter] = useState(null);

//   useEffect(() => {
//     dispatch(fetchTasks());
//   }, [dispatch]);

//   const normalized = useMemo(() => {
//     let filtered = (tasks || [])
//       .map(normalizeTask)
//       .filter(Boolean);

//     // Search filter
//     filtered = filtered.filter((t) =>
//       t.title.toLowerCase().includes(search.toLowerCase())
//     );

//     // Priority dropdown filter
//     if (priority !== "all") {
//       filtered = filtered.filter((t) => t.priority === priority);
//     }

//     // Advanced filter from three dots
//     if (advancedFilter) {
//       const { type, value } = advancedFilter;

//       if (type === "priority") {
//         filtered = filtered.filter((t) => t.priority === value);
//       }

//       if (type === "status") {
//         filtered = filtered.filter((t) => t.status === value);
//       }

//       if (type === "dueDate") {
//         const today = new Date();
//         const weekLater = new Date();
//         weekLater.setDate(today.getDate() + 7);

//         filtered = filtered.filter((t) => {
//           if (!t.dueDate) return false;

//           const due = new Date(t.dueDate);

//           if (value === "overdue")
//             return due < today && t.status !== "done";

//           if (value === "today")
//             return due.toDateString() === today.toDateString();

//           if (value === "week")
//             return due >= today && due <= weekLater;

//           return true;
//         });
//       }
//     }

//     return filtered;
//   }, [tasks, search, priority, advancedFilter]);

//   const grouped = {
//     todo: normalized.filter((t) => t.status === "todo"),
//     progress: normalized.filter((t) => t.status === "progress"),
//     done: normalized.filter((t) => t.status === "done"),
//   };

//   const handleDragEnd = ({ active, over }) => {
//     if (!over) return;

//     const task = normalized.find((t) => t._id === active.id);
//     const newStatus = over.id;

//     if (!task || task.status === newStatus) return;

//     dispatch(moveTaskStatus({ id: active.id, status: newStatus }));
//   };

//   if (loading) return <div className="p-8">Loading tasks...</div>;
//   if (error) return <div className="p-8 text-red-500">{error}</div>;

//   return (
//     <div className="min-h-screen flex bg-[#F8FAFC]">
//       <Sidebar />

//       <main className="flex-1 p-8">
//         <BoardHeader
//           onAdd={() => {
//             setEditTask(null);
//             setOpen(true);
//           }}
//           onFilterSelect={setAdvancedFilter}
//         />

//         <BoardFilters
//           search={search}
//           setSearch={setSearch}
//           priority={priority}
//           setPriority={setPriority}
//         />

//         <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {[
//               { id: "todo", title: "To Do", bg: "bg-[#F4F7FB]", items: grouped.todo },
//               { id: "progress", title: "In Progress", bg: "bg-[#F6F5FF]", items: grouped.progress },
//               { id: "done", title: "Completed", bg: "bg-[#ECFDF3]", items: grouped.done },
//             ].map((col) => (
//               <TaskColumn
//                 key={col.id}
//                 id={col.id}
//                 title={col.title}
//                 bg={col.bg}
//                 items={col.items || []}
//                 count={(col.items || []).length}
//                 onEdit={(task) => {
//                   setEditTask(task);
//                   setOpen(true);
//                 }}
//               />
//             ))}
//           </div>
//         </DndContext>

//         <BoardPagination />
//       </main>

//       <AddTaskModal open={open} task={editTask} onClose={() => setOpen(false)} />
//     </div>
//   );
// }

// src/pages/TaskBoard.jsx

// import { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { DndContext, closestCenter } from "@dnd-kit/core";
// import Sidebar from "../components/dashboard/Sidebar";
// import BoardHeader from "../components/taskboard/BoardHeader";
// import BoardFilters from "../components/taskboard/BoardFilters";
// import TaskColumn from "../components/taskboard/TaskColumn";
// import BoardPagination from "../components/taskboard/BoardPagination";
// import AddTaskModal from "../components/taskboard/AddTaskModal";
// import { fetchTasks, moveTaskStatus } from "../store/taskSlice";

// const normalizeTask = (t) => {
//   if (!t) return null;
//   return {
//     _id: t._id,
//     title: t.title,
//     desc: t.description,
//     tags: t.tags || [],
//     priority: t.priority,
//     dueDate: t.dueDate,
//     date: t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "",
//     starred: !!t.isImportant,
//     status:
//       t.status === "Todo"
//         ? "todo"
//         : t.status === "In Progress"
//         ? "progress"
//         : "done",
//   };
// };

// export default function TaskBoard() {
//   const dispatch = useDispatch();
//   const { list: tasks, loading, error } = useSelector((s) => s.tasks);

//   const [open, setOpen] = useState(false);
//   const [editTask, setEditTask] = useState(null);
//   const [search, setSearch] = useState("");
//   const [priority, setPriority] = useState("all");
//   const [advancedFilter, setAdvancedFilter] = useState(null);

//   // 🔥 Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const tasksPerPage = 3;

//   useEffect(() => {
//     dispatch(fetchTasks());
//   }, [dispatch]);

//   // =========================
//   // FILTERING
//   // =========================
//   const filteredTasks = useMemo(() => {
//     let filtered = (tasks || [])
//       .map(normalizeTask)
//       .filter(Boolean);

//     // Search
//     filtered = filtered.filter((t) =>
//       t.title.toLowerCase().includes(search.toLowerCase())
//     );

//     // Dropdown priority
//     if (priority !== "all") {
//       filtered = filtered.filter((t) => t.priority === priority);
//     }

//     // Advanced filter
//     if (advancedFilter) {
//       const { type, value } = advancedFilter;

//       if (type === "priority") {
//         filtered = filtered.filter((t) => t.priority === value);
//       }

//       if (type === "status") {
//         filtered = filtered.filter((t) => t.status === value);
//       }

//       if (type === "dueDate") {
//         const today = new Date();
//         const weekLater = new Date();
//         weekLater.setDate(today.getDate() + 7);

//         filtered = filtered.filter((t) => {
//           if (!t.dueDate) return false;

//           const due = new Date(t.dueDate);

//           if (value === "overdue")
//             return due < today && t.status !== "done";

//           if (value === "today")
//             return due.toDateString() === today.toDateString();

//           if (value === "week")
//             return due >= today && due <= weekLater;

//           return true;
//         });
//       }
//     }

//     return filtered;
//   }, [tasks, search, priority, advancedFilter]);

//   // Reset page when filter changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [search, priority, advancedFilter]);

//   // =========================
//   // PAGINATION (3 PER PAGE)
//   // =========================
//   const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

//   const paginatedTasks = useMemo(() => {
//     const start = (currentPage - 1) * tasksPerPage;
//     const end = start + tasksPerPage;
//     return filteredTasks.slice(start, end);
//   }, [filteredTasks, currentPage]);

//   // Group after pagination
//   const grouped = {
//     todo: paginatedTasks.filter((t) => t.status === "todo"),
//     progress: paginatedTasks.filter((t) => t.status === "progress"),
//     done: paginatedTasks.filter((t) => t.status === "done"),
//   };

//   const handleDragEnd = ({ active, over }) => {
//     if (!over) return;

//     const task = paginatedTasks.find((t) => t._id === active.id);
//     const newStatus = over.id;

//     if (!task || task.status === newStatus) return;

//     dispatch(moveTaskStatus({ id: active.id, status: newStatus }));
//   };

//   if (loading) return <div className="p-8">Loading tasks...</div>;
//   if (error) return <div className="p-8 text-red-500">{error}</div>;

//   return (
//     <div className="min-h-screen flex bg-[#F8FAFC]">
//       <Sidebar />

//       <main className="flex-1 p-8">
//         <BoardHeader
//           onAdd={() => {
//             setEditTask(null);
//             setOpen(true);
//           }}
//           onFilterSelect={setAdvancedFilter}
//         />

//         <BoardFilters
//           search={search}
//           setSearch={setSearch}
//           priority={priority}
//           setPriority={setPriority}
//         />

//         <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {[
//               { id: "todo", title: "To Do", bg: "bg-[#F4F7FB]", items: grouped.todo },
//               { id: "progress", title: "In Progress", bg: "bg-[#F6F5FF]", items: grouped.progress },
//               { id: "done", title: "Completed", bg: "bg-[#ECFDF3]", items: grouped.done },
//             ].map((col) => (
//               <TaskColumn
//                 key={col.id}
//                 id={col.id}
//                 title={col.title}
//                 bg={col.bg}
//                 items={col.items || []}
//                 count={(col.items || []).length}
//                 onEdit={(task) => {
//                   setEditTask(task);
//                   setOpen(true);
//                 }}
//               />
//             ))}
//           </div>
//         </DndContext>

//         <BoardPagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           setCurrentPage={setCurrentPage}
//         />
//       </main>

//       <AddTaskModal open={open} task={editTask} onClose={() => setOpen(false)} />
//     </div>
//   );
// }

// src/pages/TaskBoard.jsx
// src/pages/TaskBoard.jsx

// import { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { DndContext, closestCenter } from "@dnd-kit/core";
// import Sidebar from "../components/dashboard/Sidebar";
// import BoardHeader from "../components/taskboard/BoardHeader";
// import BoardFilters from "../components/taskboard/BoardFilters";
// import TaskColumn from "../components/taskboard/TaskColumn";
// import BoardPagination from "../components/taskboard/BoardPagination";
// import AddTaskModal from "../components/taskboard/AddTaskModal";
// import { fetchTasks, moveTaskStatus } from "../store/taskSlice";

// const normalizeTask = (t) => {
//   if (!t) return null;

//   return {
//     _id: t._id,
//     title: t.title,
//     desc: t.description,
//     tags: t.tags || [],
//     priority: t.priority,
//     dueDate: t.dueDate,
//     date: t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "",
//     starred: !!t.isImportant,
//     status:
//       t.status === "Todo"
//         ? "todo"
//         : t.status === "In Progress"
//         ? "progress"
//         : "done",
//   };
// };

// export default function TaskBoard() {
//   const dispatch = useDispatch();
//   const { list: tasks, loading, error } = useSelector((s) => s.tasks);

//   const [open, setOpen] = useState(false);
//   const [editTask, setEditTask] = useState(null);
//   const [search, setSearch] = useState("");
//   const [priority, setPriority] = useState("all");
//   const [advancedFilter, setAdvancedFilter] = useState(null);

//   // 🔥 Pagination per column
//   const [pageTodo, setPageTodo] = useState(1);
//   const [pageProgress, setPageProgress] = useState(1);
//   const [pageDone, setPageDone] = useState(1);

//   const tasksPerPage = 3;

//   useEffect(() => {
//     dispatch(fetchTasks());
//   }, [dispatch]);

//   // ==========================
//   // FILTERING
//   // ==========================
//   const filteredTasks = useMemo(() => {
//     let filtered = (tasks || [])
//       .map(normalizeTask)
//       .filter(Boolean);

//     // Search
//     filtered = filtered.filter((t) =>
//       t.title.toLowerCase().includes(search.toLowerCase())
//     );

//     // Priority dropdown
//     if (priority !== "all") {
//       filtered = filtered.filter((t) => t.priority === priority);
//     }

//     // Advanced filter
//     if (advancedFilter) {
//       const { type, value } = advancedFilter;

//       if (type === "priority") {
//         filtered = filtered.filter((t) => t.priority === value);
//       }

//       if (type === "status") {
//         filtered = filtered.filter((t) => t.status === value);
//       }

//       if (type === "dueDate") {
//         const today = new Date();
//         const weekLater = new Date();
//         weekLater.setDate(today.getDate() + 7);

//         filtered = filtered.filter((t) => {
//           if (!t.dueDate) return false;

//           const due = new Date(t.dueDate);

//           if (value === "overdue")
//             return due < today && t.status !== "done";

//           if (value === "today")
//             return due.toDateString() === today.toDateString();

//           if (value === "week")
//             return due >= today && due <= weekLater;

//           return true;
//         });
//       }
//     }

//     return filtered;
//   }, [tasks, search, priority, advancedFilter]);

//   // Reset pagination when filters change
//   useEffect(() => {
//     setPageTodo(1);
//     setPageProgress(1);
//     setPageDone(1);
//   }, [search, priority, advancedFilter]);

//   // ==========================
//   // GROUP FIRST
//   // ==========================
//   const groupedAll = {
//     todo: filteredTasks.filter((t) => t.status === "todo"),
//     progress: filteredTasks.filter((t) => t.status === "progress"),
//     done: filteredTasks.filter((t) => t.status === "done"),
//   };

//   // ==========================
//   // PAGINATE PER COLUMN
//   // ==========================
//   const paginate = (items, page) => {
//     const start = (page - 1) * tasksPerPage;
//     return items.slice(start, start + tasksPerPage);
//   };

//   const grouped = {
//     todo: paginate(groupedAll.todo, pageTodo),
//     progress: paginate(groupedAll.progress, pageProgress),
//     done: paginate(groupedAll.done, pageDone),
//   };

//   const totalPagesTodo = Math.ceil(groupedAll.todo.length / tasksPerPage);
//   const totalPagesProgress = Math.ceil(groupedAll.progress.length / tasksPerPage);
//   const totalPagesDone = Math.ceil(groupedAll.done.length / tasksPerPage);

//   const handleDragEnd = ({ active, over }) => {
//     if (!over) return;
//     dispatch(moveTaskStatus({ id: active.id, status: over.id }));
//   };

//   if (loading) return <div className="p-8">Loading tasks...</div>;
//   if (error) return <div className="p-8 text-red-500">{error}</div>;

//   return (
//     <div className="min-h-screen flex bg-[#F8FAFC]">
//       <Sidebar />

//       <main className="flex-1 p-8">
//         <BoardHeader
//           onAdd={() => {
//             setEditTask(null);
//             setOpen(true);
//           }}
//           onFilterSelect={setAdvancedFilter}
//         />

//         <BoardFilters
//           search={search}
//           setSearch={setSearch}
//           priority={priority}
//           setPriority={setPriority}
//         />

//         <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">

//             {/* TODO COLUMN */}
//             <div className="flex flex-col h-full min-h-[500px]">
//               <div className="flex-1">
//                 <TaskColumn
//                   id="todo"
//                   title="To Do"
//                   bg="bg-[#F4F7FB]"
//                   items={grouped.todo}
//                   count={groupedAll.todo.length}
//                   onEdit={(task) => {
//                     setEditTask(task);
//                     setOpen(true);
//                   }}
//                 />
//               </div>
//               <BoardPagination
//                 currentPage={pageTodo}
//                 totalPages={totalPagesTodo}
//                 setCurrentPage={setPageTodo}
//               />
//             </div>

//             {/* PROGRESS COLUMN */}
//             <div className="flex flex-col h-full min-h-[500px]">
//               <div className="flex-1">
//                 <TaskColumn
//                   id="progress"
//                   title="In Progress"
//                   bg="bg-[#F6F5FF]"
//                   items={grouped.progress}
//                   count={groupedAll.progress.length}
//                   onEdit={(task) => {
//                     setEditTask(task);
//                     setOpen(true);
//                   }}
//                 />
//               </div>
//               <BoardPagination
//                 currentPage={pageProgress}
//                 totalPages={totalPagesProgress}
//                 setCurrentPage={setPageProgress}
//               />
//             </div>

//             {/* DONE COLUMN */}
//             <div className="flex flex-col h-full min-h-[500px]">
//               <div className="flex-1">
//                 <TaskColumn
//                   id="done"
//                   title="Completed"
//                   bg="bg-[#ECFDF3]"
//                   items={grouped.done}
//                   count={groupedAll.done.length}
//                   onEdit={(task) => {
//                     setEditTask(task);
//                     setOpen(true);
//                   }}
//                 />
//               </div>
//               <BoardPagination
//                 currentPage={pageDone}
//                 totalPages={totalPagesDone}
//                 setCurrentPage={setPageDone}
//               />
//             </div>

//           </div>
//         </DndContext>
//       </main>

//       <AddTaskModal
//         open={open}
//         task={editTask}
//         onClose={() => setOpen(false)}
//       />
//     </div>
//   );
// }

// src/pages/TaskBoard.jsx

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndContext, closestCenter } from "@dnd-kit/core";
import Sidebar from "../components/dashboard/Sidebar";
import BoardHeader from "../components/taskboard/BoardHeader";
import BoardFilters from "../components/taskboard/BoardFilters";
import TaskColumn from "../components/taskboard/TaskColumn";
import AddTaskModal from "../components/taskboard/AddTaskModal";
import {
  fetchTasks,
  moveTaskStatus,
} from "../store/taskSlice";

const normalizeTask = (t) => {
  if (!t) return null;

  return {
    _id: t._id,
    title: t.title,
    desc: t.description,
    tags: t.tags || [],
    priority: t.priority,
    date: t.dueDate
      ? new Date(t.dueDate).toLocaleDateString()
      : "",
    starred: !!t.isImportant, // 🔥 important link
    status:
      t.status === "Todo"
        ? "todo"
        : t.status === "In Progress"
        ? "progress"
        : "done",
  };
};

export default function TaskBoard() {
  const dispatch = useDispatch();
  const { list: tasks, loading, error } = useSelector(
    (s) => s.tasks
  );

  const [open, setOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("all");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // 🔥 Normalize + Filter
  const normalized = useMemo(() => {
    return (tasks || [])
      .map(normalizeTask)
      .filter(Boolean)
      .filter(
        (t) =>
          t.title.toLowerCase().includes(search.toLowerCase()) &&
          (priority === "all" || t.priority === priority)
      );
  }, [tasks, search, priority]);

  // 🔥 Group by status
  const grouped = {
    todo: normalized.filter((t) => t.status === "todo"),
    progress: normalized.filter(
      (t) => t.status === "progress"
    ),
    done: normalized.filter((t) => t.status === "done"),
  };

  // 🔥 Drag handler
  const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    const task = normalized.find(
      (t) => t._id === active.id
    );

    const newStatus = over.id; // todo | progress | done

    if (!task || task.status === newStatus) return;

    dispatch(
      moveTaskStatus({
        id: active.id,
        status: newStatus,
      })
    );
  };

  if (loading)
    return <div className="p-8">Loading tasks...</div>;

  if (error)
    return (
      <div className="p-8 text-red-500">{error}</div>
    );

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      <Sidebar />

      <main className="flex-1 p-8">
        <BoardHeader
          onAdd={() => {
            setEditTask(null);
            setOpen(true);
          }}
        />

        <BoardFilters
          search={search}
          setSearch={setSearch}
          priority={priority}
          setPriority={setPriority}
        />

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                id: "todo",
                title: "To Do",
                bg: "bg-[#F4F7FB]",
                items: grouped.todo,
              },
              {
                id: "progress",
                title: "In Progress",
                bg: "bg-[#F6F5FF]",
                items: grouped.progress,
              },
              {
                id: "done",
                title: "Completed",
                bg: "bg-[#ECFDF3]",
                items: grouped.done,
              },
            ].map((col) => (
              <TaskColumn
                key={col.id}
                id={col.id}
                title={col.title}
                bg={col.bg}
                items={col.items}
                count={col.items.length}
                onEdit={(task) => {
                  setEditTask(task);
                  setOpen(true);
                }}
              />
            ))}
          </div>
        </DndContext>

        <AddTaskModal
          open={open}
          task={editTask}
          onClose={() => setOpen(false)}
        />
      </main>
    </div>
  );
}