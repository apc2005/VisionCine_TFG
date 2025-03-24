<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Movie;

class MovieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Movie::create([
            'title' => 'Inception',
            'synopsis' => 'A skilled thief is given a chance to have his criminal record erased if he can successfully perform an inception.',
            'year' => 2010,
            'poster_url' => 'https://example.com/inception.jpg',
        ]);

        Movie::create([
            'title' => 'The Matrix',
            'synopsis' => 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
            'year' => 1999,
            'poster_url' => 'https://example.com/matrix.jpg',
        ]);
    }
}
