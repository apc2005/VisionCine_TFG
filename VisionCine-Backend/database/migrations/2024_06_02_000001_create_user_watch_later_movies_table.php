<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserWatchLaterMoviesTable extends Migration
{
    public function up()
    {
        Schema::create('user_watch_later_movies', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('movie_id');
            $table->timestamps();

            $table->unique(['user_id', 'movie_id']);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_watch_later_movies');
    }
}
