<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Cache;

class Currency extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'label',
        'is_current'
    ];

    protected $casts = [
        'is_current' => 'boolean',
    ];


    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];


    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (static::count() === 0) {
                $model->is_current = true;
            } else {
                if ($model->is_current) {
                    static::where('is_current', true)
                        ->where('id', '!=', $model->id)
                        ->update(['is_current' => false]);
                }
            }
        });

        static::updating(function ($model) {
            if ($model->is_current) {
                static::where('id', '!=', $model->id)
                    ->update(['is_current' => false]);
            }
        });
    }


    protected static function booted()
    {
        static::updated(function ($model) {
            Cache::forget('current_currency');
        });
    }
}
