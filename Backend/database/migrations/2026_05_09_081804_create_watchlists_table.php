<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('watchlists', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->integer('movie_id');
            $table->string('title');
            $table->string('genre')->nullable();
            $table->string('rating')->nullable();
            $table->string('year')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
            $table->unique(['user_id', 'movie_id']);
        });
    }

    public function down(): void {
        Schema::dropIfExists('watchlists');
    }
};