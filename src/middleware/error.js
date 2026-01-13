export const notFound = (req, res, next) => {
  res.status(404).json({ message: "Route not found" });
};

export const errorHandler = (err, req, res, next) => {
  console.error(err);
  const code = err.statusCode || 500;
  res.status(code).json({ message: err.message || "Server error" });
};
