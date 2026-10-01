

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
loadTasks()