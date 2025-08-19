<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Buyer;
use App\Models\Number;
use App\Models\Seller;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display the admin dashboard with statistics and recent activities.
     */
    public function index()
    {
        // Get statistics
        $stats = [
            'buyers' => [
                'total' => Buyer::count(),
                'banned' => Buyer::where('is_banned', true)->count(),
                'active' => Buyer::where('is_banned', false)->count(),
            ],
            'sellers' => [
                'total' => Seller::count(),
                'active' => Seller::where('status', 'active')->count(),
                'pending' => Seller::where('status', 'pending')->count(),
                'suspended' => Seller::where('status', 'suspended')->count(),
            ],
            'numbers' => [
                'total' => Number::count(),
                'in_queue' => Number::where('status', 'in_queue')->count(),
                'accepted' => Number::where('status', 'accepted')->count(),
                'finalized' => Number::where('status', 'finalized')->count(),
            ],
        ];

        // Get recent activities
        $recentBuyers = Buyer::latest()->take(5)->get();
        $recentSellers = Seller::latest()->take(5)->get();
        $recentNumbers = Number::with(['buyer', 'seller'])->latest()->take(5)->get();

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recent' => [
                'buyers' => $recentBuyers,
                'sellers' => $recentSellers,
                'numbers' => $recentNumbers,
            ],
        ]);
    }
}