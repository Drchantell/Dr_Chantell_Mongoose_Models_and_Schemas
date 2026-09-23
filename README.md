# Digital Bookshelf API

## Setup

1. Copy `.env.example` to `.env`.
2. Replace the placeholder `MONGODB_URI` with a MongoDB Atlas database-user connection string.
3. Start the API:

```bash
npm start
```

The API listens on `http://localhost:3000` by default. Book endpoints are available under `/api/books`.

Do not use your MongoDB Atlas website login in the connection string. If the password contains special characters, URL-encode them.
