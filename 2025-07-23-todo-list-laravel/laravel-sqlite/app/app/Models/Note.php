<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Note extends Model
{
    protected $fillable = ['task_id', 'note', 'completed'];

    protected $casts = [
        'completed' => 'boolean',  // Assicura che completed sia booleano nel modello
    ];

    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class);
    }
}
