<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateNumberRequest extends FormRequest
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
            'number' => [
                'required',
                'string',
                'max:255',
                Rule::unique('numbers')->ignore($this->route('number')->id),
            ],
            'type' => ['required', Rule::in(['mobile', 'landline', 'voip'])],
            'country' => 'required|string|size:2',
            'status' => ['required', Rule::in(['in_queue', 'accepted', 'finalized', 'returned_to_queue'])],
            'buyer_id' => 'nullable|exists:buyers,id',
            'seller_id' => 'nullable|exists:sellers,id',
            'bypass_the_queue' => 'boolean',
            'prefer_fast_queue' => 'boolean',
            'accepted_at' => 'nullable|date',
            'finalized_at' => 'nullable|date|after:accepted_at',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'number.required' => 'Phone number is required.',
            'number.unique' => 'This phone number already exists.',
            'type.required' => 'Number type is required.',
            'type.in' => 'Invalid number type selected.',
            'country.required' => 'Country code is required.',
            'country.size' => 'Country code must be exactly 2 characters.',
            'status.required' => 'Status is required.',
            'status.in' => 'Invalid status selected.',
            'finalized_at.after' => 'Finalized date must be after accepted date.',
        ];
    }
}