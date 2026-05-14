<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Data\Method;

Route::inertia('/', 'dashboard')->name('home');

Route::inertia('/docs', 'docs', [ 'methods' => resolve(Method::class) ])->name('docs');
// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::inertia('dashboard', 'dashboard')->name('dashboard');
// });

require __DIR__.'/settings.php';
