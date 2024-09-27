// src/app/api/tournaments/[id]/register/route.js

import prisma from '@lib/prisma';
// import { getSession } from 'next-auth/react'; // Assuming you're using next-auth for authentication

import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function POST(req, { params }) {
    const { id } = params; // Tournament ID

    // Assuming you're using next-auth for authentication
    // const session = await getSession({ req });

    // Retrieve session
    const session = await getServerSession(authOptions);

    // console.log("Session:",session)

    if (!session) {
        return new Response(JSON.stringify({ error: 'User not authenticated' }), { status: 401 });
    }

    const { user } = session;

    try {
        // Check if user owns a team
        const team = await prisma.team.findFirst({
            where: {
                ownerId: user.id,  // Ensure this user owns the team
            },
        });

        if (!team) {
            return new Response(JSON.stringify({ error: 'User does not own any team' }), { status: 404 });
        }

        // Check if the team is already registered for the tournament
        const existingEntry = await prisma.tournamentTeam.findFirst({
            where: {
                tournamentId: id,
                teamId: team.id,
            },
        });

        if (existingEntry) {
            return new Response(JSON.stringify({ message: 'Team already registered for this tournament' }), { status: 400 });
        }

        // Register the team for the tournament
        const registration = await prisma.tournamentTeam.create({
            data: {
                tournamentId: id,
                teamId: team.id,
            },
        });

        return new Response(JSON.stringify(registration), { status: 201 });
    } catch (error) {
        console.error("Error registering for tournament:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
