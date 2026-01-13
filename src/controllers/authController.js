import bcrypt from "bcrypt";
import User from "../models/User.js";
import { signToken } from "../utils/jwt.js";
import { parseOrThrow } from "../validators/common.js";
import { loginSchema, registerSchema } from "../validators/authSchemas.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = parseOrThrow(registerSchema, req.body);
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already registered" });
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, passwordHash });
    const token = signToken({ id: user._id, email: user.email });
    res.status(201).json({ token, user: { id: user._id, name, email } });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = parseOrThrow(loginSchema, req.body);
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });
    const token = signToken({ id: user._id, email: user.email });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    next(error);
  }
};

export const me = async (req, res) => {
  const user = await User.findById(req.user.id).select("_id name email createdAt updatedAt");
  res.json({ user });
};

export const logout = async (req, res) => {
  // client removes token; nothing to do server-side for stateless JWT
  res.json({ message: "Logged out" });
};
