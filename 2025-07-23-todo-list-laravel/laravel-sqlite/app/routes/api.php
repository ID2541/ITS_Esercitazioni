<?php

use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\NoteController;
use Illuminate\Support\Facades\Route;

Route::apiResource('tasks', TaskController::class);
Route::get('tasks/{task}/notes', [NoteController::class, 'index']);
Route::post('tasks/{task}/notes', [NoteController::class, 'store']);
Route::delete('tasks/{task}/notes/completed', [NoteController::class, 'destroyCompleted']);
Route::put('notes/{note}', [NoteController::class, 'update']);
Route::delete('notes/{note}', [NoteController::class, 'destroy']);

