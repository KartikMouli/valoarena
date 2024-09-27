// src/app/teams/page.js

"use client"; // Ensure this is a client component

import { useEffect, useState } from "react";
import axios from "axios";
import TeamForm from "../../components/TeamForm";
import TeamList from "../../components/TeamList";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function TeamsPage() {
    const { data: session, status } = useSession();
    const [users, setUsers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (status === "authenticated") {
            const fetchUsers = async () => {
                try {
                    const response = await axios.get("/api/users"); // Ensure this endpoint exists
                    setUsers(response.data);
                } catch (error) {
                    console.error("Error fetching users:", error);
                    setError("Error fetching users");
                }
            };

            fetchUsers();
        }

        const fetchTeams = async () => {
            try {
                const response = await axios.get("/api/teams");
                setTeams(response.data);
            } catch (error) {
                console.error("Error fetching teams:", error);
                setError("Error fetching teams");
            }
        };

        fetchTeams();

    }, [status]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const userId = session?.user?.id;

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-5xl mx-auto">
                {/* Page Title */}
                <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-pink-600 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                    Valorant Arena Teams
                </h1>

                {/* Team Form Section */}
                <div className="mb-12 bg-gray-800 rounded-lg p-6 shadow-lg">
                    {userId ? (
                        <>
                            <h2 className="text-2xl font-semibold mb-4">Create Your Team</h2>
                            <TeamForm userId={userId} users={users} />
                        </>
                    ) : (
                        <Link href='/signin'>
                            <p className="text-xl text-center">
                                Please <span className="text-red-500">log in</span> to create a team.
                            </p>
                        </Link>
                    )}
                </div>

                {/* Teams List Section */}
                <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                    <h2 className="text-3xl font-semibold mb-6 text-center">Registered Teams</h2>
                    <TeamList teams={teams} />
                </div>
            </div>
        </div>
    );
}
