<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>To-Do List</title>
    @vite(['resources/css/app.css', 'resources/js/todo.js'])
</head>
<body class="p-4 bg-gray-100">
    <div class="max-w-xl mx-auto">
        <h1 class="text-2xl font-bold mb-4">To-Do List</h1>
        <form id="task-form" class="flex gap-2 mb-4">
            <input id="task-input" class="flex-1 border px-2 py-1" placeholder="Aggiungi attività">
            <button type="submit" class="bg-blue-600 text-white px-4 py-1">Aggiungi</button>
        </form>
        <ul id="task-list" class="space-y-2"></ul>
    </div>
</body>
</html>
