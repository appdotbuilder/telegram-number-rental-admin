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
        Schema::create('sellers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('status', ['active', 'inactive', 'pending', 'suspended'])->default('pending');
            $table->string('project_id')->nullable();
            $table->string('referrer')->nullable();
            $table->string('invite_code')->nullable();
            $table->boolean('onboarding_completed')->default(false);
            $table->timestamp('onboarding_completed_at')->nullable();
            $table->json('onboarding_data')->nullable();
            $table->timestamps();
            
            // Add indexes for performance
            $table->index('name');
            $table->index('status');
            $table->index('project_id');
            $table->index(['status', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sellers');
    }
};