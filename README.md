# Library Management API

A Library Management System built with Express.js, TypeScript, MongoDB, and Mongoose.

This API allows users to manage books, borrow books, track availability, and generate borrowed books summaries using MongoDB aggregation pipeline.

---

# Features

- Create, update, delete, and retrieve books
- Borrow books with business logic validation
- Automatic availability control
- MongoDB aggregation pipeline for borrow summary
- Filtering and sorting support
- Mongoose static method implementation
- Mongoose middleware support
- Proper error handling and validation

---

# Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- dotenv
- cors

---

# Project Setup

## 1. Clone the repository

```bash
git clone <your-repository-url>
```

## 2. Move to the project folder

```bash
cd library-management-api
```

## 3. Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=3000
DATABASE_URL=your_mongodb_connection_string
```

---

# Run the Project

## Development mode

```bash
npm run dev
```

## Production build

```bash
npm run build
```

## Start production server

```bash
npm start
```

---

# API Endpoints

---

## Create Book

### POST `/api/books`

Creates a new book.

### Request Body

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5
}
```

---

## Get All Books

### GET `/api/books`

---

## Get Book By ID

### GET `/api/books/:bookId`

Returns a single book by ID.

---

## Update Book

### PUT `/api/books/:bookId`

Updates book information.

---

## Delete Book

### DELETE `/api/books/:bookId`

Deletes a book.

---

## Borrow a Book

### POST `/api/borrow`

### Business Logic

- Checks available copies
- Deducts borrowed quantity
- Updates availability status
- Creates borrow record

### Request Body

```json
{
  "book": "BOOK_ID",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

---

## Borrow Summary

### GET `/api/borrow`

Returns aggregated borrowed books summary.

### Aggregation Features

- Group borrowed books
- Calculate total borrowed quantity
- Join book details using `$lookup`

---

# Mongoose Features Used

## Static Method

Used to update book availability when copies become zero.


---

# Error Handling

The API handles:

- Validation errors
- Invalid ObjectId
- Book not found
- Insufficient copies
- Server errors

### Example Error Response

```json
{
  "success": false,
  "message": "Validation failed",
  "error": {}
}
```

---

# Author

Abdullah Al Ashik
