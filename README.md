Digital Bookshelf API

Project Overview

In this project, I created a RESTful Digital Bookshelf API using Node.js, Express, MongoDB Atlas, Mongoose, and dotenv. The API allows a librarian to create, view, update, and delete book records stored in a MongoDB database.

What I Learned

I learned how Express, Mongoose, and MongoDB Atlas work together. I also learned why it is helpful to separate the database connection, Mongoose model, and Express routes into different folders. This made the project easier for me to understand and troubleshoot.

Project Structure

Dr_Chantell_Mongoose_Models_and_Schemas
db folder
connection.js
models folder
Book.js
routes folder
bookRoutes.js
.env.example
.gitignore
package.json
package-lock.json
README.md
reflection.md
server.js
Required Dependencies

This project uses Express, Mongoose, and dotenv.

Install the dependencies by entering npm install in the terminal.

Environment Variables

The real .env file is private and ignored by Git. I use .env.example to show the required variable names without exposing my MongoDB username or password.
To create the local environment file, I enter cp .env.example .env in the terminal.
I then replace the example values in my local .env file with my MongoDB Atlas Database Access user information.
Example format:
MONGODB_URI=mongodb+srv://YOUR_USERNAME@YOUR_CLUSTER.mongodb.net/digitalBookshelf
PORT=3000

Database Connection Challenge

One of the biggest challenges I had was connecting my application to MongoDB Atlas. At first, the application reported that the MongoDB URI was undefined. I learned that my .env file had to be inside the same project folder as server.js. I also learned that the environment variable had to be named MONGODB_URI exactly.

After correcting that issue, I received a bad auth: authentication failed message. I learned that MongoDB Atlas uses a Database Access user for the application connection. This database user is separate from the username and password used to sign in to the MongoDB Atlas website.
I also discovered that I had more than one Atlas project and more than one local .env file. An older connection string was pointing to a different cluster. I corrected this by using the Digital Bookshelf Lab project, checking the correct Database Access user, verifying my IP Access List, and copying a new Node.js driver connection string from the correct DigitalBookshelfCluster.

After I updated the correct local .env file, the application connected successfully and displayed:
MongoDB connected successfully!
Server is running on port 3000

This troubleshooting process helped me understand environment variables, Atlas Database Access users, cluster connection strings, and network access.

Book Model

The Book schema contains a title that is a required string, an author that is a required string, an ISBN that is a unique string, a published date that uses the Date data type, and an in-stock field that is a Boolean with a default value of true.

CRUD API Routes
POST /api/books creates a new book.
GET /api/books displays all books.
GET /api/books/ displays one book.
PUT /api/books/ updates a book.
DELETE /api/books/ deletes a book.
The routes use async and await with try and catch blocks for error handling. The POST route returns status 201 when a new book is created. The routes that use an ID also handle invalid IDs and books that cannot be found.

Running the Project

I can start the server by entering node server.js or npm start in the terminal.
Testing With Postman

I can test all five CRUD routes in Postman. For a POST request, I can send the following JSON information:
{
"title": "The Color Purple",
"author": "Alice Walker",
"isbn": "9780156028356",
"publishedDate": "1982-01-01",
"inStock": true
}

I can copy the returned _id and use it to test the GET one, PUT, and DELETE routes.

Security

My .gitignore file prevents the .env file and node_modules folder from being uploaded to GitHub. My private MongoDB credentials stay only in my local .env file.

Author: Dr. Chantell McDowell
Per Scholas Student
