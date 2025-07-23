<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\TaskList;
use App\Models\Task;
use App\Models\Note;

class TaskSeeder extends Seeder
{
    public function run()
    {
        // Recupera un utente esistente o creane uno
        $user = User::first() ?? User::factory()->create();

        // Recupera una task list esistente o creane una
        $taskList = TaskList::where('user_id', $user->id)->first() ?? TaskList::create([
            'name' => 'Lista predefinita',
            'user_id' => $user->id,
        ]);

        // Crea alcuni task
        $task1 = Task::create([
            'title' => 'Completare report mensile',
            'description' => 'Preparare e inviare il report mensile al management.',
            'due_date' => now()->addDays(4),
            'is_completed' => false,
            'task_list_id' => $taskList->id,
            'user_id' => $user->id,
        ]);

        $task2 = Task::create([
            'title' => 'Aggiornare documentazione',
            'description' => 'Aggiornare la documentazione tecnica del progetto.',
            'due_date' => now()->addWeek(),
            'is_completed' => false,
            'task_list_id' => $taskList->id,
            'user_id' => $user->id,
        ]);

        // Crea alcune note legate ai task
        Note::create([
            'content' => 'Ricordati di includere i dati finanziari nel report.',
            'task_id' => $task1->id,
            'user_id' => $user->id,
        ]);

        Note::create([
            'content' => 'Verificare le nuove API introdotte prima di aggiornare la documentazione.',
            'task_id' => $task2->id,
            'user_id' => $user->id,
        ]);
    }
}
