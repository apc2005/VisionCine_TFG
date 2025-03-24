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
        // Obtén algunos usuarios y películas
        $user = User::first(); // O selecciona un usuario específico
        $movie = Movie::first(); // O selecciona una película específica

        // Inserta reseñas
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
