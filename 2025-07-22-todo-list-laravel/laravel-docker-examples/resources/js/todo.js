document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const input = document.getElementById('task-input');
    const list = document.getElementById('task-list');

    const fetchTasks = async () => {
        const res = await fetch('/api/tasks');
        const tasks = await res.json();
        renderTasks(tasks);
    };

    const renderTasks = (tasks) => {
        list.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'flex justify-between items-center bg-white p-2 rounded shadow';
            li.innerHTML = `
                <span class="${task.completed ? 'line-through text-gray-500' : ''}">${task.title}</span>
                <div class="flex gap-2">
                    <button class="toggle" data-id="${task.id}" data-completed="${task.completed}">
                        ✅
                    </button>
                    <button class="delete" data-id="${task.id}">
                        🗑️
                    </button>
                </div>
            `;
            list.appendChild(li);
        });
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = input.value.trim();
        if (!title) return;
        await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title })
        });
        input.value = '';
        fetchTasks();
    });

    list.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete')) {
            const id = e.target.dataset.id;
            await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
            fetchTasks();
        }

        if (e.target.classList.contains('toggle')) {
            const id = e.target.dataset.id;
            const completed = e.target.dataset.completed === 'true';
            await fetch(`/api/tasks/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: !completed })
            });
            fetchTasks();
        }
    });

    fetchTasks();
});
