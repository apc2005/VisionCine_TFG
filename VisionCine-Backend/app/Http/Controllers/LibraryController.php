<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Models\User;
use Illuminate\Http\Request;

class LibraryController extends Controller
{
    public function index($userId)
    {
        $user = User::findOrFail($userId);
        $libraryMovies = $user->libraryMovies; // Relación de muchos a muchos
        return response()->json($libraryMovies);
    }

    public function store(Request $request, $movieId)
    {
        $user = $request->user();
        $movie = Movie::findOrFail($movieId);

        $user->libraryMovies()->syncWithoutDetaching([$movie->id]);

        return response()->json(['message' => 'Movie added to library', 'movie' => $movie]);
    }

    public function destroy(Request $request, $movieId)
    {
        $user = $request->user();
        $movie = Movie::findOrFail($movieId);

        $user->libraryMovies()->detach($movie->id);

        return response()->json(['message' => 'Movie removed from library']);
    }
}
