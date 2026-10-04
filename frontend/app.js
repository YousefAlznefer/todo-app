

async function loadTasks() {
    const response = await fetch('/api/tasks');
    const tasks = await response.json();
    const list = document.getElementById('task-list');
    list.innerHTML = '';

    tasks.forEach(task => {
        // ===== المرحلة 1: أنشئ المهمة وضع العنوان =====
        const li = document.createElement('li');
        li.textContent = task.completed === true ? `✅  ${task.title}` : task.title;
        li.style.cursor = 'pointer';

        // ===== المرحلة 2: الضغط على المهمة يقلب حالتها =====
        li.addEventListener('click', async () => {
            await fetch(`/api/tasks/${task.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: !task.completed })
            });
            loadTasks();
        });

        // ===== المرحلة 3: زر الحذف =====
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑️';
        deleteBtn.style.cursor = 'pointer';

        deleteBtn.addEventListener('click', async (event) => {
            event.stopPropagation();
            await fetch(`/api/tasks/${task.id}`, {
                method: 'DELETE'
            });
            loadTasks();
        });

        li.appendChild(deleteBtn);

        // ===== المرحلة 4: ضع المهمة في القائمة =====
        list.appendChild(li);
    });
}

const form = document.getElementById('task-form');
const input = document.getElementById('task-input');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = input.value.trim();
    if (!title) return;
    await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title })
    });
    loadTasks()
    input.value = '';
})


loadTasks()

