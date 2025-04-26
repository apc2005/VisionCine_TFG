<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\WatchLaterController;
use App\Http\Controllers\WatchedController;
use App\Http\Controllers\ReviewController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::get('/verify-token', [AuthController::class, 'verifyToken']);


    Route::get('/movies', [MovieController::class, 'index']);
    Route::get('/movies/{id}', [MovieController::class, 'show']);
    Route::post('/movies', [MovieController::class, 'store'])->middleware('check.admin.role');
    Route::put('/movies/{id}', [MovieController::class, 'update'])->middleware('check.admin.role');
    Route::delete('/movies/{id}', [MovieController::class, 'destroy'])->middleware('check.admin.role');


    Route::get('/favorites', [FavoriteController::class, 'index']);
    Route::post('/favorites', [FavoriteController::class, 'store']);
    Route::delete('/favorites/{id}', [FavoriteController::class, 'destroy']);

    Route::get('/watch-later', [WatchLaterController::class, 'index']);
    Route::post('/watch-later', [WatchLaterController::class, 'store']);
    Route::delete('/watch-later/{id}', [WatchLaterController::class, 'destroy']);

    Route::get('/watched', [WatchedController::class, 'index']);
    Route::post('/watched', [WatchedController::class, 'store']);
    Route::delete('/watched/{id}', [WatchedController::class, 'destroy']);

    Route::get('/reviews', [ReviewController::class, 'index']);
    Route::post('/reviews', [ReviewController::class, 'store']);
    Route::get('/reviews/movie/{id}', [ReviewController::class, 'getByMovie']);
});
