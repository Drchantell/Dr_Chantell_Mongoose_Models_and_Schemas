const express = require("express");
const mongoose = require("mongoose");
const Book = require("../models/Book");

const router = express.Router();

const cleanBookForm = (body) => {
  return {
    title: body.title?.trim(),
    author: body.author?.trim(),
    isbn: body.isbn?.trim() || undefined,
    callNumber: body.callNumber?.trim() || "",
    genre: body.genre?.trim() || "General",
    format: body.format || "Paperback",
    branch: body.branch?.trim() || "Main Library",
    shelfLocation: body.shelfLocation?.trim() || "",
    publishedDate: body.publishedDate || undefined,
    summary: body.summary?.trim() || "",
    coverImage: body.coverImage?.trim() || "",
    tags: String(body.tags || "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    totalCopies: Math.max(0, Number(body.totalCopies || 1)),
    availableCopies: Math.max(0, Number(body.availableCopies || 0)),
    circulationCount: Math.max(0, Number(body.circulationCount || 0)),
    status: body.status || "Available",
    dueDate: body.dueDate || null,
    completed: body.completed === "on",
  };
};

const coverFor = (book) => {
  if (book.coverImage) return book.coverImage;
  if (book.isbn) {
    const isbn = String(book.isbn).replace(/[^0-9Xx]/g, "");
    return `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`;
  }
  return "";
};

// INDEX
router.get("/", async (req, res, next) => {
  try {
    const books = await Book.find().sort({ author: 1, title: 1 });

    const stats = books.reduce(
      (total, book) => {
        total.titles += 1;
        total.copies += book.totalCopies || 0;
        total.available += book.availableCopies || 0;
        total.circulation += book.circulationCount || 0;
        return total;
      },
      { titles: 0, copies: 0, available: 0, circulation: 0 }
    );

    res.render("index", {
      books,
      stats,
      coverFor,
    });
  } catch (error) {
    next(error);
  }
});

// NEW
router.get("/new", (req, res) => {
  res.render("new");
});

// CREATE
router.post("/", async (req, res, next) => {
  try {
    const book = await Book.create(cleanBookForm(req.body));
    res.redirect(`/books/${book._id}`);
  } catch (error) {
    next(error);
  }
});

// EDIT must come before SHOW
router.get("/:id/edit", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid book ID.");
    }

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).send("Book not found.");
    }

    res.render("edit", { book });
  } catch (error) {
    next(error);
  }
});

// SHOW
router.get("/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid book ID.");
    }

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).send("Book not found.");
    }

    res.render("show", {
      book,
      coverUrl: coverFor(book),
    });
  } catch (error) {
    next(error);
  }
});

// UPDATE - method-override changes POST?_method=PUT into PUT
router.put("/:id", async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      cleanBookForm(req.body),
      { new: true, runValidators: true }
    );

    if (!book) {
      return res.status(404).send("Book not found.");
    }

    res.redirect(`/books/${book._id}`);
  } catch (error) {
    next(error);
  }
});

// DELETE - method-override changes POST?_method=DELETE into DELETE
router.delete("/:id", async (req, res, next) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect("/books");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
