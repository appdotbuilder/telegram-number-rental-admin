<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSellerRequest extends FormRequest
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
            'status' => ['required', Rule::in(['active', 'inactive', 'pending', 'suspended'])],
            'project_id' => 'nullable|string|max:255',
            'referrer' => 'nullable|string|max:255',
            'invite_code' => 'nullable|string|max:255',
            'onboarding_completed' => 'boolean',
            'onboarding_completed_at' => 'nullable|date',
            'onboarding_data' => 'nullable|array',
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
            'name.required' => 'Seller name is required.',
            'status.required' => 'Seller status is required.',
            'status.in' => 'Invalid seller status selected.',
        ];
    }
}