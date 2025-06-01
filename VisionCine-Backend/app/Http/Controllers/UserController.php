<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Middleware\CheckAdminRole;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware(CheckAdminRole::class)->only(['store', 'update', 'destroy']);
    }

    public function index(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            Log::warning('Unauthorized access attempt to UserController@index');
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        try {
            $perPage = $request->input('per_page', 10);
            $users = User::paginate($perPage);
            return response()->json($users);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching users', 'message' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:6',
            'role_id' => 'nullable|exists:roles,id',
        ]);

        $validated['password'] = Hash::make($validated['password']);

        $user = User::create($validated);

        return response()->json($user, 201);
    }

    public function show($id)
    {
        $user = request()->user();
        if (!$user) {
            Log::warning('Unauthorized access attempt to UserController@show');
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        try {
            $user = User::findOrFail($id);
            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching user', 'message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6',
            'role_id' => 'nullable|exists:roles,id',
        ]);

        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return response()->json($user);
    }

    public function destroy($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            Log::error('Error deleting user: ' . $e->getMessage());
            return response()->json(['error' => 'Error deleting user', 'message' => $e->getMessage()], 500);
        }
    }
}
