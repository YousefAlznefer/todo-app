

async function loadTasks() {
    const response = await fetch('/api/tasks')
    const tasks = await response.json();
    const list = document.getElementById('task-list');
    list.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.completed === true ? `✅  ${task.title}` : `${task.title}`;
        list.appendChild(li);
    })
}

const form = document.getElementById('task-form');
const input = document.getElementById('task-input');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = input.value.trim();
    if(!title) return;
    await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title })
    });
    loadTasks()
    input.value = '';
})


loadTasks()

