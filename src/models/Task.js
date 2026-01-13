import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true, required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    status: { type: String, enum: ["todo", "in_progress", "done"], default: "todo", index: true },
    priority: { type: Number, default: 3, min: 1, max: 5 },
    dueDate: { type: Date }
  },
  { timestamps: true }
);

taskSchema.index({ title: "text", description: "text" });

export default mongoose.model("Task", taskSchema);
