<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    // 用常量的方式定义支持的优惠券类型
    const TYPE_FIXED = 'fixed';  // 固定金额
    const TYPE_PERCENT = 'percent';  // 百分比折扣

    public static $typeMap = [
        self::TYPE_FIXED   => '固定金额',
        self::TYPE_PERCENT => '比例',
    ];

    protected $fillable = [
        'title',
        'photo_id',
        'type',
        'value',
        'total',
        'used',
        'min_amount',
        'description',
        'started_at',
        'ended_at',
        'enabled',
        'detail',
    ];

    protected $casts = [
        'enabled' => 'boolean',
    ];

    // 指明这两个字段是日期类型
    protected $dates = ['started_at', 'ended_at'];

    public function photo()
    {
        return $this->belongsTo(Photo::class);
    }

    public function users()
    {
        return $this->belongsToMany('App\User');
    }
}
