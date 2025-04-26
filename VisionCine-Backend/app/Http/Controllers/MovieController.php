<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    public function __construct()
    {
        // Apply admin role middleware to restrict movie creation
        $this->middleware('check.admin.role')->only(['store']);
    }

    // List all movies
    public function index()
    {
        try {
            $movies = Movie::all();
            return response()->json($movies);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching movies', 'message' => $e->getMessage()], 500);
        }
    }

    // Store a new movie (only admin)
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

    // Show a single movie
    public function show($id)
    {
        $movie = Movie::findOrFail($id);
        return response()->json($movie);
    }

    // Update a movie (optional, admin only)
    public function update(Request $request, $id)
    {
        $movie = Movie::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'poster_path' => 'nullable|string',
            'release_date' => 'nullable|date',
            'genre' => 'nullable|string|max:255',
        ]);

        $movie->update($validated);

        return response()->json($movie);
    }

    // Delete a movie (optional, admin only)
    public function destroy($id)
    {
        $movie = Movie::findOrFail($id);
        $movie->delete();

        return response()->json(null, 204);
    }
}
