<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use App\Models\Movie;

class MovieSeeder extends Seeder
{
    public function run()
    {
        $apiKey = env('TMDB_API_KEY');
        $baseUrl = env('TMDB_BASE_URL');

        $response = Http::get("$baseUrl/movie/popular", [
            'api_key' => $apiKey,
            'language' => 'en-US',
            'page' => 1,
        ]);

        if ($response->successful()) {
            $movies = $response->json()['results'];

            foreach ($movies as $movie) {
                Movie::create([
                    'tmdb_id' => $movie['id'],
                    'title' => $movie['title'],
                    'overview' => $movie['overview'],
                    'release_date' => $movie['release_date'],
                    'runtime' => null, 
                    'poster_path' => 'https://image.tmdb.org/t/p/w500' . $movie['poster_path'],
                    'backdrop_path' => 'https://image.tmdb.org/t/p/w780' . $movie['backdrop_path'],
                    'vote_average' => $movie['vote_average'],
                    'vote_count' => $movie['vote_count'],
                    'popularity' => $movie['popularity'],
                ]);
            }

            $this->command->info('Películas populares insertadas correctamente.');
        } else {
            $this->command->error('Error al conectar con la API de TMDB.');
        }
    }
}
