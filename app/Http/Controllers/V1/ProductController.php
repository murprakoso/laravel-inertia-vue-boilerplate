<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    private $perPage = 10;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('Product/ProductIndex/ProductIndex', [
            'status' => session('status'),
        ]);
    }

    public function indexAjax(Request $request): JsonResponse
    {
        $limit = $request->get('results') ? $request->get('results') : $this->perPage;

        $query = $request->get('search')
            ? Product::latest()->search($request->get('search'))
            : Product::latest();

        // Sorting
        if ($request->has('sortField') && $request->has('sortOrder')) {
            $sortField = $request->get('sortField');
            $sortOrder = $request->get('sortOrder');
//            $sortOrder = $request->get('sortOrder') === 'ascend' ? 'asc' : 'desc';

            $query->orderBy($sortField, $sortOrder);
        }

        $products = $query->paginate($limit);

        $products->appends([
            'search' => $request->get('search'),
            'sortField' => $request->get('sortField'),
            'sortOrder' => $request->get('sortOrder'),
            'results' => $limit,
        ]);

        return response()->json($products);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Product/ProductForm/ProductForm', [
            'status' => session('status'),
            'formMode' => 'CREATE'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
        ]);

        Product::insert([
            'name' => $request->input('name'),
            'price' => $request->input('price')
        ]);

        session()->flash('status', ['type' => 'success', 'message' => 'Data berhasil ditambahkan.']);
        return redirect()->route('products.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product): Response
    {
        return Inertia::render('Product/ProductForm/ProductForm', [
            'status' => session('status'),
            'product' => $product,
            'formMode' => 'EDIT'
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
        ]);

        $product->update([
            'name' => $request->input('name'),
            'price' => $request->input('price')
        ]);

        session()->flash('status', ['type' => 'success', 'message' => 'Data berhasil diperbarui.']);
        return redirect()->route('products.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
