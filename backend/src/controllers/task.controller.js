// controllers/task.controller.js
import Task from "../models/task.models.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiResponse } from "../utils/ApiRes.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { validationResult } from "express-validator";

export const createTask = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, "Validation errors", errors.array());
  }

  const { title, description, priority, dueDate, tags, status, isImportant } = req.body;

  const task = await Task.create({
    title,
    description,
    priority: priority.toLowerCase(),
    dueDate,
    tags,
    status: status || "Todo",
    isImportant: !!isImportant,
    userId: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, task, "Task created successfully", true));
});

export const getTasks = asyncHandler(async (req, res) => {
  console.log('this is a controller of fetch task');
  const tasks = await Task.find({ userId: req.user._id }).sort({ createdAt: -1 });
  if (!tasks) {
    throw new ApiError(404, "No tasks found");
  }
  console.log('task ',tasks);
  return res
    .status(200)
    .json(new ApiResponse(200, tasks, "Tasks fetched successfully", true));
});

export const updateTask = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, "Validation errors", errors.array());
  }

  const { id } = req.params;
  const updates = { ...req.body };

  if (updates.priority) {
    updates.priority = updates.priority.toLowerCase();
  }

  const task = await Task.findOneAndUpdate(
    { _id: id, userId: req.user._id }, // 🔐 ownership check
    updates,
    { new: true }
  );

  if (!task) {
    throw new ApiError(404, "Task not found or not authorized");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task updated successfully", true));
});

export const deleteTask = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, "Validation errors", errors.array());
  }

  const { id } = req.params;

  const task = await Task.findOneAndDelete({
    _id: id,
    userId: req.user._id, // 🔐 ownership check
  });

  if (!task) {
    throw new ApiError(404, "Task not found or not authorized");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Task deleted successfully", true));
})
export const updateTaskStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const task = await Task.findOneAndUpdate(
    { _id: id, userId: req.user._id },
    { status },
    { new: true }
  );

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  return res.status(200).json({ task });
});


export const getAllTasksForAdmin = asyncHandler(async (req, res) => {
  console.log('this is admin controller');
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Access denied");
  }

  const tasks = await Task.find({})
    .populate("userId", "name email role")
    .sort({ createdAt: -1 });
console.log('task',tasks);
  return res.status(200).json(
    new ApiResponse(200, tasks, "All tasks fetched successfully", true)
  );
});

export const updateTaskAdmin = asyncHandler(async (req, res) => {

  if (req.user.role !== "admin") {
    throw new ApiError(403, "Access denied. Admin only.");
  }

  const { id } = req.params;

  const task = await Task.findById(id);

  if (!task) {
    throw new ApiError(404, "Task not found.");
  }

  const updatedTask = await Task.findByIdAndUpdate(
    id,
    req.body,
    { new: true, runValidators: true }
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      updatedTask,
      "Task updated successfully",
      true
    )
  );
});

export const deleteTaskAdmin = asyncHandler(async (req, res) => {
  console.log('delete task admin');
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Access denied. Admin only.");
  }

  const { id } = req.params;

  const task = await Task.findById(id);

  if (!task) {
    throw new ApiError(404, "Task not found.");
  }

  await Task.findByIdAndDelete(id);

  return res.status(200).json(
    new ApiResponse(
      200,
      null,
      "Task deleted successfully",
      true
    )
  );
});

// controllers/task.controller.js

export const toggleImportant = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // 🔥 Toggle
    task.isImportant = !task.isImportant;

    await task.save();

    res.json({ task });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};