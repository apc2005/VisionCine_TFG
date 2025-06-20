<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\WatchLaterController;
use App\Http\Controllers\WatchedController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\RoleController;
use App\Http\Middleware\CheckAdminRole;

Route::middleware('api')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::get('/verify-token', [AuthController::class, 'verifyToken']);

    Route::get('/movies', [MovieController::class, 'index']);
    Route::get('/movies/search/{query}', [MovieController::class, 'search']);
    Route::get('/movies/{id}', [MovieController::class, 'show']);
    Route::post('/movies', [MovieController::class, 'store'])->middleware(CheckAdminRole::class);
    Route::put('/movies/{id}', [MovieController::class, 'update'])->middleware(CheckAdminRole::class);
    Route::delete('/movies/{id}', [MovieController::class, 'destroy'])->middleware(CheckAdminRole::class);

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
    Route::get('/reviews/movie/{tmdbId}', [ReviewController::class, 'getByMovie']);

    Route::get('/users', [\App\Http\Controllers\UserController::class, 'index']);
    Route::get('/users/{id}', [\App\Http\Controllers\UserController::class, 'show']);
    Route::post('/users', [\App\Http\Controllers\UserController::class, 'store'])->middleware(CheckAdminRole::class);
    Route::put('/users/{id}', [\App\Http\Controllers\UserController::class, 'update'])->middleware(CheckAdminRole::class);
    Route::delete('/users/{id}', [\App\Http\Controllers\UserController::class, 'destroy'])->middleware(CheckAdminRole::class);

    Route::get('/roles', [RoleController::class, 'index']);
});
