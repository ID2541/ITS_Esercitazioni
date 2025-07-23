<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TaskController;

// Esempio base (puoi aggiungere la tua rotta qui)
Route::get('/ping', function () {
    return response()->json(['message' => 'API attiva']);
});

// Rotte per il controller TaskController
Route::apiResource('tasks', TaskController::class);

