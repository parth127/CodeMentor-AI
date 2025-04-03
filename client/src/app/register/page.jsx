"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: null });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccess(null);

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            setSuccess("User registered successfully!");
            setFormData({ name: '', email: '', password: '' });
        } else {
            const errorData = await response.json();
            const fieldErrors = {};

            // Check the type of error
            if (errorData.type === 'ZodError') {
                // Handle Zod validation errors
                errorData.errors.forEach(error => {
                    fieldErrors[error.path[0]] = error.message;
                });
            } else if (errorData.type === 'PythonError') {
                // Handle Python server errors
                fieldErrors.general = errorData.errors.detail || "An error occurred during registration.";
            } else {
                // Handle any other unexpected errors
                fieldErrors.general = "An unexpected error occurred.";
            }

            setErrors(fieldErrors);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#020D07]">
            <Link href="/">
                <div className="flex items-center gap-1 mb-8">
                    <div className="w-8 h-8">
                        <Image 
                            src="/images/logo-icon.svg" 
                            alt="CodeMentor AI Logo" 
                            width={32} 
                            height={32}
                        />
                    </div>
                    <h1 className="text-[28px] font-bold text-[#60AC84] font-sans leading-none tracking-tighter">CodeMentor AI</h1>
                </div>
            </Link>
            <h1 className="text-[48px] font-semibold text-white mb-8">Create an Account</h1>
            <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`p-2 w-full rounded border ${errors.name ? 'border-red-500' : 'border-gray-300'} text-white`}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`p-2 w-full rounded border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-white`}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`p-2 w-full rounded border ${errors.password ? 'border-red-500' : 'border-gray-300'} text-white`}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
                {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}
                <button type="submit" className="bg-[#14AE5C] px-4 py-2 rounded text-white cursor-pointer">
                    Register
                </button>
            </form>
            {success && <p className="mt-4 text-green-500">{success}</p>}
            <p className="mt-4 text-white">
                Already have an account? <Link href="/Login" className="text-[#60AC84]">Log in</Link>
            </p>
        </div>
    );
};

export default Register;
