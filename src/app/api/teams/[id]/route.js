import prisma from '@lib/prisma';

export async function GET(req, { params }) {
    const { id } = params; // Extract the team ID from the URL parameters

    try {
        const team = await prisma.team.findUnique({
            where: { id },
            include: {
                // Include any related data you want to fetch, e.g., players, tournament entries, etc.
            },
        });

        if (!team) {
            return new Response(JSON.stringify({ error: 'Team not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(team), { status: 200 });
    } catch (error) {
        console.error("Error fetching team:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
