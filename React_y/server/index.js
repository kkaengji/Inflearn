const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const PORT = 3000;

const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "Scott Fitzgerald",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
  },
  {
    id: 3,
    title: "Hamlet",
    author: "Shakespeare",
  },
];

app.get("/books", (req, res) => {
  setTimeout(() => {
    res.json(books);
  }, 1000);
});

app.get("/wrong", (req, res) => {
  setTimeout(() => {
    res.status(500).json({
      error: "Error",
    });
  }, 1000);
});

app.listen(PORT, () => {
  console.log(`On http://localhost:${PORT}`);
});
