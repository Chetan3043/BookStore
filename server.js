// Import Express
const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Sample in-memory book list
let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "Atomic Habits", author: "James Clear" },
];

// GET - Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// POST - Add a new book
app.post('/books', (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author
  };

  if (!newBook.title || !newBook.author) {
    return res.status(400).json({ message: "Please provide both title and author." });
  }

  books.push(newBook);
  res.status(201).json({ message: "Book added successfully!", book: newBook });
});

// PUT - Update a book by ID
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({ message: "Book not found!" });
  }

  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;

  res.json({ message: "Book updated successfully!", book });
});

// DELETE - Delete a book by ID
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === bookId);

  if (index === -1) {
    return res.status(404).json({ message: "Book not found!" });
  }

  books.splice(index, 1);
  res.json({ message: "Book deleted successfully!" });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
