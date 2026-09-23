const express = require("express");
const mongoose = require("mongoose");
const Book = require("../models/Book");

const router = express.Router();


// CREATE A NEW BOOK
// POST /api/books
router.post("/", async (req, res) => {
  try {
    const newBook = await Book.create(req.body);

    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});


// GET ALL BOOKS
// GET /api/books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// GET ONE BOOK
// GET /api/books/:id
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});


// UPDATE A BOOK
// PUT /api/books/:id
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});


// DELETE A BOOK
// DELETE /api/books/:id
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});


module.exports = router;