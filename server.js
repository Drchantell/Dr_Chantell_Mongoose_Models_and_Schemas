require("dotenv").config();

const path = require("path");
const express = require("express");
const connectDB = require("./db/connection");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "HERitage LibraryOS is running.",
    status: "healthy",
  });
});

app.use("/api/books", bookRoutes);

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
