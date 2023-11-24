<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('products', [\App\Http\Controllers\V1\ProductController::class, 'indexAjax'])->name('products.indexAjax');

Route::get('users', [\App\Http\Controllers\V1\UserController::class, 'indexAjax'])->name('users.indexAjax');
