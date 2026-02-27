// // src/components/taskboard/BoardPagination.jsx
// export default function BoardPagination() {
//   return (
//     <div className="flex justify-center items-center gap-2 mt-8">
//       <button className="w-9 h-9 rounded-lg border flex items-center justify-center text-gray-600">
//         ‹
//       </button>
//       <button className="w-9 h-9 rounded-lg bg-purple-600 text-white">1</button>
//       <button className="w-9 h-9 rounded-lg border">2</button>
//       <button className="w-9 h-9 rounded-lg border flex items-center justify-center text-gray-600">
//         ›
//       </button>
//     </div>
//   );
// }

// src/components/taskboard/BoardPagination.jsx

// export default function BoardPagination({
//   currentPage,
//   totalPages,
//   setCurrentPage,
// }) {
//   if (totalPages <= 1) return null;

//   return (
//     <div className="flex justify-center items-center gap-2 mt-8">

//       {/* Previous */}
//       <button
//         disabled={currentPage === 1}
//         onClick={() => setCurrentPage((p) => p - 1)}
//         className="w-9 h-9 rounded-lg border flex items-center justify-center disabled:opacity-40"
//       >
//         ‹
//       </button>

//       {/* Page Numbers */}
//       {Array.from({ length: totalPages }).map((_, i) => (
//         <button
//           key={i}
//           onClick={() => setCurrentPage(i + 1)}
//           className={`w-9 h-9 rounded-lg ${
//             currentPage === i + 1
//               ? "bg-purple-600 text-white"
//               : "border"
//           }`}
//         >
//           {i + 1}
//         </button>
//       ))}

//       {/* Next */}
//       <button
//         disabled={currentPage === totalPages}
//         onClick={() => setCurrentPage((p) => p + 1)}
//         className="w-9 h-9 rounded-lg border flex items-center justify-center disabled:opacity-40"
//       >
//         ›
//       </button>
//     </div>
//   );
// }

// src/components/taskboard/BoardPagination.jsx

// src/components/taskboard/BoardPagination.jsx

export default function BoardPagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-4 w-full">
      
      {/* Fixed width container */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2 min-w-[180px] justify-center">
          
          {/* Previous */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="w-8 h-8 rounded-lg border disabled:opacity-40"
          >
            ‹
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 rounded-lg ${
                currentPage === i + 1
                  ? "bg-purple-600 text-white"
                  : "border"
              }`}
            >
              {i + 1}
            </button>
          ))}

          {/* Next */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="w-8 h-8 rounded-lg border disabled:opacity-40"
          >
            ›
          </button>

        </div>
      </div>

    </div>
  );
}