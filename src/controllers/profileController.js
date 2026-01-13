import User from "../models/User.js";

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("_id name email createdAt updatedAt");
  res.json({ user });
};

export const updateProfile = async (req, res) => {
  const updates = {};
  if (typeof req.body.name === "string" && req.body.name.trim()) updates.name = req.body.name.trim();
  // Optional email update path is not included for safety in this test
  const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select("_id name email");
  res.json({ user });
};
