import { z } from 'zod';

const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

export async function POST(request) {
    const body = await request.json();
    
    // Validate the input
    const result = registerSchema.safeParse(body);
    if (!result.success) {
        return new Response(JSON.stringify({ type: 'ZodError', errors: result.error.errors }), { status: 400 });
    }

    const { name, email, password } = result.data;

    // Send the registration request to the Python backend
    const pythonResponse = await fetch('http://localhost:8000/api/v1/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });

    if (!pythonResponse.ok) {
        const errorData = await pythonResponse.json();
        return new Response(JSON.stringify({ type: 'PythonError', message: "Python server error", errors: errorData }), { status: pythonResponse.status });
    }

    return new Response(JSON.stringify({ message: "User registered successfully!" }), { status: 201 });
}
