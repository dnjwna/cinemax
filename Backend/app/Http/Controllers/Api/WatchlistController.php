<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Watchlist;
use Illuminate\Http\Request;

class WatchlistController extends Controller {
    public function index(Request $request) {
        $watchlist = Watchlist::where('user_id', $request->user()->id)->get();
        return response()->json($watchlist);
    }

    public function store(Request $request) {
        $existing = Watchlist::where('user_id', $request->user()->id)
            ->where('movie_id', $request->movie_id)
            ->first();

        if ($existing) {
            return response()->json(['message' => 'Already in watchlist'], 409);
        }

        $item = Watchlist::create([
            'user_id'  => $request->user()->id,
            'movie_id' => $request->movie_id,
            'title'    => $request->title,
            'genre'    => $request->genre,
            'rating'   => $request->rating,
            'year'     => $request->year,
            'image'    => $request->image,
        ]);

        return response()->json($item, 201);
    }

    public function destroy(Request $request, $movieId) {
        Watchlist::where('user_id', $request->user()->id)
            ->where('movie_id', $movieId)
            ->delete();

        return response()->json(['message' => 'Removed from watchlist']);
    }
}