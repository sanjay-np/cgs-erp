<?php

namespace Modules\Customer\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Customer\Database\Factories\CustomerFactory;

class Customer extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'code',
        'phone',
        'whatsapp',
        'address',
        'avatar',
        'status'
    ];

    protected $appends = ['avatar_url'];

    public function getAvatarUrlAttribute()
    {
        if ($this->avatar) {
            return asset($this->avatar);
        }
        return null;
    }

    public static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $number = Customer::max('id') + 1;
            $model->code = make_reference_id('CUS', $number);
        });
    }

    protected static function newFactory(){
        return CustomerFactory::new();
    }
}
