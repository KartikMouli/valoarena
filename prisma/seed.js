const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    // Helper function to create users
    async function createUser(username) {
        return prisma.user.create({
            data: {
                username,
                email: `${username.toLowerCase()}@example.com`,
                password: await bcrypt.hash('password123', 10),
            },
        });
    }

    // Create 25 users
    const userNames = [
        'ValorantMaster', 'SniperQueen', 'TacticianX', 'AgentPhoenix', 'SkyHigh',
        'ViperStrike', 'BreachMaker', 'CypherNinja', 'SovaHunter', 'RazeBoom',
        'JettBlaze', 'NeonThunder', 'ReynaShadow', 'KilljoyTech', 'OmenGhost',
        'BrimstoneCommander', 'SageHealer', 'PhoenixFlare', 'AstraNova', 'YoruPhantom',
        'FadeWhisper', 'HarborTide', 'SkyeLight', 'ChamberAce', 'KayoBot'
    ];

    const users = await Promise.all(userNames.map((name) => createUser(name)));

    // Function to create teams and add members
    async function createTeam(name, owner, members) {
        return prisma.team.create({
            data: {
                name,
                ownerId: owner.id,
                members: {
                    create: members.map((user) => ({
                        userId: user.id,
                    })),
                },
            },
        });
    }

    // Create 10 teams with 5 members each (split the users array)
    const teams = await Promise.all([
        createTeam('Alpha Squad', users[0], users.slice(0, 5)),
        createTeam('Bravo Team', users[1], users.slice(5, 10)),
        createTeam('Delta Force', users[2], users.slice(10, 15)),
        createTeam('Echo Warriors', users[3], users.slice(15, 20)),
        createTeam('Foxtrot Legion', users[4], users.slice(20, 25)),
        createTeam('Gamma Unit', users[5], users.slice(0, 5)),
        createTeam('Zeta Crew', users[6], users.slice(5, 10)),
        createTeam('Omega Squad', users[7], users.slice(10, 15)),
        createTeam('Sigma Strike', users[8], users.slice(15, 20)),
        createTeam('Beta Blitz', users[9], users.slice(20, 25)),
    ]);

    // Helper function to create a tournament
    async function createTournament(name, host, startDate, endDate, teams) {
        const tournament = await prisma.tournament.create({
            data: {
                name,
                description: `Tournament: ${name}`,
                hostId: host.id,
                startDate,
                endDate,
                entries: {
                    create: teams.map((team) => ({
                        teamId: team.id,
                    })),
                },
            },
        });


        return tournament;
    }

    // Create 5 past tournaments (e.g. dates before today)
    const now = new Date();
    const pastTournaments = await Promise.all([
        createTournament('Valorant Past Tournament 1', users[0], new Date(now.getFullYear(), now.getMonth() - 3, 1), new Date(now.getFullYear(), now.getMonth() - 3, 5), teams.slice(0, 5)),
        createTournament('Valorant Past Tournament 2', users[1], new Date(now.getFullYear(), now.getMonth() - 2, 1), new Date(now.getFullYear(), now.getMonth() - 2, 5), teams.slice(0, 5)),
        createTournament('Valorant Past Tournament 3', users[2], new Date(now.getFullYear(), now.getMonth() - 1, 1), new Date(now.getFullYear(), now.getMonth() - 1, 5), teams.slice(0, 5)),
        createTournament('Valorant Past Tournament 4', users[3], new Date(now.getFullYear(), now.getMonth() - 4, 1), new Date(now.getFullYear(), now.getMonth() - 4, 5), teams.slice(0, 5)),
        createTournament('Valorant Past Tournament 5', users[4], new Date(now.getFullYear(), now.getMonth() - 5, 1), new Date(now.getFullYear(), now.getMonth() - 5, 5), teams.slice(0, 5)),
    ]);

    // Create 5 upcoming tournaments (e.g. dates after today)
    const upcomingTournaments = await Promise.all([
        createTournament('Valorant Upcoming Tournament 1', users[5], new Date(now.getFullYear(), now.getMonth() + 1, 1), new Date(now.getFullYear(), now.getMonth() + 1, 5), teams.slice(5, 10)),
        createTournament('Valorant Upcoming Tournament 2', users[6], new Date(now.getFullYear(), now.getMonth() + 2, 1), new Date(now.getFullYear(), now.getMonth() + 2, 5), teams.slice(5, 10)),
        createTournament('Valorant Upcoming Tournament 3', users[7], new Date(now.getFullYear(), now.getMonth() + 3, 1), new Date(now.getFullYear(), now.getMonth() + 3, 5), teams.slice(5, 10)),
        createTournament('Valorant Upcoming Tournament 4', users[8], new Date(now.getFullYear(), now.getMonth() + 4, 1), new Date(now.getFullYear(), now.getMonth() + 4, 5), teams.slice(5, 10)),
        createTournament('Valorant Upcoming Tournament 5', users[9], new Date(now.getFullYear(), now.getMonth() + 5, 1), new Date(now.getFullYear(), now.getMonth() + 5, 5), teams.slice(5, 10)),
    ]);

    console.log('Seed data created successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
