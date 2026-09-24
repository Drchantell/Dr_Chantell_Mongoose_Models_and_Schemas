require("dotenv").config();

const connectDB = require("./db/connection");
const Book = require("./models/Book");

const demoBooks = [
  {
    title: "The Color Purple",
    author: "Alice Walker",
    isbn: "9780156028356",
    callNumber: "F WAL",
    genre: "Literary Fiction",
    format: "Paperback",
    branch: "Main Library",
    shelfLocation: "Adult Fiction A3",
    publishedDate: "1982-01-01",
    summary: "A moving story of survival, sisterhood, love, and self-discovery told through the letters of Celie, a Black woman in the American South.",
    totalCopies: 5,
    availableCopies: 3,
    circulationCount: 148,
    status: "Available",
    tags: ["classic", "award winner", "book club"]
  },
  {
    title: "Beloved",
    author: "Toni Morrison",
    isbn: "9781400033416",
    callNumber: "F MOR",
    genre: "Literary Fiction",
    format: "Paperback",
    branch: "Main Library",
    shelfLocation: "Adult Fiction M2",
    publishedDate: "1987-09-16",
    summary: "A powerful novel about memory, family, freedom, and the lasting trauma of slavery centered on Sethe and her family.",
    totalCopies: 5,
    availableCopies: 2,
    circulationCount: 176,
    status: "Available",
    tags: ["classic", "Pulitzer Prize", "historical fiction"]
  },
  {
    title: "Becoming",
    author: "Michelle Obama",
    isbn: "9781524763138",
    callNumber: "B OBA",
    genre: "Memoir",
    format: "Hardcover",
    branch: "Main Library",
    shelfLocation: "Biography B1",
    publishedDate: "2018-11-13",
    summary: "A memoir about family, education, public service, identity, and the experiences that shaped Michelle Obama's life.",
    totalCopies: 6,
    availableCopies: 2,
    circulationCount: 225,
    status: "Available",
    tags: ["memoir", "leadership", "women"]
  },
  {
    title: "Hidden Figures",
    author: "Margot Lee Shetterly",
    isbn: "9780062363602",
    callNumber: "510.925 SHE",
    genre: "History",
    format: "Paperback",
    branch: "STEM Learning Center",
    shelfLocation: "STEM History S2",
    publishedDate: "2016-09-06",
    summary: "The history of Black women mathematicians at NASA whose technical work helped advance the United States space program.",
    totalCopies: 4,
    availableCopies: 4,
    circulationCount: 96,
    status: "Available",
    tags: ["STEM", "history", "women in science"]
  },
  {
    title: "The Hate U Give",
    author: "Angie Thomas",
    isbn: "9780062498533",
    callNumber: "YA THO",
    genre: "Young Adult Fiction",
    format: "Hardcover",
    branch: "Teen Library",
    shelfLocation: "YA Fiction T4",
    publishedDate: "2017-02-28",
    summary: "A teenager navigates grief, community pressure, activism, and identity after witnessing the fatal shooting of her childhood friend.",
    totalCopies: 5,
    availableCopies: 0,
    circulationCount: 191,
    status: "Checked Out",
    tags: ["young adult", "social issues", "community"]
  },
  {
    title: "Brown Girl Dreaming",
    author: "Jacqueline Woodson",
    isbn: "9780147515827",
    callNumber: "J 811 WOO",
    genre: "Memoir in Verse",
    format: "Paperback",
    branch: "Children's Library",
    shelfLocation: "Youth Poetry P2",
    publishedDate: "2014-08-28",
    summary: "A memoir in verse about childhood, family, belonging, reading, and finding a voice while growing up in the 1960s and 1970s.",
    totalCopies: 3,
    availableCopies: 1,
    circulationCount: 87,
    status: "Available",
    tags: ["youth", "poetry", "memoir"]
  },
  {
    title: "Between the World and Me",
    author: "Ta-Nehisi Coates",
    isbn: "9780812993547",
    callNumber: "305.896 COA",
    genre: "Nonfiction",
    format: "Hardcover",
    branch: "Main Library",
    shelfLocation: "Social Sciences S4",
    publishedDate: "2015-07-14",
    summary: "A personal examination of race, history, identity, and American life written as a letter from a father to his son.",
    totalCopies: 4,
    availableCopies: 3,
    circulationCount: 141,
    status: "Available",
    tags: ["race", "essays", "memoir"]
  },
  {
    title: "The Warmth of Other Suns",
    author: "Isabel Wilkerson",
    isbn: "9780679763888",
    callNumber: "304.809 WIL",
    genre: "History",
    format: "Paperback",
    branch: "Main Library",
    shelfLocation: "US History H5",
    publishedDate: "2010-09-07",
    summary: "A narrative history of the Great Migration told through the lives of Black Americans who left the South for cities across the United States.",
    totalCopies: 4,
    availableCopies: 2,
    circulationCount: 119,
    status: "Available",
    tags: ["Great Migration", "history", "Black history"]
  }
];

const seedCatalog = async () => {
  try {
    await connectDB();

    for (const book of demoBooks) {
      await Book.findOneAndUpdate(
        { isbn: book.isbn },
        book,
        { upsert: true, new: true, runValidators: true }
      );
    }

    console.log("Black author demo catalog added successfully.");
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exitCode = 1;
  } finally {
    process.exit();
  }
};

seedCatalog();
