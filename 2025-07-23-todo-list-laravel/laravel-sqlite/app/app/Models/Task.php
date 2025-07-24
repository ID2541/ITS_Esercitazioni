<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Task extends Model
{
    protected $fillable = ['name'];

    public function notes(): HasMany
    {
        return $this->hasMany(Note::class);
    }
}
