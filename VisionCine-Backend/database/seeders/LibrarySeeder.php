<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Library;
use App\Models\User;
use App\Models\Movie;

class LibrarySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $user = User::where('email', 'john.doe@example.com')->first();
        $movie = Movie::where('title', 'Inception')->first();

        if ($user && $movie) {
            Library::create([
                'user_id' => $user->id,
                'movie_id' => $movie->id,
                'added_at' => now(),
                'rating' => 5,
                'watch_later' => true,
            ]);
        }        
    }
}
