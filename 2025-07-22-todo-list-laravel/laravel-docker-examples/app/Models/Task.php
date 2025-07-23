<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'due_date',
        'is_completed',
        'task_list_id',
        'user_id',
    ];

    protected $casts = [
        'due_date' => 'datetime',
        'is_completed' => 'boolean',
    ];

    // Relazione N Tasks -> 1 TaskList
    public function taskList()
    {
        return $this->belongsTo(TaskList::class);
    }

    // Relazione N Tasks -> 1 User (opzionale)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relazione 1 Task -> N Notes
    public function notes()
    {
        return $this->hasMany(Note::class);
    }
}
