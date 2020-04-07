<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $fillable = ['product_id', 'user_id', 'bag_id', 'num'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function bag()
    {
        return $this->belongsTo(Bag::class);
    }
}
