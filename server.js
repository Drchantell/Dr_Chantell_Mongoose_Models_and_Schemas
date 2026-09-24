require("dotenv").config();

const path = require("path");
const express = require("express");
const methodOverride = require("method-override");

const connectDB = require("./db/connection");
const bookRoutes = require("./routes/bookRoutes");
const lookupRoutes = require("./routes/lookupRoutes");
const requestLogger = require("./middleware/requestLogger");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  methodOverride((req) => {
    if (req.query && req.query._method) {
      return req.query._method;
    }

    if (req.body && req.body._method) {
      const method = req.body._method;
      delete req.body._method;
      return method;
    }

    return undefined;
  })
);
app.use(requestLogger);
app.use(express.static(path.join(__dirname, "public")));

// JSON health route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    app: "HERitage LibraryOS",
    message: "Library database is running.",
    database: "MongoDB Atlas with Mongoose",
    status: "healthy",
  });
});

// API routes
app.use("/api/books", bookRoutes);
app.use("/api/lookup", lookupRoutes);

// API 404 and error middleware
app.use("/api", notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`HERitage LibraryOS is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
};

startServer();
