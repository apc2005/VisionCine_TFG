<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Movie;
use App\Models\Genre;

class MovieGenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $movie1 = Movie::where('title', 'Inception')->first();
        $movie2 = Movie::where('title', 'The Matrix')->first();
        
        $sciFi = Genre::where('name', 'Sci-Fi')->first();
        $action = Genre::where('name', 'Action')->first();
        
        $movie1->genres()->attach([$sciFi->id, $action->id]);
        $movie2->genres()->attach([$sciFi->id, $action->id]);
    }
}
