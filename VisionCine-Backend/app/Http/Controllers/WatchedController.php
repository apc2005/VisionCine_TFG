<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\WatchedMovie;

class WatchedController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $watched = WatchedMovie::where('user_id', $user->id)->get();
        return response()->json($watched);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $movieId = $request->input('movie_id');

        $exists = WatchedMovie::where('user_id', $user->id)->where('movie_id', $movieId)->exists();
        if ($exists) {
            return response()->json(['message' => 'La película ya está en tu lista de vistas'], 400);
        }

        $watched = WatchedMovie::create([
            'user_id' => $user->id,
            'movie_id' => $movieId,
        ]);

        return response()->json($watched, 201);
    }

    public function destroy($movieId)
    {
        $user = Auth::user();

        $watched = WatchedMovie::where('user_id', $user->id)->where('movie_id', $movieId)->first();
        if (!$watched) {
            return response()->json(['message' => 'La película no está en tu lista de vistas'], 404);
        }

        $watched->delete();

        return response()->json(['message' => 'Película eliminada de la lista de vistas']);
    }
}
