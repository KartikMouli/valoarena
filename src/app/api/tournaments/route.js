import { NextResponse } from 'next/server';
import prisma from "@lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request) {
    console.log('Attempting to retrieve session...');

    // Retrieve session
    const session = await getServerSession(authOptions);

    // console.log('Session:', session);

    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { name, description, startDate, endDate } = await request.json();
        // console.log('Input Data:', { name, description, startDate, endDate });

        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
            console.error('Invalid date format:', { startDate, endDate });
            return NextResponse.json({ message: 'Invalid date format.' }, { status: 400 });
        }

        if (!name || !description || !startDate || !endDate) {
            return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
        }

        const tournament = await prisma.tournament.create({
            data: {
                name,
                description,
                hostId: session.user.id,
                startDate: startDateObj,
                endDate: endDateObj,
            },
        });

        return NextResponse.json(tournament, { status: 201 });
    } catch (error) {
        console.error('Error caught in POST handler:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        const tournaments = await prisma.tournament.findMany({
            include: {
                host: true,
                entries: {
                    include: {
                        team: true,
                    },
                },
            },
        });

        return new Response(JSON.stringify(tournaments), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching tournaments:', error.message);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
