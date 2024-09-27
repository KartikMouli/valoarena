"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@context/UserContext';

const TournamentDetail = ({ params }) => {
    const id = params.id;
    const [tournament, setTournament] = useState(null);
    const [teams, setTeams] = useState([]);
    const [error, setError] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false); // Track if user is registered
    const { user, isAuthenticated } = useUser(); // Assuming you have a UserContext for auth

    useEffect(() => {
        const fetchTournament = async () => {
            try {
                const response = await axios.get(`/api/tournaments/${id}`);
                setTournament(response.data);
                await fetchTeams(response.data.entries); // Fetch teams after getting the tournament
            } catch (err) {
                setError('Failed to load tournament details.');
            }
        };

        const fetchTeams = async (entries) => {
            try {
                const teamPromises = entries.map(entry =>
                    axios.get(`/api/teams/${entry.teamId}`) // Assuming you have an endpoint to get team details
                );
                const teamResponses = await Promise.all(teamPromises);
                const teamsData = teamResponses.map(response => response.data);
                setTeams(teamsData);
            } catch (err) {
                setError('Failed to load team details.');
            }
        };

        fetchTournament();
    }, [id]);

    const handleRegister = async () => {
        try {
            console
            const response = await axios.post(`/api/tournaments/${id}/register`, {
                userId: user.id, // Pass the user ID
            });
            setIsRegistered(true); // Mark user as registered
        } catch (err) {
            console.error('Error registering for tournament:', err);
        }
    };

    const isOngoing = tournament && new Date() >= new Date(tournament.startDate) && new Date() <= new Date(tournament.endDate);


    if (error) return <div>{error}</div>;
    if (!tournament) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto mt-10 mb-8 p-6 bg-[#0f1923] border border-[#ff4655] rounded-lg shadow-lg text-white">
            <h1 className="text-4xl font-bold text-[#ff4655] mb-4">{tournament.name}</h1>
            <p className="text-gray-300 mb-6">{tournament.description}</p>

            <div className="mt-4 flex gap-2">
                <p className="font-semibold text-[#ff4655]">Host:</p>
                <p className="text-gray-400">{tournament.host.username}</p>
            </div>

            <div className='flex gap-5 mt-4'>
                <div className="flex gap-1">
                    <p className="font-semibold text-[#ff4655]">Start Date:</p>
                    <p className="text-gray-400">{new Date(tournament.startDate).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-1">
                    <p className="font-semibold text-[#ff4655]">End Date:</p>
                    <p className="text-gray-400">{new Date(tournament.endDate).toLocaleDateString()}</p>
                </div>
            </div>

            {/* Show Register button if the user is authenticated and the tournament is ongoing */}
            {isAuthenticated && isOngoing && !isRegistered && (
                <button
                    onClick={handleRegister}
                    className="bg-[#ff4655] hover:bg-[#0f1923] hover:border hover:border-[#ff4655] text-white px-6 py-2 rounded mt-6 transition-all transform hover:scale-105"
                >
                    Register for Tournament
                </button>
            )}

            {isRegistered && (
                <p className="mt-4 text-green-400">You have successfully registered for this tournament!</p>
            )}

            <div className="m-8">
                <p className="font-semibold text-[#ff4655]">Participating Teams:</p>
                <ul className="list-disc ml-5 text-gray-300 mt-4">
                    {teams.length > 0 ? (
                        teams.map(team => (
                            <li key={team.id} className="text-gray-400 hover:text-[#ff4655] transition-colors">
                                {team.name} {/* Assuming team has a 'name' property */}
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-400">No teams registered yet.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default TournamentDetail;
