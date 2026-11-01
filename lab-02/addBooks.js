
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

async function addBooks() {
  const db = await open({
    filename: "./library.db",
    driver: sqlite3.Database,
  });

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

  console.log("Books inserted successfully");
  await db.close();
}

addBooks();
