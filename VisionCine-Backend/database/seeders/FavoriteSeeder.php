<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Favorite;
use App\Models\User;
use App\Models\Movie;

class FavoriteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $user = User::where('email', 'john.doe@example.com')->first();
        $movie = Movie::where('title', 'The Matrix')->first();

        Favorite::create([
            'user_id' => $user->id,
            'movie_id' => $movie->id,
        ]);
    }
}
