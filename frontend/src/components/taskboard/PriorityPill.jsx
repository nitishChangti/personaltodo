// src/components/taskboard/PriorityPill.jsx
export default function PriorityPill({ p }) {
  const map = {
    high: "bg-red-100 text-red-600",
    medium: "bg-yellow-100 text-yellow-600",
    low: "bg-green-100 text-green-600",
  };
  return <span className={`text-xs px-2 py-1 rounded-full ${map[p]}`}>{p}</span>;
}