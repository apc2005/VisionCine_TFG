<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WatchedMovie extends Model
{
    protected $table = 'user_watched_movies';

    protected $fillable = [
        'user_id',
        'movie_id',
    ];
}
