require("dotenv").config();

const path = require("path");
const express = require("express");
const methodOverride = require("method-override");

const connectDB = require("./db/connection");
const bookRoutes = require("./routes/bookRoutes");
const lookupRoutes = require("./routes/lookupRoutes");
const webRoutes = require("./routes/webRoutes");
const requestLogger = require("./middleware/requestLogger");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// This lets HTML forms use PUT and DELETE with ?_method=PUT or ?_method=DELETE.
app.use(methodOverride("_method"));

app.use(requestLogger);
app.use(express.static(path.join(__dirname, "public")));

// Home
app.get("/", (req, res) => {
  res.redirect("/books");
});

// EJS catalog routes
app.use("/books", webRoutes);

// JSON routes for Postman and JavaScript fetch()
app.get("/api/health", (req, res) => {
  res.status(200).json({
    app: "HERitage LibraryOS",
    message: "Library database is running.",
    database: "MongoDB Atlas with Mongoose",
    status: "healthy",
  });
});

app.use("/api/books", bookRoutes);
app.use("/api/lookup", lookupRoutes);

// API middleware
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
