Digital Bookshelf API

Project Overview

In this project, I created a RESTful Digital Bookshelf API using Node.js, Express, MongoDB Atlas, Mongoose, and dotenv. The API allows a librarian to create, view, update, and delete book records stored in a MongoDB database.

What I Learned

I learned how Express, Mongoose, and MongoDB Atlas work together. I also learned why it is helpful to separate the database connection, Mongoose model, and Express routes into different folders. This made the project easier for me to understand and troubleshoot.

Project Structure

```text
Dr_Chantell_Mongoose_Models_and_Schemas/
├── db/
│   └── connection.js
├── models/
│   └── Book.js
├── routes/
│   └── bookRoutes.js
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
├── reflection.md
└── server.js
```

Required Dependencies

This project uses the required dependencies:

- express
- mongoose
- dotenv

Install the dependencies with:

```bash
npm install
```

Environment Variables

The real `.env` file is private and is ignored by Git. I use `.env.example` to show the required variable names without exposing my MongoDB username or password.

To create the local environment file:

```bash
cp .env.example .env
```

Then I replace the example values in my local `.env` with my MongoDB Atlas Database Access user information.

Example format:

```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/digitalBookshelf
PORT=3000
```

Database Connection Challenge

One of the biggest challenges I had was connecting my application to MongoDB Atlas. At first, the application reported that the MongoDB URI was undefined. I learned that my `.env` file had to be inside the same project folder as `server.js`, and the environment variable had to be named `MONGODB_URI` exactly.

After correcting that issue, I received a `bad auth: authentication failed` message. I learned that MongoDB Atlas uses a Database Access user for the application connection. This database user is separate from the username and password used to sign in to the MongoDB Atlas website.

I also discovered that I had more than one Atlas project and more than one local `.env` file. An older connection string was pointing to a different cluster. I corrected this by using the Digital Bookshelf Lab project, checking the correct Database Access user, verifying my IP Access List, and copying a new Node.js driver connection string from the correct DigitalBookshelfCluster.

After I updated the correct local `.env` file, the application connected successfully and displayed:

```text
MongoDB connected successfully!
Server is running on port 3000
```

This troubleshooting process helped me understand environment variables, Atlas Database Access users, cluster connection strings, and network access.

Book Model

The `Book` schema contains:

- `title` - String and required
- `author` - String and required
- `isbn` - String and unique
- `publishedDate` - Date
- `inStock` - Boolean with a default value of true

CRUD API Routes

```text
POST   /api/books       Create a new book
GET    /api/books       View all books
GET    /api/books/:id   View one book
PUT    /api/books/:id   Update a book
DELETE /api/books/:id   Delete a book
```

The routes use async/await and try/catch blocks for error handling. The POST route returns status 201 when a new book is created. The routes that use an ID also handle invalid IDs and books that cannot be found.

Running the Project

Start the server with:

```bash
node server.js
```

or:

```bash
npm start
```

Testing With Postman

I can test the five CRUD routes in Postman. For a POST request, I can send JSON such as:

```json
{
  "title": "The Color Purple",
  "author": "Alice Walker",
  "isbn": "9780156028356",
  "publishedDate": "1982-01-01",
  "inStock": true
}
```

I can copy the returned `_id` and use it to test the GET one, PUT, and DELETE routes.

Security

My `.gitignore` prevents both `.env` and `node_modules/` from being uploaded to GitHub. My private MongoDB credentials stay only in my local `.env` file.

Author: Dr. Chantell McDowell
Per Scholas Student
