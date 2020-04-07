<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/***
 * 前端小程序接口路由
 */
Route::namespace('Wechat')->group(function () {
    Route::middleware('auth:users')->group(function () {
        Route::get('/', 'HomeController@index'); //首页接口

        Route::prefix('carts')->group(function () {
            Route::post('/', 'CartController@store'); // 加入购物车
            Route::get('/', 'CartController@index'); // 购物车列表
            Route::patch('/', 'CartController@change_pnum'); // 改变商品数量
            Route::patch('change_bnum', 'CartController@change_bnum'); // 改变购物袋数量
        });
    });

    /***
     * 小程序用户认证接口路由
     */
    Route::any('/auth', 'MiniController@auth');
});


