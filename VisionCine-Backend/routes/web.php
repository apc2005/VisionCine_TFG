<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\MovieController;


Route::get('/', function () {
    return view('welcome');
});
