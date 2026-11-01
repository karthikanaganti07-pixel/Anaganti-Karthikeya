
const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const app = express();
app.use(express.json());

const dbPath = "./library.db";
let db;

const initializeDBAndServer = async () => {
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS book (
      id INTEGER PRIMARY KEY,
      title TEXT,
      author TEXT,
      price INTEGER,
      pages INTEGER
    );
  `);

  app.listen(3000, () => {
    console.log("Server Started");
  });
};

app.get("/books/", async (req, res) => {
  const books = await db.all("SELECT * FROM book");
  res.send(books);
});

app.get("/books/:bookId/", async (req, res) => {
  const { bookId } = req.params;

  const book = await db.get(
    "SELECT * FROM book WHERE id = ?",
    [bookId]
  );

  res.send(book);
});

app.post("/books/", async (req, res) => {
  const { title, author, price, pages } = req.body;

  await db.run(
    `INSERT INTO book (title, author, price, pages)
     VALUES (?, ?, ?, ?)`,
    [title, author, price, pages]
  );

  res.send("Book Added Successfully");
});

app.put("/books/:bookId/", async (req, res) => {
  const { bookId } = req.params;
  const { title, author, price, pages } = req.body;

  await db.run(
    `UPDATE book
     SET title = ?, author = ?, price = ?, pages = ?
     WHERE id = ?`,
    [title, author, price, pages, bookId]
  );

  res.send("Book Updated Successfully");
});

app.delete("/books/:bookId/", async (req, res) => {
  const { bookId } = req.params;

  await db.run(
    "DELETE FROM book WHERE id = ?",
    [bookId]
  );

  res.send("Book Deleted Successfully");
});

initializeDBAndServer();

module.exports = app;
