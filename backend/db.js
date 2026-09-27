const Database = require('better-sqlite3');

const db = new Database('todo.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0
    )
    `);

    const count = db.prepare('SELECT COUNT(*) AS count FROM tasks').get().count;
    if(count == 0 ){
        const insert = db.prepare('INSERT INTO tasks (title, completed) VALUES (?, ?)');
        insert.run('Learn express' , 0);
        insert.run('Build a todo app' , 0);
        insert.run('Install Node.js' , 1);
    }

    module.exports = db;

