// src/app/api/tournaments/[id]/route.js

import prisma from '@lib/prisma';

export async function GET(req, { params }) {
    const { id } = params; // Extract the tournament ID from the URL parameters

    try {
        const tournament = await prisma.tournament.findUnique({
            where: { id },
            include: {
                host: true, // Include related host data if necessary
                entries:true,
            },
        });

        if (!tournament) {
            return new Response(JSON.stringify({ error: 'Tournament not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(tournament), { status: 200 });
    } catch (error) {
        console.error("Error fetching tournament:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
