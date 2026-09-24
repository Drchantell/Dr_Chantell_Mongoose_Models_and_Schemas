const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    isbn: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },
    callNumber: {
      type: String,
      trim: true,
      default: "",
    },
    genre: {
      type: String,
      trim: true,
      default: "General",
    },
    format: {
      type: String,
      enum: ["Hardcover", "Paperback", "eBook", "Audiobook", "DVD", "Other"],
      default: "Paperback",
    },
    branch: {
      type: String,
      trim: true,
      default: "Main Library",
    },
    shelfLocation: {
      type: String,
      trim: true,
      default: "",
    },
    publishedDate: {
      type: Date,
    },
    summary: {
      type: String,
      trim: true,
      default: "",
      maxlength: 500,
    },
    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: 600,
    },
    coverImage: {
      type: String,
      trim: true,
      default: "",
    },
    tags: {
      type: [String],
      default: [],
    },
    totalCopies: {
      type: Number,
      min: 0,
      default: 1,
    },
    availableCopies: {
      type: Number,
      min: 0,
      default: 1,
    },
    circulationCount: {
      type: Number,
      min: 0,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Available", "Checked Out", "On Hold", "Processing", "Lost"],
      default: "Available",
    },
    dueDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
