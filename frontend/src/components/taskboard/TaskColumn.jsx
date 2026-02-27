// src/components/taskboard/TaskColumn.jsx
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

export default function TaskColumn({ title, count, bg, items = [], onEdit, id }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  const safeItems = Array.isArray(items) ? items : [];

  return (
    <div
      ref={setNodeRef}
      className={`rounded-2xl p-4 ${bg} ${
        isOver ? "ring-2 ring-purple-400" : ""
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">{title}</h3>
          <span className="text-xs bg-white px-2 py-0.5 rounded-full border">
            {count ?? 0}
          </span>
        </div>
      </div>

      <SortableContext
        items={safeItems.map((i) => i._id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {safeItems.map((item) => (
            <TaskCard key={item._id} item={item} onEdit={onEdit} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}