<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    private $perPage = 10;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $limit = $request->get('results') ? $request->get('results') : $this->perPage;
        $products = $request->get('search')
            ? Product::latest()->search($request->get('search'))->paginate($limit)
            : Product::latest()->paginate($limit);

        $products->appends(['search' => $request->get('search')]);
//        dd($products);
        return Inertia::render('Product/ProductIndex/ProductIndex', [
            'products' => $products->withQueryString(),
            'status' => session('status'),
        ]);

//        return Inertia::render('Product/ProductIndex/ProductIndex',
//            [
//                'products' => [
//                    [
//                        'id' => 1,
//                        'name' => 'Product 1',
//                        'price' => 100,
//                        'quantity' => 10,
//                    ],
//                    [
//                        'id' => 2,
//                        'name' => 'Product 2',
//                        'price' => 200,
//                        'quantity' => 20,
//                    ],
//                    [
//                        'id' => 3,
//                        'name' => 'Product 3',
//                        'price' => 300,
//                        'quantity' => 30,
//                    ],
//                ]
//            ]
//        );
    }

    public function indexAjax(Request $request)
    {
        $limit = $request->get('results') ? $request->get('results') : $this->perPage;
        $products = $request->get('search')
            ? Product::latest()->search($request->get('search'))->paginate($limit)
            : Product::latest()->paginate($limit);

        $products->appends(['search' => $request->get('search')]);

        return response()->json($products);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
