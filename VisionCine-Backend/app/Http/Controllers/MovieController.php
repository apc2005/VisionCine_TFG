<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MovieController extends Controller
{
    public function index()
    {
        $movies = Movie::all();
        return response()->json($movies);
    }

    public function show($id)
    {
        $movie = Movie::find($id);
        return response()->json($movie);
    }

    public function fetchFromApi()
    {
        $apiKey = env('VITE_API_KEY');
        $baseUrl = env('VITE_BASE_URL');
        
        $response = Http::get("{$baseUrl}/movie/popular", [
            'api_key' => $apiKey,
            'language' => 'en-US',
            'page' => 1,
        ]);

        $movies = $response->json()['results'];

        foreach ($movies as $movie) {
            Movie::updateOrCreate(
                ['tmdb_id' => $movie['id']],
                [
                    'title' => $movie['title'],
                    'overview' => $movie['overview'],
                    'release_date' => $movie['release_date'],
                    'runtime' => $movie['runtime'] ?? 0,
                    'poster_path' => $movie['poster_path'],
                    'backdrop_path' => $movie['backdrop_path'],
                    'vote_average' => $movie['vote_average'],
                    'vote_count' => $movie['vote_count'],
                    'popularity' => $movie['popularity'],
                ]
            );
        }

        return response()->json($movies);
    }
}
