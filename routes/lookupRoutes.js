const express = require("express");
const axios = require("axios");

const router = express.Router();

const cleanIsbn = (isbn = "") => isbn.replace(/[^0-9Xx]/g, "");

const makeSummary = (book) => {
  if (book.notes && typeof book.notes === "string") {
    return book.notes.slice(0, 420);
  }

  if (Array.isArray(book.excerpts) && book.excerpts[0]?.text) {
    return book.excerpts[0].text.slice(0, 420);
  }

  const authors = (book.authors || []).map((author) => author.name).join(", ");
  const date = book.publish_date ? ` published ${book.publish_date}` : "";

  return `${book.title || "This book"} by ${authors || "an available author"} is a catalog title${date}. Add a short local summary to make this record more useful for patrons.`;
};

// Server-to-server communication with Open Library
// GET /api/lookup?isbn=9780156028356
router.get("/", async (req, res, next) => {
  try {
    const isbn = cleanIsbn(req.query.isbn || "");

    if (!isbn) {
      return res.status(400).json({
        message: "Add an ISBN, for example: /api/lookup?isbn=9780156028356",
      });
    }

    const key = `ISBN:${isbn}`;

    const response = await axios.get("https://openlibrary.org/api/books", {
      params: {
        bibkeys: key,
        jscmd: "data",
        format: "json",
      },
      timeout: 8000,
    });

    const book = response.data[key];

    if (!book) {
      return res.status(404).json({
        message: "No Open Library record was found for that ISBN.",
      });
    }

    const cover =
      book.cover?.large ||
      book.cover?.medium ||
      book.cover?.small ||
      `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

    res.status(200).json({
      isbn,
      title: book.title || "",
      author: (book.authors || []).map((author) => author.name).join(", "),
      publishedDate: book.publish_date || "",
      publishers: (book.publishers || []).map((publisher) => publisher.name),
      subjects: (book.subjects || []).slice(0, 8).map((subject) => subject.name),
      coverImage: cover,
      summary: makeSummary(book),
      source: "Open Library",
    });
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      return res.status(504).json({
        message: "The external book service took too long to respond.",
      });
    }

    next(error);
  }
});

module.exports = router;
