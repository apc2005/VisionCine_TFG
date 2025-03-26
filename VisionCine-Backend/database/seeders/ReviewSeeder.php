<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Review;
use App\Models\User;
use App\Models\Movie;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $user = User::first(); 
        $movie = Movie::first(); 

        Review::create([
            'movie_id' => $movie->id,
            'user_id' => $user->id,
            'rating' => 5,
            'comment' => 'Great movie!'
        ]);

        Review::create([
            'movie_id' => $movie->id,
            'user_id' => $user->id,
            'rating' => 4,
            'comment' => 'Really enjoyed it.'
        ]);
    }
}
