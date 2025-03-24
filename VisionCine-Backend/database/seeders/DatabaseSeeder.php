<?php

namespace Database\Seeders;

use App\Models\Favorite;
use App\Models\Review;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        $this->call([
            UserSeeder::class,
            GenreSeeder::class,
            MovieSeeder::class,
            MovieGenreSeeder::class,
            FavoriteSeeder::class,
            LibrarySeeder::class,
            ReviewSeeder::class
        ]);
    }
    
    
}
