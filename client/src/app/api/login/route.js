import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().email("Email is required"),
    password: z.string().min(1, "Password is required"),
});

export async function POST(request) {
    const body = await request.json();
    
    // Validate the input
    const result = loginSchema.safeParse(body);
    if (!result.success) {
        return new Response(JSON.stringify({ type: 'ZodError', errors: result.error.errors }), { status: 400 });
    }

    const { email, password } = result.data;

    // Send the login request to the Python backend
    const pythonResponse = await fetch('http://localhost:8000/api/v1/users/login', { // Update this URL as needed
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!pythonResponse.ok) {
        const errorData = await pythonResponse.json();
        return new Response(JSON.stringify({ type: 'AuthError', message: "Invalid email or password", errors: errorData }), { status: 401 });
    }

    const responseData = await pythonResponse.json();
    console.log(responseData);

    // If login is successful, return a success response
    return new Response(JSON.stringify({ message: "Login successful!", accessToken: responseData.access_token }), { status: 200 });
}
