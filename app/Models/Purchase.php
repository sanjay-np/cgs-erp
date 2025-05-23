<?php

namespace App\Models;

use App\Helpers\Helpers;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Purchase extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'date',
        'reference',
        'supplier_id',
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


    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];


    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }


    public function details()
    {
        return $this->hasMany(PurchaseDetail::class);
    }


    public function payments()
    {
        return $this->hasMany(PurchasePayment::class);
    }


    public static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $number = Purchase::max('id') + 1;
            $model->reference = Helpers::makeReferenceId('PUR', $number);
        });
    }
}
