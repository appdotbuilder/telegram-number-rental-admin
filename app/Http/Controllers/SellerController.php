<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSellerRequest;
use App\Http\Requests\UpdateSellerRequest;
use App\Models\Seller;
use Inertia\Inertia;

class SellerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sellers = Seller::with('numbers')
            ->withCount('numbers')
            ->latest()
            ->paginate(15);
        
        return Inertia::render('sellers/index', [
            'sellers' => $sellers
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('sellers/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSellerRequest $request)
    {
        $seller = Seller::create($request->validated());

        return redirect()->route('sellers.show', $seller)
            ->with('success', 'Seller created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Seller $seller)
    {
        $seller->load(['numbers' => function ($query) {
            $query->latest()->take(10);
        }]);

        return Inertia::render('sellers/show', [
            'seller' => $seller
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Seller $seller)
    {
        return Inertia::render('sellers/edit', [
            'seller' => $seller
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSellerRequest $request, Seller $seller)
    {
        $seller->update($request->validated());

        return redirect()->route('sellers.show', $seller)
            ->with('success', 'Seller updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Seller $seller)
    {
        $seller->delete();

        return redirect()->route('sellers.index')
            ->with('success', 'Seller deleted successfully.');
    }
}