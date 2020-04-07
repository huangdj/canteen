<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
//        dd('后台首页，当前管理员：' . auth('admin')->user()->name);
        return view('admin.home');
    }
}
