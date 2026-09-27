const Database = require('better-sqlite3');

const db = new Database('todo.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0
    )
    `);

    module.exports = db;

