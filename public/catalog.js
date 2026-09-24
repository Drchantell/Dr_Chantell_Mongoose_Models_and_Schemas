const searchInput = document.querySelector("#catalogSearch");
const genreFilter = document.querySelector("#genreFilter");
const statusFilter = document.querySelector("#statusFilter");
const cards = [...document.querySelectorAll("[data-book-card]")];
const visibleCount = document.querySelector("#visibleCount");
const noResults = document.querySelector("#noResults");
const themeToggle = document.querySelector("#themeToggle");
const exportBtn = document.querySelector("#exportBtn");
const lookupButton = document.querySelector("#lookupBookBtn");
const summary = document.querySelector("#summary");
const summaryCount = document.querySelector("#summaryCount");

function filterCatalog() {
  if (!cards.length) return;

  const search = (searchInput?.value || "").trim().toLowerCase();
  const genre = genreFilter?.value || "";
  const status = statusFilter?.value || "";
  let count = 0;

  cards.forEach((card) => {
    const matchesSearch = !search || card.dataset.search.includes(search);
    const matchesGenre = !genre || card.dataset.genre === genre;
    const matchesStatus = !status || card.dataset.status === status;
    const show = matchesSearch && matchesGenre && matchesStatus;

    card.classList.toggle("hidden", !show);
    if (show) count += 1;
  });

  if (visibleCount) visibleCount.textContent = count;
  if (noResults) noResults.classList.toggle("hidden", count !== 0);
}

searchInput?.addEventListener("input", filterCatalog);
genreFilter?.addEventListener("change", filterCatalog);
statusFilter?.addEventListener("change", filterCatalog);

themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem(
    "libraryTheme",
    document.body.classList.contains("dark-mode") ? "dark" : "light"
  );
});

if (localStorage.getItem("libraryTheme") === "dark") {
  document.body.classList.add("dark-mode");
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  window.setTimeout(() => toast.remove(), 2600);
}

async function lookupBook() {
  const lookupIsbn = document.querySelector("#lookupIsbn");
  const isbn = lookupIsbn?.value.trim();

  if (!isbn) {
    showToast("Enter an ISBN first.");
    return;
  }

  lookupButton.disabled = true;
  lookupButton.textContent = "Looking up...";

  try {
    const response = await fetch(`/api/lookup?isbn=${encodeURIComponent(isbn)}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Book lookup failed.");
    }

    const setValue = (selector, value) => {
      const field = document.querySelector(selector);
      if (field && value) field.value = value;
    };

    setValue("#title", data.title);
    setValue("#author", data.author);
    setValue("#isbn", data.isbn);
    setValue("#coverImage", data.coverImage);
    setValue("#summary", data.summary);

    const genre = document.querySelector("#genre");
    if (genre && data.subjects?.length && !genre.value) {
      genre.value = data.subjects[0];
    }

    if (summary && summaryCount) {
      summaryCount.textContent = `${summary.value.length} / 500`;
    }

    showToast("Book information added from Open Library.");
  } catch (error) {
    showToast(error.message);
  } finally {
    lookupButton.disabled = false;
    lookupButton.textContent = lookupButton.dataset.originalText || "Find Book";
  }
}

if (lookupButton) {
  lookupButton.dataset.originalText = lookupButton.textContent;
  lookupButton.addEventListener("click", lookupBook);
}

summary?.addEventListener("input", () => {
  if (summaryCount) {
    summaryCount.textContent = `${summary.value.length} / 500`;
  }
});

exportBtn?.addEventListener("click", async () => {
  try {
    const response = await fetch("/api/books");
    const books = await response.json();

    if (!response.ok) throw new Error("Could not export the catalog.");

    const headers = [
      "Title",
      "Author",
      "ISBN",
      "Genre",
      "Call Number",
      "Branch",
      "Format",
      "Status",
      "Total Copies",
      "Available Copies",
    ];

    const escapeCsv = (value) =>
      `"${String(value ?? "").replaceAll('"', '""')}"`;

    const rows = books.map((book) => [
      book.title,
      book.author,
      book.isbn,
      book.genre,
      book.callNumber,
      book.branch,
      book.format,
      book.status,
      book.totalCopies,
      book.availableCopies,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCsv).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "dr-chantells-library-book-catalog.csv";
    link.click();

    URL.revokeObjectURL(url);
    showToast("Catalog exported.");
  } catch (error) {
    showToast(error.message);
  }
});
