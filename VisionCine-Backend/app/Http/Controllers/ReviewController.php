<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Movie;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request, $movieId)
    {
        $movie = Movie::findOrFail($movieId);
        
        $review = new Review;
        $review->movie_id = $movie->id;
        $review->user_id = $request->user()->id;
        $review->review_text = $request->review_text;
        $review->rating = $request->rating;
        $review->save();

        return response()->json($review, 201);
    }

    public function index($movieId)
    {
        $reviews = Review::where('movie_id', $movieId)->get();
        return response()->json($reviews);
    }
}
