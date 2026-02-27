// // src/components/taskboard/TaskCard.jsx
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { deleteTask, toggleImportant } from "../../store/taskSlice";
// import PriorityPill from "./PriorityPill";
// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";

// export default function TaskCard({ item, onEdit }) {
//   const [openMenu, setOpenMenu] = useState(false);
//   const dispatch = useDispatch();

//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: item._id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//       className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 relative cursor-grab active:cursor-grabbing"
//     >
//       <div className="flex justify-between items-start mb-2">
//         <h4 className="font-medium">{item.title}</h4>

//         <div className="flex items-center gap-2 relative">
//           <button
//             onClick={() => dispatch(toggleImportant(item._id))}
//             className={`text-lg ${
//               item.starred ? "text-yellow-400" : "text-gray-300"
//             }`}
//           >
//             {item.starred ? "⭐" : "☆"}
//           </button>

//           <button
//             onClick={() => setOpenMenu((v) => !v)}
//             className="ri-more-2-line text-gray-400 hover:text-gray-600 text-lg"
//           />

//           {openMenu && (
//             <div className="absolute right-0 top-6 mt-2 w-40 bg-white border rounded-xl shadow-lg z-10">
//               <button
//                 onClick={() => {
//                   setOpenMenu(false);
//                   onEdit(item);
//                 }}
//                 className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
//               >
//                 ✏️ Edit Task
//               </button>

//               <button
//                 onClick={() => {
//                   setOpenMenu(false);
//                   dispatch(deleteTask(item._id));
//                 }}
//                 className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
//               >
//                 🗑 Delete Task
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       <p className="text-sm text-gray-500 mb-3">{item.desc}</p>

//       <div className="flex flex-wrap gap-2 mb-3">
//         {(item.tags || []).map((t, idx) => (
//           <span
//             key={idx}
//             className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md"
//           >
//             {t}
//           </span>
//         ))}
//       </div>

//       <div className="flex justify-between items-center">
//         <PriorityPill p={item.priority} />
//         <span className="text-xs text-gray-400">
//           <i className="ri-calendar-line"></i> {item.date}
//         </span>
//       </div>
//     </div>
//   );
// }

// src/components/taskboard/TaskCard.jsx

// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import { deleteTask, toggleImportant } from "../../store/taskSlice";
// import PriorityPill from "./PriorityPill";

// export default function TaskCard({ item, onEdit }) {
//   const [openMenu, setOpenMenu] = useState(false);
//   const dispatch = useDispatch();

//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//   } = useSortable({ id: item._id });

//   // ✅ Prevent crash if transform is undefined
//   const style = {
//     transform: transform
//       ? CSS.Transform.toString(transform)
//       : undefined,
//     transition,
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 relative"
//     >
//       <div className="flex justify-between items-start mb-2">
        
//         {/* LEFT SIDE */}
//         <div className="flex items-start gap-2">
          
//           {/* 🔥 DRAG HANDLE ONLY */}
//           <button
//             {...listeners}
//             className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
//           >
//             <i className="ri-draggable"></i>
//           </button>

//           <h4 className="font-medium">{item.title}</h4>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="flex items-center gap-2 relative">
          
//           {/* Important Toggle */}
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               dispatch(toggleImportant(item._id));
//             }}
//             className={`text-lg ${
//               item.starred ? "text-yellow-400" : "text-gray-300"
//             }`}
//           >
//             {item.starred ? "⭐" : "☆"}
//           </button>

//           {/* 3 Dot Menu */}
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               setOpenMenu((prev) => !prev);
//             }}
//             className="ri-more-2-line text-gray-400 hover:text-gray-600 text-lg"
//           />

//           {/* Dropdown */}
//           {openMenu && (
//             <div className="absolute right-0 top-6 mt-2 w-40 bg-white border rounded-xl shadow-lg z-10">
//               <button
//                 onClick={() => {
//                   setOpenMenu(false);
//                   onEdit(item);
//                 }}
//                 className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
//               >
//                 ✏️ Edit Task
//               </button>

//               <button
//                 onClick={() => {
//                   setOpenMenu(false);
//                   dispatch(deleteTask(item._id));
//                 }}
//                 className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
//               >
//                 🗑 Delete Task
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Description */}
//       <p className="text-sm text-gray-500 mb-3">
//         {item.desc}
//       </p>

//       {/* Footer */}
//       <div className="flex justify-between items-center">
//         <PriorityPill p={item.priority} />
//         <span className="text-xs text-gray-400">
//           <i className="ri-calendar-line"></i> {item.date}
//         </span>
//       </div>
//     </div>
//   );
// }

// src/components/taskboard/TaskCard.jsx

import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, toggleImportant } from "../../store/taskSlice";
import PriorityPill from "./PriorityPill";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TaskCard({ item, onEdit }) {
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 relative"
    >
      {/* HEADER */}
      <div className="flex justify-between items-start mb-2">

        {/* LEFT SIDE */}
        <div className="flex items-start gap-2">

          {/* 🔥 DRAG HANDLE ONLY HERE */}
          <button
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
          >
            <i className="ri-draggable text-lg"></i>
          </button>

          <h4 className="font-medium">{item.title}</h4>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2 relative">

          {/* ⭐ STAR TOGGLE */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(toggleImportant(item._id));
            }}
            className={`text-lg ${
              item.starred ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            {item.starred ? "⭐" : "☆"}
          </button>

          {/* THREE DOT MENU */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenu((v) => !v);
            }}
            className="ri-more-2-line text-gray-400 hover:text-gray-600 text-lg"
          />

          {openMenu && (
            <div className="absolute right-0 top-6 mt-2 w-40 bg-white border rounded-xl shadow-lg z-20">
              <button
                onClick={() => {
                  setOpenMenu(false);
                  onEdit(item);
                }}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
              >
                ✏️ Edit Task
              </button>

              <button
                onClick={() => {
                  setOpenMenu(false);
                  dispatch(deleteTask(item._id));
                }}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                🗑 Delete Task
              </button>
            </div>
          )}
        </div>
      </div>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-500 mb-3">
        {item.desc}
      </p>

      {/* TAGS */}
      <div className="flex flex-wrap gap-2 mb-3">
        {(item.tags || []).map((t, idx) => (
          <span
            key={idx}
            className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md"
          >
            {t}
          </span>
        ))}
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center">
        <PriorityPill p={item.priority} />
        <span className="text-xs text-gray-400">
          <i className="ri-calendar-line mr-1"></i>
          {item.date}
        </span>
      </div>
    </div>
  );
} 