const errorHandler = (error, req, res, next) => {
  console.error("Server error:", error.message);

  if (res.headersSent) {
    return next(error);
  }

  res.status(error.response?.status || 500).json({
    message: "Something went wrong while processing the request.",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
};

module.exports = errorHandler;
