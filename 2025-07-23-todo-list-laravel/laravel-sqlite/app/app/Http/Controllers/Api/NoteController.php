<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\NoteResource;
use App\Models\Note;
use App\Models\Task;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    // GET /api/tasks/{task}/notes
    public function index($taskId)
    {
        $task = Task::findOrFail($taskId);
        return NoteResource::collection($task->notes()->orderByDesc('created_at')->get());
    }

    // POST /api/tasks/{task}/notes
    public function store(Request $request, $taskId)
    {
        $validated = $request->validate([
            'text' => 'required|string|max:1000',
        ]);

        $note = new Note([
            'note' => $validated['text'],
            'completed' => false,
        ]);

        $task = Task::findOrFail($taskId);
        $task->notes()->save($note);

        return new NoteResource($note);
    }

    // PUT /api/notes/{id}
    public function update(Request $request, $id)
    {
        $note = Note::findOrFail($id);

        $validated = $request->validate([
            'text' => 'sometimes|string|max:1000',
            'completed' => 'sometimes|boolean',
        ]);

        if (isset($validated['text'])) {
            $note->note = $validated['text'];
        }

        if (isset($validated['completed'])) {
            $note->completed = $validated['completed'];
        }

        $note->save();

        return new NoteResource($note);
    }

    // DELETE /api/notes/{id}
    public function destroy($id)
    {
        $note = Note::findOrFail($id);
        $note->delete();

        return response()->json(['message' => 'Nota eliminata']);
    }

    // DELETE /api/tasks/{task}/notes/completed
    public function destroyCompleted($taskId)
    {
        $task = Task::findOrFail($taskId);
        $task->notes()->where('completed', true)->delete();

        return response()->json(['message' => 'Note completate eliminate']);
    }
}
