<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
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
    public function create(): Response
    {
        return Inertia::render('User/UserForm/UserForm', [
            'formMode' => 'CREATE'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request): JsonResponse
    {
        $validator = Validator::make($request->all(), $request->rules());
        if ($validator->fails()) {
            return response()->json($validator->messages(), 422);
        }

        try {
            $user = DB::transaction(function () use ($request) {
                User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => bcrypt($request->password),
                ]);
            });

            return response()->json([
                'type' => 'success',
                'message' => 'Data berhasil ditambahkan.',
                'data' => $user,
            ]);
        } catch (\Throwable $th) {
            return response()->json($th->getMessage(), 500);
        }
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
    public function edit(User $user): Response
    {
        return Inertia::render('User/UserForm/UserForm', [
            'user' => $user,
            'formMode' => 'UPDATE'
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, User $user): JsonResponse
    {
        $validator = Validator::make($request->all(), $request->rules());
        if ($validator->fails()) {
            return response()->json($validator->messages(), 422);
        }

        try {
            $updatedUser = DB::transaction(function () use ($request, $user) {
                $user->update([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => bcrypt($request->password),
                ]);
            });

            return response()->json([
                'type' => 'success',
                'message' => 'Data berhasil diperbarui.',
                'data' => $updatedUser,
            ]);
        } catch (\Throwable $th) {
            return response()->json($th->getMessage(), 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): JsonResponse
    {
        try {
            $user->delete();

            return response()->json(['type' => 'success', 'message' => 'Data berhasil dihapus.']);
        } catch (\Throwable $th) {
            return response()->json($th->getMessage(), 500);
        }
    }
}
