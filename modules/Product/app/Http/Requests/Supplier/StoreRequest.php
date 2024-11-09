<?php

namespace Modules\Product\Http\Requests\Supplier;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['string', 'max:10'],
        ];
    }

    public function getValidated(): array
    {
        return $this->only(keys: [
            'name',
            'phone',
            'address',
            'pan',
            'contact_person',
            'brands',
        ]);
    }
}
