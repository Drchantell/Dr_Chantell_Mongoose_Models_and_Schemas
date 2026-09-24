type CatalogBook = {
  _id: string;
  title: string;
  author: string;
  isbn?: string;
  genre?: string;
  status?: string;
  totalCopies?: number;
  availableCopies?: number;
};

type LookupBook = {
  isbn: string;
  title: string;
  author: string;
  coverImage?: string;
  summary?: string;
  subjects?: string[];
};

async function getBooks(): Promise<CatalogBook[]> {
  const response = await fetch("/api/books");

  if (!response.ok) {
    throw new Error("Could not load books.");
  }

  return response.json() as Promise<CatalogBook[]>;
}

async function findBookByIsbn(isbn: string): Promise<LookupBook> {
  const response = await fetch(
    `/api/lookup?isbn=${encodeURIComponent(isbn)}`
  );

  if (!response.ok) {
    throw new Error("Could not find that ISBN.");
  }

  return response.json() as Promise<LookupBook>;
}

// This TypeScript file is included as a learning example.
// The browser currently runs public/catalog.js directly.
// Run npm run typecheck to practice TypeScript checking.
void getBooks;
void findBookByIsbn;
