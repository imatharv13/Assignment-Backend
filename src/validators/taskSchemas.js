import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional().default(""),
  status: z.enum(["todo", "in_progress", "done"]).optional(),
  priority: z.number().int().min(1).max(5).optional(),
  dueDate: z.coerce.date().optional()
});

export const updateTaskSchema = createTaskSchema.partial();
