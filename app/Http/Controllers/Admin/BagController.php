<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Bag;

class BagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $where = function ($query) use ($request) {
            if ($request->has('keyword') and $request->keyword != '') {
                $search = "%" . $request->keyword . "%";
                $query->where('name', 'like', $search);
            }
        };
        $bags = Bag::with('photo')->where($where)->get();
        return response()->json(['success' => true, 'message' => '查询成功', 'bags' => $bags]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $bag = Bag::create($request->all());
        return response()->json(['success' => true, 'message' => '新增成功', 'bag' => $bag]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $bag = Bag::with('photo')->find($id);
        return response()->json(['success' => true, 'message' => '查询成功', 'bag' => $bag]);
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
        $bag = Bag::where('id', $id)->update($request->only('name', 'price', 'photo_id'));
        return response()->json(['success' => true, 'message' => '更新成功', 'bag' => $bag]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Bag::destroy($id);
        return response()->json(['success' => true, 'message' => '删除成功']);
    }

    /***
     * 改变价格
     * @param Request $request
     */
    public function change_price(Request $request)
    {
        $bag = Bag::find($request->id);
        $bag->price = $request->price;
        $bag->save();
    }
}
