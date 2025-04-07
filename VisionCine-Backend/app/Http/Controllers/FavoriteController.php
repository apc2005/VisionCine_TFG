<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Models\User;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index($userId)
    {
        $user = User::findOrFail($userId);
        $favoriteMovies = $user->favoriteMovies; // Relación de muchos a muchos
        return response()->json($favoriteMovies);
    }

    public function store(Request $request, $movieId)
    {
        $user = $request->user();
        $movie = Movie::findOrFail($movieId);

        $user->favoriteMovies()->syncWithoutDetaching([$movie->id]);

        return response()->json(['message' => 'Movie added to favorites', 'movie' => $movie]);
    }

    public function destroy(Request $request, $movieId)
    {
        $user = $request->user();
        $movie = Movie::findOrFail($movieId);

        $user->favoriteMovies()->detach($movie->id);

        return response()->json(['message' => 'Movie removed from favorites']);
    }
}
