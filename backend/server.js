const express = require('express');
const db = require('./db');
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
    const data = db.prepare(`SELECT * FROM tasks`).all();

    res.json(data.map(toTask));
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

function toTask(row) {
    return { id: row.id, title: row.title, completed: row.completed === 1 }
}

function findTask(req, res, next) {
    const id = Number(req.params.id);
    if (isNaN(id)) { return res.status(400).json({ message: 'invalid task id' }) }
    const task = db.prepare(`SELECT * FROM tasks WHERE id = ?`).get(id);
    if (!task) { return res.status(404).json({ message: 'task not found' }) }
    req.task = toTask(task);
    next()

}

app.get('/api/tasks/:id', findTask, (req, res) => {
    res.json(req.task);
});

app.delete('/api/tasks/:id', findTask, (req, res) => {
    const index = tasks.indexOf(req.task)
    tasks.splice(index, 1);
    res.status(204).send();

})

app.patch('/api/tasks/:id', findTask, (req, res) => {
    const task = req.task;
    const title = req.body.title;
    const completed = req.body.completed;
    if (title === undefined && completed === undefined) {
        return res.status(400).json({ message: 'no data provided for update' });
    }
    if (title !== undefined) { task.title = title }
    if (completed !== undefined) { task.completed = completed }
    res.json(task);
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});