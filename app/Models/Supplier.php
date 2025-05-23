<?php

namespace App\Models;

use App\Traits\AppendsToggle;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Supplier extends Model
{
    use HasFactory, SoftDeletes, AppendsToggle;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'phone',
        'address',
        'pan',
        'contact_person',
        'brands'
    ];


    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];


    protected $casts = [
        'brands' => 'array'
    ];


    protected $appends = [
        'brand_items'
    ];


    public function getBrandItemsAttribute()
    {
        if ($this->brands) {
            return Brand::whereIn('id', $this->brands)->select(['id', 'name'])->get();
        }
    }


    public function scopeApplyFilter($query, array $params)
    {
        $filterParams = collect($params);

        if ($filterParams->has('qry')) {
            $query->where('name', 'LIKE', "%{$filterParams->get('qry')}%");
        }
    }
}
