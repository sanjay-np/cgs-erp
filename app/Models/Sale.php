<?php

namespace App\Models;

use App\Traits\CurrentFiscalYear;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sale extends Model
{
    use HasFactory, SoftDeletes, CurrentFiscalYear;

    protected $fillable = [
        'date',
        'reference',
        'customer_id',
        'fiscal_year_id',
        'tax_percentage',
        'tax_amount',
        'discount_amount',
        'shipping_amount',
        'total_amount',
        'paid_amount',
        'due_amount',
        'status',
        'payment_status',
        'payment_method',
        'note',
    ];

    public static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $number = Sale::max('id') + 1;
            $model->reference = make_reference_id('SALE', $number);
            $model->fiscal_year_id = $model->getCurrentFY();
        });
    }
}
