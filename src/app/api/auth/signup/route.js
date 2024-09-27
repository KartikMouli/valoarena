// src/app/api/auth/signup/route.js

import prisma from "@lib/prisma";
import bcrypt from 'bcrypt';

export async function POST(request) {
    try {
        const { username, email, password } = await request.json();

        // Basic Validation
        if (!username || !email || !password) {
            return new Response(JSON.stringify({ message: 'All fields are required.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return new Response(JSON.stringify({ message: 'User already exists.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        // Exclude password from the response
        const { password: _, ...userWithoutPassword } = user;

        return new Response(JSON.stringify(userWithoutPassword), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Signup Error:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
