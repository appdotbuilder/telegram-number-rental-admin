<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBuyerRequest;
use App\Http\Requests\UpdateBuyerRequest;
use App\Models\Buyer;
use Inertia\Inertia;

class BuyerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $buyers = Buyer::with('numbers')
            ->withCount('numbers')
            ->latest()
            ->paginate(15);
        
        return Inertia::render('buyers/index', [
            'buyers' => $buyers
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('buyers/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBuyerRequest $request)
    {
        $buyer = Buyer::create($request->validated());

        return redirect()->route('buyers.show', $buyer)
            ->with('success', 'Buyer created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Buyer $buyer)
    {
        $buyer->load(['numbers' => function ($query) {
            $query->latest()->take(10);
        }]);

        return Inertia::render('buyers/show', [
            'buyer' => $buyer
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Buyer $buyer)
    {
        return Inertia::render('buyers/edit', [
            'buyer' => $buyer
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBuyerRequest $request, Buyer $buyer)
    {
        $buyer->update($request->validated());

        return redirect()->route('buyers.show', $buyer)
            ->with('success', 'Buyer updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Buyer $buyer)
    {
        $buyer->delete();

        return redirect()->route('buyers.index')
            ->with('success', 'Buyer deleted successfully.');
    }
}