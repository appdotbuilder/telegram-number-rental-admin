<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreNumberRequest;
use App\Http\Requests\UpdateNumberRequest;
use App\Models\Buyer;
use App\Models\Number;
use App\Models\Seller;
use Inertia\Inertia;

class NumberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $numbers = Number::with(['buyer', 'seller'])
            ->latest()
            ->paginate(15);
        
        return Inertia::render('numbers/index', [
            'numbers' => $numbers
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $buyers = Buyer::select('id', 'name')->get();
        $sellers = Seller::select('id', 'name')->get();

        return Inertia::render('numbers/create', [
            'buyers' => $buyers,
            'sellers' => $sellers,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreNumberRequest $request)
    {
        $number = Number::create($request->validated());

        return redirect()->route('numbers.show', $number)
            ->with('success', 'Number created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Number $number)
    {
        $number->load(['buyer', 'seller']);

        return Inertia::render('numbers/show', [
            'number' => $number
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Number $number)
    {
        $buyers = Buyer::select('id', 'name')->get();
        $sellers = Seller::select('id', 'name')->get();

        return Inertia::render('numbers/edit', [
            'number' => $number,
            'buyers' => $buyers,
            'sellers' => $sellers,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNumberRequest $request, Number $number)
    {
        $number->update($request->validated());

        return redirect()->route('numbers.show', $number)
            ->with('success', 'Number updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Number $number)
    {
        $number->delete();

        return redirect()->route('numbers.index')
            ->with('success', 'Number deleted successfully.');
    }
}