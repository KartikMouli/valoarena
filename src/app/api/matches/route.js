import prisma from "../../../lib/prisma";

export async function POST(req) {
  const { tournamentId, round, teamAId, teamBId, scheduledAt } = await req.json();
  const match = await prisma.match.create({
    data: {
      tournamentId,
      round,
      teamAId,
      teamBId,
      scheduledAt,
    },
  });
  return new Response(JSON.stringify(match), { status: 201 });
}

export async function GET() {
  const matches = await prisma.match.findMany();
  return new Response(JSON.stringify(matches), { status: 200 });
}
