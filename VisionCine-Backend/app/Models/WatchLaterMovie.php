<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WatchLaterMovie extends Model
{
    protected $table = 'user_watch_later_movies';

    protected $fillable = [
        'user_id',
        'movie_id',
    ];
}
