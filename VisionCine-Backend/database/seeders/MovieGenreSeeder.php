<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Movie;
use App\Models\Genre;

class MovieGenreSeeder extends Seeder
{
    public function run()
    {
        $movies = Movie::all();
        $genres = Genre::all();

        foreach ($movies as $movie) {
            $randomGenres = $genres->random(rand(1, 3));
            
            foreach ($randomGenres as $genre) {
                $movie->genres()->attach($genre->id);
            }
        }

        $this->command->info('Relaciones de películas y géneros insertadas correctamente.');
    }
}
