<?php

Route::group(['middleware' => ['auth:api']], function () {

    Route::group(['prefix' => 'user'], function () {
        Route::post('delete/{id}','Api\UsersController@destroy');
        Route::post('/details', 'Api\UsersController@getUserDetails');
        Route::post('/change-password','Api\UsersController@changePassword');
        Route::get('/', 'Api\UsersController@index');
        Route::post('/', 'Api\UsersController@store');
        Route::get('/{user}', 'Api\UsersController@show');
        Route::post('/{user}', 'Api\UsersController@update');
    });

    Route::post('expense/{id}','Api\ExpenseController@update');
    Route::post('expense/delete/{id}','Api\ExpenseController@destroy');
    Route::resource('expense', 'Api\ExpenseController')->only(['show','store']);
    
    Route::post('categories/{id}','Api\CategoriesController@update');
    Route::post('categories/delete/{id}','Api\CategoriesController@destroy');
    Route::resource('categories', 'Api\CategoriesController');
});

Route::post('/login','AuthController@login');