const express = require("express");
const mongoose = require("mongoose");
const Book = require("../models/Book");

const router = express.Router();

const normalizePayload = (body) => {
  const payload = { ...body };

  const totalCopies = Number(payload.totalCopies ?? 1);
  const availableCopies = Number(payload.availableCopies ?? totalCopies);

  payload.totalCopies = Number.isNaN(totalCopies) ? 1 : Math.max(0, totalCopies);
  payload.availableCopies = Number.isNaN(availableCopies)
    ? payload.totalCopies
    : Math.min(Math.max(0, availableCopies), payload.totalCopies);

  payload.circulationCount = Math.max(
    0,
    Number(payload.circulationCount ?? 0) || 0
  );

  if (typeof payload.tags === "string") {
    payload.tags = payload.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  if (!payload.dueDate) payload.dueDate = null;
  if (!payload.publishedDate) delete payload.publishedDate;

  if (payload.status === "Available" && payload.availableCopies === 0) {
    payload.status = "Checked Out";
  }

  return payload;
};

// CREATE
// POST /api/books
router.post("/", async (req, res) => {
  try {
    const book = await Book.create(normalizePayload(req.body));
    res.status(201).json(book);
  } catch (error) {
    const status = error.code === 11000 ? 409 : 400;
    res.status(status).json({
      message:
        error.code === 11000
          ? "A book with that ISBN already exists."
          : error.message,
    });
  }
});

// READ ALL
// GET /api/books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DASHBOARD STATS
// GET /api/books/dashboard/stats
router.get("/dashboard/stats", async (req, res) => {
  try {
    const books = await Book.find();

    const stats = books.reduce(
      (summary, book) => {
        summary.titles += 1;
        summary.totalCopies += book.totalCopies || 0;
        summary.availableCopies += book.availableCopies || 0;
        summary.circulation += book.circulationCount || 0;

        if (book.status === "Checked Out") summary.checkedOutTitles += 1;
        if (book.status === "On Hold") summary.onHoldTitles += 1;

        return summary;
      },
      {
        titles: 0,
        totalCopies: 0,
        availableCopies: 0,
        checkedOutTitles: 0,
        onHoldTitles: 0,
        circulation: 0,
      }
    );

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ ONE BOOK BY ID
// GET /api/books/:id
// Example for Postman: GET http://localhost:3000/api/books/BOOK_ID
// Mongoose uses await Book.findById(req.params.id) to find one book.
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid book ID." });
    }

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE
// PUT /api/books/:id
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid book ID." });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      normalizePayload(req.body),
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found." });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    const status = error.code === 11000 ? 409 : 400;
    res.status(status).json({
      message:
        error.code === 11000
          ? "A book with that ISBN already exists."
          : error.message,
    });
  }
});

// DELETE
// DELETE /api/books/:id
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid book ID." });
    }

    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found." });
    }

    res.status(200).json({
      message: "Book deleted successfully.",
      deletedBook,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
