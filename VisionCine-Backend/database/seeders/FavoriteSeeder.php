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
        if (!$user) {
            $this->command->info('Creando el usuario john.doe@example.com');
            $user = User::create([
                'name' => 'John Doe',
                'email' => 'john.doe@example.com',
                'password' => bcrypt('password123'), 
            ]);
        } else {
            $this->command->info('Usuario encontrado: ' . $user->email);
        }

        $movie = Movie::where('title', 'The Matrix')->first();
        if (!$movie) {
            $this->command->info('Creando la película "The Matrix"');
            $movie = Movie::create([
                'tmdb_id' => 1,
                'title' => 'The Matrix',
                'overview' => 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
                'release_date' => '1999-03-31',
                'runtime' => 136,
                'poster_path' => 'https://image.tmdb.org/t/p/w500/9ixJxhvYcQ8doYkYW9XOM1CHMlt.jpg',
                'backdrop_path' => 'https://image.tmdb.org/t/p/w780/8RzF99IvcJX0D1LVzYZ0AZj7F1Q.jpg',
                'vote_average' => 8.7,
                'vote_count' => 12234,
                'popularity' => 68.7,
            ]);
        } else {
            $this->command->info('Película encontrada: ' . $movie->title);
        }

        // Crear el favorito
        Favorite::create([
            'user_id' => $user->id,
            'movie_id' => $movie->id,
        ]);

        $this->command->info('Favorito creado correctamente');
    }
}
