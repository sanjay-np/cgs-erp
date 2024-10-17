<?php

namespace App\Http\Requests\Customer;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
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
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
        ];
    }
    public function getValues(): array
    {
        $data = $this->only(keys: [
            'name',
            'phone',
            'whatsapp',
            'address',
            'status'
        ]);
        return $data;
    }

    public function getAvatar(): array | null
    {
        return $this->file('avatar');
    }
}
