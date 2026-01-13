import { verifyToken } from "../utils/jwt.js";

export const requireAuth = (req, res, next) => {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Missing token" });
  try {
    const decoded = verifyToken(token);
    req.user = { id: decoded.id, email: decoded.email };
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
