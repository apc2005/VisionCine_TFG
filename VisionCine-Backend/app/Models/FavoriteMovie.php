<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FavoriteMovie extends Model
{
    protected $table = 'user_favorite_movies';

    protected $fillable = [
        'user_id',
        'movie_id',
    ];

    public $timestamps = true;
}
