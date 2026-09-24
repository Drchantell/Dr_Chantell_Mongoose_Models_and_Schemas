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
    title: "Becoming",
    author: "Michelle Obama",
    isbn: "9781524763138",
    callNumber: "B OBA",
    genre: "Biography",
    format: "Hardcover",
    branch: "Main Library",
    shelfLocation: "Biography B1",
    publishedDate: "2018-11-13",
    summary: "A personal memoir about family, education, public service, identity, and the experiences that shaped Michelle Obama's life.",
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
    genre: "Young Adult",
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
    genre: "Youth Poetry",
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
    title: "The Immortal Life of Henrietta Lacks",
    author: "Rebecca Skloot",
    isbn: "9781400052189",
    callNumber: "616.027 SKL",
    genre: "Science",
    format: "Paperback",
    branch: "Main Library",
    shelfLocation: "Science S6",
    publishedDate: "2010-02-02",
    summary: "A nonfiction account of Henrietta Lacks, the HeLa cell line, medical research, ethics, race, and the family affected by the discovery.",
    totalCopies: 4,
    availableCopies: 2,
    circulationCount: 132,
    status: "Available",
    tags: ["science", "ethics", "medical history"]
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

    console.log("Demo catalog added successfully.");
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exitCode = 1;
  } finally {
    process.exit();
  }
};

seedCatalog();
