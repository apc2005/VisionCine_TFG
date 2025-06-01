<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::all();

        $adminRole = Role::find(1);
        if (!$adminRole) {
            $adminRole = Role::create(['name' => 'admin']);
        }

        if (!$roles->contains('id', 1)) {
            $roles->push($adminRole);
        }

        return response()->json($roles);
    }
}
