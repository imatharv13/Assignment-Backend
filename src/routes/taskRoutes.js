import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { listTasks, createTask, getTask, updateTask, deleteTask } from "../controllers/taskController.js";

const router = Router();
router.use(requireAuth);
router.get("/", listTasks);
router.post("/", createTask);
router.get("/:id", getTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
export default router;
