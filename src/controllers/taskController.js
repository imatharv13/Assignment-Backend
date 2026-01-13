import Task from "../models/Task.js";
import { parseOrThrow } from "../validators/common.js";
import { createTaskSchema, updateTaskSchema } from "../validators/taskSchemas.js";

export const listTasks = async (req, res) => {
  const { q, status, minPriority, maxPriority } = req.query;
  const filter = { userId: req.user.id };
  if (status) filter.status = status;
  if (minPriority || maxPriority) {
    filter.priority = {};
    if (minPriority) filter.priority.$gte = Number(minPriority);
    if (maxPriority) filter.priority.$lte = Number(maxPriority);
  }
  let query = Task.find(filter).sort({ createdAt: -1 });
  if (q) query = query.find({ $text: { $search: q } });
  const tasks = await query.exec();
  res.json({ tasks });
};

export const createTask = async (req, res) => {
  const data = parseOrThrow(createTaskSchema, req.body);
  const task = await Task.create({ ...data, userId: req.user.id });
  res.status(201).json({ task });
};

export const getTask = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
  if (!task) return res.status(404).json({ message: "Not found" });
  res.json({ task });
};

export const updateTask = async (req, res) => {
  const data = parseOrThrow(updateTaskSchema, req.body);
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    data,
    { new: true }
  );
  if (!task) return res.status(404).json({ message: "Not found" });
  res.json({ task });
};

export const deleteTask = async (req, res) => {
  const result = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  if (!result) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
};
