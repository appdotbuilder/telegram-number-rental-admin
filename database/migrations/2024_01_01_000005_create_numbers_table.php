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
        Schema::create('numbers', function (Blueprint $table) {
            $table->id();
            $table->string('number')->unique();
            $table->enum('type', ['mobile', 'landline', 'voip'])->default('mobile');
            $table->string('country', 2);
            $table->enum('status', ['in_queue', 'accepted', 'finalized', 'returned_to_queue'])->default('in_queue');
            $table->foreignId('buyer_id')->nullable()->constrained('buyers')->onDelete('set null');
            $table->foreignId('seller_id')->nullable()->constrained('sellers')->onDelete('set null');
            $table->boolean('bypass_the_queue')->default(false);
            $table->boolean('prefer_fast_queue')->default(false);
            $table->timestamp('accepted_at')->nullable();
            $table->timestamp('finalized_at')->nullable();
            $table->timestamps();
            
            // Add indexes for performance
            $table->index('number');
            $table->index('type');
            $table->index('country');
            $table->index('status');
            $table->index('buyer_id');
            $table->index('seller_id');
            $table->index(['status', 'created_at']);
            $table->index(['bypass_the_queue', 'prefer_fast_queue']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('numbers');
    }
};