<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\StateController;
use App\Http\Controllers\FormDataController;
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
Route::get('/countries',[CountryController::class,'index']);
Route::get('/regions/{country_id}',[StateController::class,'index']);
// Route::get('/getstate',[loginController::class,'getstate']);
Route::post('/saveFormData', [FormDataController::class, 'saveFormData']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
