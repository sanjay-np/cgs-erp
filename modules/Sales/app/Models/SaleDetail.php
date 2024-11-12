<?php

namespace Modules\Sales\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Modules\Sales\Database\Factories\SaleDetailFactory;

class SaleDetail extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'sale_id',
        'product_id',
        'qty',
        'unit_price',
        'sale_price',
        'sub_total',
    ];

    // protected static function newFactory(): SaleDetailFactory
    // {
    //     // return SaleDetailFactory::new();
    // }
}
