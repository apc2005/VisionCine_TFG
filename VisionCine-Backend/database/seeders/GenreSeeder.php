<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Genre;

class GenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Genre::create(['name' => 'Sci-Fi']);
        Genre::create(['name' => 'Action']);
        Genre::create(['name' => 'Drama']);
        Genre::create(['name' => 'Comedy']);
        Genre::create(['name' => 'Horror']);
        Genre::create(['name' => 'Romance']);
        Genre::create(['name' => 'Thriller']);
        Genre::create(['name' => 'Adventure']);
        Genre::create(['name' => 'Fantasy']);
        Genre::create(['name' => 'Mystery']);
        Genre::create(['name' => 'Animation']);
        Genre::create(['name' => 'Crime']);
        Genre::create(['name' => 'Documentary']);
        Genre::create(['name' => 'Musical']);
        Genre::create(['name' => 'Family']);
        Genre::create(['name' => 'History']);
        Genre::create(['name' => 'War']);
        Genre::create(['name' => 'Western']);
    }
}
