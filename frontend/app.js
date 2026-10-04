

async function loadTasks() {
    const response = await fetch('/api/tasks');
    const tasks = await response.json();
    const list = document.getElementById('task-list');
    list.innerHTML = '';

    // العدّاد
    const done = tasks.filter(task => task.completed).length;
    document.getElementById('counter').textContent = `${done} of ${tasks.length} completed`;

    // رسالة القائمة الفارغة
    document.getElementById('empty').hidden = tasks.length > 0;

    tasks.forEach(task => {
        // المرحلة 1: أنشئ المهمة وقطعها الثلاث
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        const check = document.createElement('span');
        check.className = 'check';
        check.textContent = task.completed ? '✓' : '';

        const title = document.createElement('span');
        title.className = 'title';
        title.textContent = task.title;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete';
        deleteBtn.textContent = '✕';

        // المرحلة 2: الضغط على المهمة يقلب حالتها
        li.addEventListener('click', async () => {
            await fetch(`/api/tasks/${task.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: !task.completed })
            });
            loadTasks();
        });

        // المرحلة 3: زر الحذف
        deleteBtn.addEventListener('click', async (event) => {
            event.stopPropagation();
            await fetch(`/api/tasks/${task.id}`, { method: 'DELETE' });
            loadTasks();
        });

        // المرحلة 4: ركّب القطع وضع المهمة في القائمة
        li.append(check, title, deleteBtn);
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

