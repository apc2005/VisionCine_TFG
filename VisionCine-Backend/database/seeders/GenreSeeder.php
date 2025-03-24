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
    }
}
