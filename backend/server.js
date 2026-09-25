const express = require('express');
const app = express();
app.use(express.json());
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

app.post('/api/tasks', (req, res) => {
    const body = req.body;
    const newTask = {
        id: Date.now(),
        title: body.title,
        completed: false
    };
    if (!newTask.title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.get('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (!task) {
        return res.status(404).json({ error: 'task not found' });
    }
    res.json(task);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});