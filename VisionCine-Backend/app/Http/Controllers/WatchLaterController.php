<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Models\WatchLaterMovie;

class WatchLaterController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        if (!$user) {
            Log::warning('Unauthorized access attempt to WatchLaterController@index');
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        $watchLater = WatchLaterMovie::where('user_id', $user->id)->get();
        return response()->json($watchLater);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            Log::warning('Unauthorized access attempt to WatchLaterController@store');
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        $movieId = $request->input('movie_id');

        $exists = WatchLaterMovie::where('user_id', $user->id)->where('movie_id', $movieId)->exists();
        if ($exists) {
            return response()->json(['message' => 'La película ya está en tu lista de ver más tarde'], 400);
        }

        $watchLater = WatchLaterMovie::create([
            'user_id' => $user->id,
            'movie_id' => $movieId,
        ]);

        return response()->json($watchLater, 201);
    }

    public function destroy($movieId)
    {
        $user = Auth::user();
        if (!$user) {
            Log::warning('Unauthorized access attempt to WatchLaterController@destroy');
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $watchLater = WatchLaterMovie::where('user_id', $user->id)->where('movie_id', $movieId)->first();
        if (!$watchLater) {
            return response()->json(['message' => 'La película no está en tu lista de ver más tarde'], 404);
        }

        $watchLater->delete();

        return response()->json(['message' => 'Película eliminada de la lista de ver más tarde']);
    }
}
