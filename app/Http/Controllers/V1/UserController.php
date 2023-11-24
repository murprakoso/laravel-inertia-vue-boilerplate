<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    protected $perPage = 10;

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('User/UserIndex/UserIndex');
    }

    public function indexAjax(Request $request): JsonResponse
    {
        $perPage = $this->perPage;
        $limit = $request->get('results', $perPage);

        $query = User::query();

        // Apply search if 'search' parameter is present
        $searchTerm = $request->get('search');
        if ($searchTerm) {
            $query->search($searchTerm);
        }

        // Always order by 'id' in descending order
        $query->orderBy('id', 'desc');
        // Apply sorting if 'sortField' and 'sortOrder' parameters are present
        if ($request->has(['sortField', 'sortOrder'])) {
            $sortField = $request->get('sortField');
            $sortOrder = $request->get('sortOrder');
            $query->orderBy($sortField, $sortOrder);
        }

        $users = $query->paginate($limit);

        $users->appends([
            'search' => $request->get('search'),
            'sortField' => $request->get('sortField'),
            'sortOrder' => $request->get('sortOrder'),
            'results' => $limit,
        ]);

        return response()->json($users);
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
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
