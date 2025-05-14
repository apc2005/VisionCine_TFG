<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Models\Review;
use App\Models\FavoriteMovie;
use App\Models\WatchedMovie;
use App\Models\WatchLaterMovie;
use Illuminate\Http\Request;
use App\Http\Middleware\CheckAdminRole;
use Illuminate\Support\Facades\Log;

class MovieController extends Controller
{
    public function __construct()
    {
        $this->middleware(CheckAdminRole::class)->only(['store', 'update', 'destroy']);
    }

    public function index(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            Log::warning('Unauthorized access attempt to MovieController@index');
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        try {
            $perPage = $request->input('per_page', 10);
            $movies = Movie::paginate($perPage);
            return response()->json($movies);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching movies', 'message' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'poster_path' => 'nullable|string',
            'release_date' => 'nullable|date',
            'genre' => 'nullable|string|max:255',
        ]);

        $movie = Movie::create($validated);

        return response()->json($movie, 201);
    }

    public function show($id)
    {
        $user = request()->user();
        if (!$user) {
            Log::warning('Unauthorized access attempt to MovieController@show');
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        try {
            $movie = Movie::findOrFail($id);
            return response()->json($movie);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching movie', 'message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $movie = Movie::findOrFail($id);
    
        $movie->update([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'poster_path' => $request->input('poster_path'),
            'release_date' => $request->input('release_date'),
            'genre' => $request->input('genre'),
        ]);
    
        return response()->json($movie);
    }
    

    public function destroy($id)
    {
        try {
            $movie = Movie::findOrFail($id);

            Review::where('movie_id', $movie->id)->delete();

            FavoriteMovie::where('movie_id', $movie->id)->delete();

            WatchedMovie::where('movie_id', $movie->id)->delete();

            WatchLaterMovie::where('movie_id', $movie->id)->delete();

            $movie->delete();

            return response()->json(null, 204);
        } catch (\Exception $e) {
            Log::error('Error deleting movie: ' . $e->getMessage());
            return response()->json(['error' => 'Error deleting movie', 'message' => $e->getMessage()], 500);
        }
    }
}
