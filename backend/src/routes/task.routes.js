// routes/task.routes.js
import express from "express";
import { body, param } from "express-validator";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  updateTaskStatus,
  getAllTasksForAdmin,
  deleteTaskAdmin,
  updateTaskAdmin,
  toggleImportant,
} from "../controllers/task.controller.js";
import { verifyJWT } from "../middlewares/verifyJwt.middlewares.js";

const router = express.Router();

router
  .route("/")
  .post(
    verifyJWT,
    body("title").notEmpty().withMessage("Title is required"),
    body("description").optional().isString().withMessage("Description must be a string"),
    body("dueDate").optional().isISO8601().toDate().withMessage("Due date must be a valid date"),
    body("tags").optional().isArray().withMessage("Tags must be an array"),
    body("status")
      .optional()
      .isIn(["Todo", "In Progress", "Completed"])
      .withMessage("Status must be Todo, In Progress, or Completed"),
    body("isImportant").optional().isBoolean().withMessage("isImportant must be a boolean"),
    body("priority")
      .notEmpty()
      .custom((value) => ["low", "medium", "high"].includes(value.toLowerCase()))
      .withMessage("Priority must be low, medium, or high"),
    createTask
  )
  .get(verifyJWT, getTasks);

router
  .route("/:id")
  .put(
    verifyJWT,
    param("id").isMongoId().withMessage("Invalid task id"),
    body("title").optional().notEmpty().withMessage("Title cannot be empty"),
    body("description").optional().isString(),
    body("dueDate").optional().isISO8601().toDate(),
    body("tags").optional().isArray(),
    body("status")
      .optional()
      .isIn(["Todo", "In Progress", "Completed"])
      .withMessage("Status must be Todo, In Progress, or Completed"),
    body("isImportant").optional().isBoolean(),
    body("priority")
      .optional()
      .custom((value) => ["low", "medium", "high"].includes(value.toLowerCase()))
      .withMessage("Priority must be low, medium, or high"),
    updateTask
  )
  .delete(verifyJWT, param("id").isMongoId().withMessage("Invalid task id"), deleteTask);


  // 👇 Add this route BEFORE export default router
router.patch(
  "/:id/status",
  verifyJWT,
  param("id").isMongoId().withMessage("Invalid task id"),
  body("status")
    .isIn(["Todo", "In Progress", "Completed"])
    .withMessage("Status must be Todo, In Progress, or Completed"),
  updateTaskStatus
);

router.get("/admin", verifyJWT, getAllTasksForAdmin);

router.put("/admin/:id", verifyJWT, updateTaskAdmin);
router.delete("/admin/:id", verifyJWT, deleteTaskAdmin);

// routes/task.routes.js

router.patch("/:id/important", verifyJWT, toggleImportant);
export default router;