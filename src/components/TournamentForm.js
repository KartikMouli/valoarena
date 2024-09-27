"use client";
import { useState } from "react";
import axios from "axios";

export default function TournamentForm({ userId }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) {
            alert("User not authenticated!");
            return;
        }
        e.preventDefault();
        const tournamentData = { name, description, startDate, endDate };
        console.log('Submitting Tournament Data:', tournamentData); // Log the data
        try {
            await axios.post("/api/tournaments", tournamentData);
        } catch (err) {
            console.error('Error creating tournament:', err); // Log any error response
        }
    };


    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-6 bg-gray-800 border border-red-500 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-white">Create a New Tournament</h2>

            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tournament Name"
                className="bg-gray-700 border border-gray-600 text-white p-3 rounded-md focus:outline-none focus:border-red-500"
                required
            />

            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tournament Description"
                className="bg-gray-700 border border-gray-600 text-white p-3 rounded-md focus:outline-none focus:border-red-500"
                required
            />

            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-white p-3 rounded-md focus:outline-none focus:border-red-500"
                required
            />

            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-white p-3 rounded-md focus:outline-none focus:border-red-500"
                required
            />

            <button type="submit" className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200">
                Create Tournament
            </button>
        </form>
    );
}
