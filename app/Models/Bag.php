<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bag extends Model
{
    protected $fillable = ['name', 'price', 'photo_id'];

    public function photo()
    {
        return $this->belongsTo('App\Models\Photo', 'photo_id');
    }
}
