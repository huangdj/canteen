<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['code', 'name', 'photo_id', 'price', 'stock', 'body', 'onsale'];

    public function photo()
    {
        return $this->belongsTo(Photo::class);
    }
}
