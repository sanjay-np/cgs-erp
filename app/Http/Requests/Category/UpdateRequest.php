<?php

namespace App\Http\Requests\Category;

use App\Traits\ImageUpload;
use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    use ImageUpload;
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255'
            ],
            'image' => [
                'nullable'
            ],
            'description' => [
                'nullable',
                'string'
            ],
            'parent_id' => [
                'nullable'
            ],
            'status' => [
                'required'
            ],
        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }


    public function getRequested(): array
    {
        $requestedItems = array_merge(
            $this->only(keys: [
                'name',
                'description',
                'status',
                'parent_id'
            ]),
            [
                'parent_id' => $this->parent_id
            ]
        );

        $image = $this->getImage();
        if (!$image == null) {
            $requestedItems['image'] = $image;
        }

        return $requestedItems;
    }


    public function getImage(): string | null
    {
        if (!$this->hasFile('image')) {
            return null;
        }
        $file = $this->file('image');
        return $this->uploadImage($file, 'Category');
    }
}
