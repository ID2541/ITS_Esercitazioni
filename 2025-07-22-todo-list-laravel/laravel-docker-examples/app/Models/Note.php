<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Note extends Model
{
    use HasFactory;

    protected $fillable = [
        'content',
        'task_id',
        'user_id',
    ];

    // Relazione N Notes -> 1 Task
    public function task()
    {
        return $this->belongsTo(Task::class);
    }

    // Relazione N Notes -> 1 User (autore della nota)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
