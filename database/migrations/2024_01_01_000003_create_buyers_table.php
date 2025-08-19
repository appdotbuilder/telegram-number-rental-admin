<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('buyers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->boolean('is_banned')->default(false);
            $table->text('ban_reason')->nullable();
            $table->string('mode')->nullable();
            $table->string('branches_chat_id')->nullable();
            $table->integer('max_numbers_per_branch')->default(10);
            $table->timestamps();
            
            // Add indexes for performance
            $table->index('name');
            $table->index('is_banned');
            $table->index(['is_banned', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('buyers');
    }
};