<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

/***
 * 后台路由
 */
Route::prefix('admin')->namespace('Admin')->group(function () {
    Route::get('login', 'LoginController@showLoginForm')->name('admin.login');
    Route::post('login', 'LoginController@login');
    Route::post('logout', 'LoginController@logout')->name('admin.logout');

    Route::resource('photos', 'PhotoController')->only('store'); // 上传图片--普通方法
    Route::get('uploadToken', 'PhotoController@uploadToken'); // 上传图片--接口方法

    Route::middleware('auth.admin:admin')->name('admin.')->group(function () {
        Route::get('/', 'DashboardController@index')->name('index'); // 后台首页

        Route::prefix('bags')->group(function () {
            Route::patch('change_price', 'BagController@change_price')->name('bags.change_price'); //改变价格
        });
        Route::resource('bags', 'BagController')->except('edit', 'create');  // 购物袋

        Route::prefix('products')->group(function () {
            Route::patch('is_onsale', 'ProductController@is_onsale')->name('products.is_onsale'); //是否上架
            Route::patch('change_stock', 'ProductController@change_stock')->name('products.change_stock'); //改变库存
            Route::delete('destroy_checked', 'ProductController@destroy_checked')->name('products.destroy_checked'); //多选删除
        });
        Route::resource('products', 'ProductController')->except('edit', 'create');  // 商品管理

        Route::resource('coupons', 'CouponController')->except('edit', 'create');  // 优惠券

    });
});

