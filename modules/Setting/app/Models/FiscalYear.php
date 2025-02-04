<?php

namespace Modules\Setting\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Cache;

// use Modules\Setting\Database\Factories\FiscalYearFactory;

class FiscalYear extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = ['label', 'is_current'];

    protected $casts = [
        'is_current' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (static::count() === 0) {
                $model->is_current = true;
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
            Cache::forget('current_fiscal_year');
        });
    }

    // protected static function newFactory(): FiscalYearFactory
    // {
    //     // return FiscalYearFactory::new();
    // }
}
