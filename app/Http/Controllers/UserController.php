<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class UserController extends Controller
{
    private $perPage = 10;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $limit = $request->get('results') ? $request->get('results') : $this->perPage;
        $users = $request->get('search')
            ? User::latest()->search($request->get('search'))->paginate($limit)
            : User::latest()->paginate($limit);

        $users->appends(['search' => $request->get('search')]);

        return Inertia::render('User/Index', [
            'users' => $users,
            'status' => session('status'),
        ]);
    }

    public function table()
    {
        $users = User::paginate(10);
        return response()->json($users);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('User/Create', [
            'status' => session('status'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        $validator = Validator::make($request->all(), $request->rules());
        if ($validator->fails()) {
            return response()->json($validator->messages(), 422);
        }

        try {
            DB::transaction(function () use ($request) {
                User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => bcrypt($request->password),
                ]);
            });

            session()->flash('status', ['type' => 'success', 'message' => 'Data berhasil ditambahkan.']);

            return redirect()->route('users.index');
        } catch (\Throwable $th) {
            session()->flash('status', ['type' => 'error', 'message' => 'Terjadi kesalahan saat menambah users. ' . $th->getMessage()]);
            return redirect()->back()->withInput($request->all());
//            return redirect()->route('users.index');
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
    public function edit(User $user)
    {
        return Inertia::render('User/Edit', [
            'status' => session('status'),
            'user' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, User $user)
    {
        $validator = Validator::make($request->all(), $request->rules());
        if ($validator->fails()) {
//            return response()->json($validator->messages(), 422);
            return redirect()->back()->withInput($request->all())->withErrors($validator);
        }

        try {
            DB::transaction(function () use ($request, $user) {
                $user->update([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => bcrypt($request->password),
                ]);
            });

            session()->flash('status', ['type' => 'success', 'message' => 'Data berhasil diperbarui.']);

            return redirect()->route('users.index');
        } catch (\Throwable $th) {
            session()->flash('status', ['type' => 'error', 'message' => 'Terjadi kesalahan saat memperbarui users. ' . $th->getMessage()]);
            return redirect()->back()->withInput($request->all());
//            return redirect()->route('users.index');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        try {
            DB::transaction(function () use ($user) {
                $user->delete();
            });

            session()->flash('status', ['type' => 'success', 'message' => 'Data berhasil dihapus.']);

            return redirect()->back();
        } catch (\Throwable $th) {
            session()->flash('status', ['type' => 'error', 'message' => 'Terjadi kesalahan saat menghapus users. ' . $th->getMessage()]);
            return redirect()->back();
        }
    }
}
