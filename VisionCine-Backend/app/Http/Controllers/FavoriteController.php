<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\FavoriteMovie;

class FavoriteController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $favorites = FavoriteMovie::where('user_id', $user->id)->get();
        return response()->json($favorites);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $movieId = $request->input('movie_id');

        $count = FavoriteMovie::where('user_id', $user->id)->count();
        if ($count >= 3) {
            return response()->json(['message' => 'Has alcanzado el máximo de 3 películas favoritas'], 400);
        }

        $exists = FavoriteMovie::where('user_id', $user->id)->where('movie_id', $movieId)->exists();
        if ($exists) {
            return response()->json(['message' => 'La película ya está en tus favoritas'], 400);
        }

        $favorite = FavoriteMovie::create([
            'user_id' => $user->id,
            'movie_id' => $movieId,
        ]);

        return response()->json($favorite, 201);
    }

    public function destroy($movieId)
    {
        $user = Auth::user();

        $favorite = FavoriteMovie::where('user_id', $user->id)->where('movie_id', $movieId)->first();
        if (!$favorite) {
            return response()->json(['message' => 'La película no está en tus favoritas'], 404);
        }

        $favorite->delete();

        return response()->json(['message' => 'Película eliminada de favoritas']);
    }
}
