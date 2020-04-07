<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::with('photo')->orderBy('created_at', 'desc')->paginate(2);

        return response()->json(['success' => true, 'message' => '查询成功', 'products' => $products]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $product = Product::create($request->all());
        return response()->json(['success' => true, 'message' => '新增成功', 'product' => $product]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json(['success' => true, 'message' => '查询成功', 'product' => Product::with('photo')->find($id)]);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        Product::where('id', $id)->update($request->only('name', 'code', 'price', 'photo_id', 'stock', 'body', 'onsale'));
        return response()->json(['success' => true, 'message' => '编辑成功']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Product::destroy($id);
    }

    /***
     * 是否上架
     * @param Request $request
     */
    public function is_onsale(Request $request)
    {
        $product = Product::find($request->id);
        $product->onsale = !$request->onsale;
        $product->save();
    }

    /***
     * 多选删除
     * @param Request $request
     */
    public function destroy_checked(Request $request)
    {
        Product::destroy($request->checked_id);
    }

    /***
     * 改变库存
     * @param Request $request
     */
    public function change_stock(Request $request)
    {
        $product = Product::find($request->id);
        $product->stock = $request->stock;
        $product->save();
    }
}
