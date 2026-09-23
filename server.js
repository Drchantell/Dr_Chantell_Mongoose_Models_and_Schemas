require("dotenv").config();

const express = require("express");
const connectDB = require("./db/connection");
const bookRoutes = require("./routes/bookRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Dr. Chantell's Digital Bookshelf API!");
});

app.use("/api/books", bookRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
};

startServer();