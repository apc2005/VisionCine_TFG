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

    public function store(Request $request)
    {
        $user = Auth::user();

        $review = Review::create([
            'user_id' => $user->id,
            'movie_id' => $request->input('movie_id'),
            'rating' => $request->input('rating'),
            'comment' => $request->input('comment'),
        ]);

        return response()->json($review, 201);
    }
}
