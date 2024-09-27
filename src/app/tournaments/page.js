// src/app/tournaments/page.jsx

"use client"; // Mark as client component to use hooks

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import TournamentForm from "@components/TournamentForm";
import { useUser } from "@context/UserContext";

export default function TournamentsPage() {
    const [tournaments, setTournaments] = useState([]);
    const [error, setError] = useState(null);
    const { user, isAuthenticated } = useUser();

    // console.log(user);


    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const response = await axios.get("/api/tournaments");
                setTournaments(response.data);

            } catch (err) {
                console.error('Error fetching tournaments:', err);
                setError('Failed to load tournaments.');
            }
        };

        fetchTournaments();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 py-10 px-4">
            <div className="max-w-5xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
                <h1 className="text-5xl font-bold text-center mb-10 bg-gradient-to-r from-pink-600 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                    Valorant Tournaments
                </h1>

                {/* Display Tournament Form if authenticated */}
                {isAuthenticated && (
                    <div className="mb-10 bg-gray-700 rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-white mb-4">Create a New Tournament</h2>
                        <TournamentForm userId={user.id} />
                    </div>
                )}

                {/* Error message */}
                {error && (
                    <p className="text-red-500 text-center text-lg mb-6">{error}</p>
                )}

                {/* Tournaments List */}
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {tournaments.map((tournament) => (
                        <li key={tournament.id} className="bg-gray-700 border border-gray-600 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl hover:border-red-500">
                            <Link href={`/tournaments/${tournament.id}`}>
                                <h2 className="text-3xl font-bold text-white mb-3 hover:text-red-400 transition-colors">
                                    {tournament.name}
                                </h2>
                            </Link>
                            <p className="text-gray-100 mb-3">{tournament.description}</p>
                            <div className="text-white">
                                <p className="mb-1">Host: <span className="font-semibold">{tournament.host.username}</span></p>
                                <p className="mb-1">Start Date: <span>{new Date(tournament.startDate).toLocaleDateString()}</span></p>
                                <p>End Date: <span>{new Date(tournament.endDate).toLocaleDateString()}</span></p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
