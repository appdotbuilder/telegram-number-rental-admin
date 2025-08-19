<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBuyerRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'is_banned' => 'boolean',
            'ban_reason' => 'nullable|string',
            'mode' => 'nullable|string|max:255',
            'branches_chat_id' => 'nullable|string|max:255',
            'max_numbers_per_branch' => 'integer|min:1|max:1000',
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
            'name.required' => 'Buyer name is required.',
            'max_numbers_per_branch.min' => 'Maximum numbers per branch must be at least 1.',
            'max_numbers_per_branch.max' => 'Maximum numbers per branch cannot exceed 1000.',
        ];
    }
}