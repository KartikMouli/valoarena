import prisma from "../../../lib/prisma";

export async function POST(req) {
  const { name, ownerId, memberIds } = await req.json();
  const team = await prisma.team.create({
    data: {
      name,
      ownerId,
      members: {
        create: memberIds.map((id) => ({ userId: id })),
      },
    },
  });
  return new Response(JSON.stringify(team), { status: 201 });
}


export async function GET() {
  try {
    const teams = await prisma.team.findMany({
      include: {
        owner: true, // Include owner details
        members: {
          include: {
            user: true, // Include user details for each member
          },
        },
      },
    });
    return new Response(JSON.stringify(teams), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching teams:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

