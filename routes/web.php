<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\BuyerController;
use App\Http\Controllers\NumberController;
use App\Http\Controllers\SellerController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Admin Dashboard
    Route::get('dashboard', [AdminController::class, 'index'])->name('dashboard');
    
    // Resource routes for managing entities
    Route::resource('buyers', BuyerController::class);
    Route::resource('sellers', SellerController::class);
    Route::resource('numbers', NumberController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
