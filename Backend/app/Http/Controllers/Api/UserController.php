<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $users = User::paginate(6);

        return response()->json([
            'data'         => $users->items(),
            'current_page' => $users->currentPage(),
            'total_pages'  => $users->lastPage(),
            'total'        => $users->total(),
        ]);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);

        return response()->json($user);
    }
}