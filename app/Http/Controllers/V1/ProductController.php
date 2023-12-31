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
        $perPage = $this->perPage;
        $limit = $request->get('results', $perPage);

        $query = Product::query();

        // Apply search if 'search' parameter is present
        $searchTerm = $request->get('search');
        if ($searchTerm) {
            $query->search($searchTerm);
        }

        // Apply sorting if 'sortField' and 'sortOrder' parameters are present
        if ($request->has(['sortField', 'sortOrder'])) {
            $sortField = $request->get('sortField');
            $sortOrder = $request->get('sortOrder');
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
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|min:3',
            'price' => 'required|numeric',
        ]);

        $product = Product::create([
            'name' => $request->input('name'),
            'price' => $request->input('price')
        ]);

        return response()->json([
            'type' => 'success',
            'message' => 'Data berhasil ditambahkan.',
            'data' => $product,
        ]);
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
            'formMode' => 'UPDATE'
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product): JsonResponse
    {
        $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
        ]);

        $product->update([
            'name' => $request->input('name'),
            'price' => $request->input('price')
        ]);

        return response()->json([
            'type' => 'success',
            'message' => 'Data berhasil diperbarui.',
            'data' => $product,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        try {
            $product->delete();

            return response()->json(['type' => 'success', 'message' => 'Data berhasil dihapus.']);
        } catch (\Throwable $th) {
            return response()->json(['type' => 'error', 'message' => 'Terjadi kesalahan saat menghapus users. ' . $th->getMessage()]);
        }
    }
}
