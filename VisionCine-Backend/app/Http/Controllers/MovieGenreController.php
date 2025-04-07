<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Models\Genre;
use Illuminate\Http\Request;

class MovieGenreController extends Controller
{
    public function store(Request $request, $movieId)
    {
        $movie = Movie::findOrFail($movieId);
        $genreIds = $request->genre_ids;
        
        $movie->genres()->sync($genreIds);

        return response()->json($movie->genres);
    }
}
