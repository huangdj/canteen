<?php

namespace App\Http\Controllers\Wechat;

use App\Http\Controllers\Controller;
use App\Models\Bag;
use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Product;

class CartController extends Controller
{
    /***
     * 1. 购物车如果没有东西，就显示空购物车
     * 2. 商品和购物袋是通过扫码加入的
     * 购物车列表
     */
    public function index()
    {
        // 查出当前用户购物车里面的商品信息和总价及件数
        $carts = Cart::with('product.photo')->where('user_id', auth('users')->user()->id)->where('product_id', '<>', null)->get();
        $total_price1 = 0;
        $number1 = 0;
        foreach ($carts as $v) {
            $total_price1 += ($v->product['price'] * 100 * $v->num);  // 遇到小数四舍五入
            $number1 += $v->num;
        }

        $count1 = $total_price1 / 100;

        // 查出当前用户购物车里面的购物袋信息和总价及件数
        $total_price2 = 0;
        $number2 = 0;
        $bags = Cart::with('bag.photo')->where('user_id', auth('users')->user()->id)->where('bag_id', '<>', null)->get();
        foreach ($bags as $bag) {
            $total_price2 += ($bag->bag['price'] * 100 * $bag->num);  // 遇到小数四舍五入
            $number2 += $bag->num;
        }

        $count2 = $total_price2 / 100;

        $total_count['total_price'] = number_format(($count1 + $count2), 2);
        $total_count['num'] = $number1 + $number2;

        return compact('carts', 'bags', 'total_count');
    }

    /***
     * 扫码加入购物车，前端需传商品或购物袋的code条形码
     * @param Request $request
     */
    public function store(Request $request)
    {
        //根据前端传过来的条形码判断购物车是否有当前商品或购物袋,如果有,那么 num +1
        $code = $request->code;
        $product = Product::where('code', $code)->first();
        $bag = Bag::where('code', $code)->first();

        // 如果商品或者购物袋不存在就返回错误信息
        if (!$product && !$bag) {
            return response()->json(['success' => false, 'message' => '商品或购物袋不存在']);
        }

        if ($product) {
            // 当该用户的当前商品已经存在表中，只增加数量
            $cartProduct = Cart::where('user_id', auth('users')->user()->id)->where('product_id', $product->id)->first();
            if ($cartProduct) {
                Cart::where('id', $cartProduct->id)->increment('num');
                return response()->json(['data' => $this->index(), 'success' => true, 'message' => '商品已加入购物车~']);
            }

            // 当该用户的当前商品不存在表中，新增一条数据
            Cart::create([
                'product_id' => $product->id,
                'user_id' => auth('users')->user()->id,
            ]);
            return response()->json(['data' => $this->index(), 'success' => true, 'message' => '商品已加入购物车~']);
        } else {
            $cartBag = Cart::where('user_id', auth('users')->user()->id)->where('bag_id', $bag->id)->first();
            if ($cartBag) {
                Cart::where('bag_id', $cartBag->bag_id)->increment('num');
                return response()->json(['data' => $this->index(), 'success' => true, 'message' => '购物袋已加入购物车~']);
            }

            Cart::create([
                'bag_id' => $bag->id,
                'user_id' => auth('users')->user()->id,
            ]);
            return response()->json(['data' => $this->index(), 'success' => true, 'message' => '购物袋已加入购物车~']);
        }
    }

    /***
     * 商品数量加减
     * 前端需传product_id 和 type 类型过来
     * @param Request $request
     */
    public function change_pnum(Request $request)
    {
        if ($request->type == 'p_inc') {
            Cart::where('product_id', $request->product_id)->increment('num');
            return response()->json(['data' => $this->index(), 'success' => true, 'message' => '更新商品成功~']);
        } else {
            //如果购物车的商品减完了就清空购物车
            $product = Cart::where('user_id', auth('users')->user()->id)->where('product_id', $request->product_id)->first();
            if ($product->num == 1) {
                Cart::destroy($product->id);
                return response()->json(['data' => $this->index(), 'success' => true, 'message' => '更新商品成功~']);
            }
            Cart::where('product_id', $request->product_id)->decrement('num');
            return response()->json(['data' => $this->index(), 'success' => true, 'message' => '更新商品成功~']);
        }
    }

    /***
     * 购物袋数量加减
     * 前端需传bag_id 和 type 类型过来
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function change_bnum(Request $request)
    {
        if ($request->type == 'b_inc') {
            //如果购物车中的该购物袋已经有了，只增加数量
            $bag = Cart::where('user_id', auth('users')->user()->id)->where('bag_id', $request->bag_id)->first();
            if ($bag) {
                Cart::where('bag_id', $bag->bag_id)->increment('num');
                return response()->json(['success' => true, 'msg' => '更新购物袋成功~']);
            }
            return response()->json(['data' => $this->index(), 'success' => true, 'message' => '更新购物袋成功~']);
        } else {
            $bag = Cart::where('user_id', auth('users')->user()->id)->where('bag_id', $request->bag_id)->first();
            //如果购物车的购物袋减完了就清空购物车
            if ($bag->num == 1) {
                Cart::destroy($bag->id);
                return response()->json(['data' => $this->index(), 'success' => true, 'message' => '您没有购物袋哦~']);
            }
            Cart::where('bag_id', $request->bag_id)->decrement('num');
            return response()->json(['data' => $this->index(), 'success' => true, 'message' => '更新购物袋成功~']);
        }
    }
}
