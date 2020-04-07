<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Photo;
use Illuminate\Http\Request;
use Qiniu\Auth;

class PhotoController extends Controller
{
    /***
     * 上传图片
     * @param Request $request
     */
    public function store(Request $request)
    {
        $path = $request->file->store("public/images"); // 保存图片路径

        // 上传到七牛
        $file_path = storage_path('app/') . $path;
        qiniu_upload($file_path);

        // 插入图片到 photos 表
        $photo = Photo::create(['image' => env('Qiniu_Url') . basename($file_path)]);

        return ['success' => true, 'photo_id' => $photo->id, 'image' => $photo->image];
    }

    /***
     * 上传图片---接口
     * 用于商品管理上传图片
     */
    public function uploadToken()
    {
        $bucket = env('Qiniu_Bucket');
        $accessKey = env('Qiniu_Key');
        $secretKey = env('Qiniu_Secret');
        $auth = new Auth($accessKey, $secretKey);
        $upToken = $auth->uploadToken($bucket);
        return response()->json(['token' => $upToken]);
    }


}
