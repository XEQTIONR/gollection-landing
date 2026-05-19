<?php

use Illuminate\Support\Facades\Route;
use App\Data\Method;

Route::inertia('/', 'welcome')->name('home');

Route::inertia('/docs', 'docs', [ 'methods' => resolve(Method::class) ])->name('docs');
