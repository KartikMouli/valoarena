// src/app/api/users/route.js

import prisma from "../../../lib/prisma";

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            select: { id: true, username: true }, // Select only necessary fields
        });
        return new Response(JSON.stringify(users), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
