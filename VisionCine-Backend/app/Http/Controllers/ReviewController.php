<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Review;

class ReviewController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $reviews = Review::where('user_id', $user->id)->get();
        return response()->json($reviews);
    }

    use Illuminate\Validation\ValidationException;

    public function store(Request $request)
    {
        $user = Auth::user();

        try {
            $validated = $request->validate([
                'tmdb_id' => 'required|integer|exists:movies,tmdb_id',
                'rating' => 'required|integer|min:1|max:5',
                'comment' => 'required|string|max:1000',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }

        $movie = \App\Models\Movie::where('tmdb_id', $validated['tmdb_id'])->first();

        if (!$movie) {
            return response()->json(['message' => 'Movie not found'], 404);
        }

        $review = Review::create([
            'user_id' => $user->id,
            'movie_id' => $movie->id,
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
        ]);

        return response()->json($review, 201);
    }

    public function getByMovie($movieId)
    {
        $reviews = Review::with('user')->where('movie_id', $movieId)->get();
        return response()->json($reviews);
    }
}
