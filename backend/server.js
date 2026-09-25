const express = require('express');
const app = express();
const PORT = 3000;
let tasks = [
    { id: 1, title: "Learn Express", completed: false },
    { id: 2, title: "Build a todo app", completed: false },
    { id: 3, title: "Install Node.js", completed: true },
];

app.get('/', (req, res) => {
    res.send('The server is running!');
});

app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});