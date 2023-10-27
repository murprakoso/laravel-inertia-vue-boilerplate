<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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
        $user = $this->route('user');

        $name = 'required|string|max:30';
        if ($this->method() == 'PUT') {
            $email = 'required|string|email|max:255|unique:users,email,' . $user->id;
            $password = 'confirmed';
        } else {
            $email = 'required|string|email|max:255|unique:users';
            $password = 'required|min:6|confirmed';
        }

        return [
            'name' => $name,
            'email' => $email,
            'password' => $password
        ];
    }
}
