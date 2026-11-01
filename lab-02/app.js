
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

  // Auto-seed books if table is empty
  const count = await db.get("SELECT COUNT(*) as count FROM book");
  if (count.count === 0) {
    await db.run(`
      INSERT INTO book (title, author, price, pages) VALUES
      ('Atomic Habits', 'James Clear', 450, 320),
      ('Wings of Fire', 'A P J Abdul Kalam', 300, 180),
      ('The Alchemist', 'Paulo Coelho', 250, 208),
      ('Rich Dad Poor Dad', 'Robert Kiyosaki', 399, 336),
      ('Deep Work', 'Cal Newport', 420, 296),
      ('Ikigai', 'Hector Garcia', 299, 194),
      ('Think and Grow Rich', 'Napoleon Hill', 350, 250),
      ('Zero to One', 'Peter Thiel', 399, 224),
      ('Clean Code', 'Robert Martin', 500, 464),
      ('The Power of Habit', 'Charles Duhigg', 450, 371)
    `);
    console.log("Database seeded with 10 books");
  }

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server Started on port ${PORT}`);
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
