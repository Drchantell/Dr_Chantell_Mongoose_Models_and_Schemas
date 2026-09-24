Dr. Chantell's Library Book Catalog

Project Overview

I created a dynamic library book catalog featuring fiction and nonfiction books by Black authors. The catalog stores book records in MongoDB Atlas and lets a librarian create, read, update, and delete books.

The project includes book covers, short summaries, ISBNs, genres, call numbers, branches, shelf locations, copy counts, availability, circulation information, and editable records.

What I Used in This Project

HTML5
CSS3
Tailwind CSS
JavaScript ES6+
TypeScript learning source
Node.js
Express.js
EJS
REST APIs
JSON
MongoDB Atlas
Mongoose
NoSQL
CRUD
Middleware
Method Override
Async and Await
Try and Catch Error Handling
Server-to-Server Communication
Axios
dotenv
Postman
Git
GitHub
VS Code
npm

What I Learned

I learned how the front end, Express server, EJS views, routes, MongoDB database, and Mongoose model work together.

I learned CRUD:
Create adds a new book.
Read displays all books or one book.
Update changes an existing book.
Delete removes a book.

I learned how to find one book by its MongoDB ID:

const foundBook = await Book.findById(req.params.id);

If the book is not found, I return a 404 response:

return res.status(404).send("Book not found.");

I learned that the GET edit route only finds the book and renders the form:

res.render("edit", { book: foundBook });

The edit route does not change MongoDB. The form submits to a different PUT route that performs the update.

I learned how method-override lets an HTML form act like PUT or DELETE.

Example:

<form action="/books/<%= book._id %>?_method=PUT" method="POST">

I learned how async and await work with MongoDB and external APIs.

I learned how try and catch provide error handling.

Example:

catch (error) {
  console.error(error);
  return res.status(500).send("SERVER ISSUE!");
}

I learned how middleware works between a request and a route. This project uses middleware for JSON, form data, static files, request logging, method override, 404 responses, and server errors.

I learned how JSON is used by REST APIs and Postman.

I learned server-to-server communication by using Axios to request book information from Open Library.

I learned how EJS works with res.render() to send MongoDB data into HTML pages.

EJS Pages

views/index.ejs displays all books.
views/new.ejs displays the new book form.
views/show.ejs displays one book.
views/edit.ejs displays the Book List Edit Page with a pre-populated form.

Web CRUD Routes

GET /books
Displays all books.

GET /books/new
Displays the new book form.

POST /books
Creates a book.

GET /books/:id
Finds and displays one book by ID.

GET /books/:id/edit
Finds one book and renders the edit form.

PUT /books/:id
Updates the book.

DELETE /books/:id
Deletes the book.

Postman REST API Routes

GET /api/books
GET /api/books/:id
POST /api/books
PUT /api/books/:id
DELETE /api/books/:id

Server-to-Server Route

GET /api/lookup?isbn=ISBN_NUMBER

This route asks Open Library for book information.

Dependencies

express
mongoose
mongodb
dotenv
ejs
method-override
axios

Development Dependency

typescript

Running the Project in VS Code

1. Open the project folder in VS Code.
2. Run npm install.
3. Create a .env file from .env.example.
4. Add the MongoDB Atlas connection string.
5. Run npm start.
6. Open http://localhost:3000.

Optional Demo Books

Run:

npm run seed

Security

The real .env file is ignored by Git. MongoDB credentials should never be uploaded to GitHub.

Other Full-Stack Coursework

I have also studied Java, React, SQL, AWS EC2, Amazon S3, AWS CLI, and VPC. These are part of my broader coursework, but this specific catalog uses the Node.js, Express, EJS, MongoDB, Mongoose, JavaScript, TypeScript, and REST API stack listed above.

Author: Dr. Chantell McDowell
Per Scholas Student
