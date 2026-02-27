import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { createTask, updateTask } from "../../store/taskSlice";

export default function AddTaskModal({ open, onClose, task }) {
  if (!open) return null;

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.tasks);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const isEdit = Boolean(task?._id);

 const onSubmit = (data) => {
  const payload = {
    title: data.title,
    description: data.description,
    priority: data.priority, // already low/medium/high
    tags: data.tags ? data.tags.split(",").map(t => t.trim()) : [],
    isImportant: Boolean(data.isImportant),
    status: isEdit
      ? task.status === "todo"
        ? "Todo"
        : task.status === "progress"
        ? "In Progress"
        : "Completed"
      : "Todo",
  };

  // ✅ Only attach dueDate if user selected a date
  if (data.dueDate) {
    payload.dueDate = data.dueDate; // ISO date string from <input type="date">
  }

  const action = isEdit
    ? updateTask({ id: task._id, data: payload })
    : createTask(payload);

  dispatch(action).then((res) => {
    if (!res.error) {
      reset();
      onClose();
    }
  });
};
  // ✅ Prefill form when editing (LOGIC ONLY)
  useEffect(() => {
    if (task) {
      setValue("title", task.title ?? "");
      setValue("description", task.desc ?? "");
      setValue("priority", task.priority ?? "low");
      setValue(
        "dueDate",
        task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : ""
      );
      setValue("tags", Array.isArray(task.tags) ? task.tags.join(", ") : "");
      setValue("isImportant", Boolean(task.starred));
    } else {
      reset();
    }
  }, [task, setValue, reset]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative bg-white w-full max-w-xl rounded-2xl p-8 shadow-xl"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">
            {isEdit ? "Edit Task" : "Add New Task"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100"
          >
            <i className="ri-close-line text-lg"></i>
          </button>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Title
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Enter task title"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.title && (
            <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Description
          </label>
          <textarea
            {...register("description")}
            rows={3}
            placeholder="Enter task description"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Priority + Date */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Priority
            </label>
            <select
              {...register("priority")}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
              defaultValue="low"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Due Date
            </label>
            <div className="relative">
              <input
                type="date"
                {...register("dueDate")}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none pr-10 focus:ring-2 focus:ring-purple-500"
              />
              <i className="ri-calendar-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Tags
          </label>
          <input
            {...register("tags")}
            placeholder="Add tags separated by commas"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Important */}
        <div className="mb-6 flex items-center gap-2">
          <input type="checkbox" {...register("isImportant")} />
          <span className="text-sm text-gray-700">Mark as Important</span>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md hover:opacity-95 disabled:opacity-60"
          >
            {loading
              ? isEdit
                ? "Updating..."
                : "Creating..."
              : isEdit
              ? "Update Task"
              : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
}