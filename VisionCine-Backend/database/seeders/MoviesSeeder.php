<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use App\Models\Movie;

class MoviesSeeder extends Seeder
{
    public function run()
    {
        Movie::query()->delete();

        $apiKey = env('TMDB_API_KEY');
        $baseUrl = env('TMDB_BASE_URL');

        if (!$apiKey || !$baseUrl) {
            $this->command->error('TMDB_API_KEY or TMDB_BASE_URL is not set in .env');
            return;
        }

        $page = 1;
        $totalPages = 1;

        do {
            $response = Http::get("{$baseUrl}/movie/popular", [
                'api_key' => $apiKey,
                'language' => 'es-ES',
                'page' => $page,
            ]);

            if ($response->successful()) {
                $movies = $response->json()['results'];
                $totalPages = $response->json()['total_pages'];

                foreach ($movies as $movie) {
                    Movie::updateOrCreate(
                        ['tmdb_id' => $movie['id']], // Avoid duplicates
                        [
                            'title' => $movie['title'],
                            'description' => $movie['overview'],
                            'release_date' => !empty($movie['release_date']) ? $movie['release_date'] : null,
                            'poster_path' => $movie['poster_path'],
                        ]
                    );
                }
                

                $this->command->info("Page {$page} seeded successfully.");
                $page++;
            } else {
                $this->command->error("Error fetching data from external API on page {$page}.");
                break;
            }
        } while ($page <= $totalPages);
    }
}
