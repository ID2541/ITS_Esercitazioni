<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TaskList extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'user_id',
    ];

    // Relazione N TaskLists -> 1 User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relazione 1 TaskList -> N Tasks
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
