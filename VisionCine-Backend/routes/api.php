<?php

use App\Http\Controllers\Auth\AuthController;

Route::post('/login', [AuthController::class, 'login']);
