// components/TeamForm.js

"use client";
import { useState } from "react";
import axios from "axios";

export default function TeamForm({ userId, users }) {
    const [name, setName] = useState("");
    const [memberIds, setMemberIds] = useState([]);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleMemberChange = (id) => {
        setMemberIds((prev) =>
            prev.includes(id) ? prev.filter(memberId => memberId !== id) : [...prev, id]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            await axios.post("/api/teams", { name, ownerId: userId, memberIds });
            setSuccess("Team created successfully!");
            setName("");
            setMemberIds([]);
        } catch (err) {
            console.error("Error creating team:", err);
            setError("Error creating team.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mb-8 p-6 bg-gray-800 border border-red-500 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-white">Create a New Team</h2>
            {error && <div className="text-red-400">{error}</div>}
            {success && <div className="text-green-500">{success}</div>}

            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Team Name"
                className="bg-gray-700 border border-gray-600 text-white p-3 rounded-md focus:outline-none focus:border-red-500"
                required
            />

            <div className="text-white">
                <h3 className="font-semibold mb-2">Select Members:</h3>
                <div className="grid grid-cols-2 gap-4">
                    {users.map((user) => (
                        <label key={user.id} className="flex items-center bg-gray-700 p-2 rounded-md hover:bg-gray-600 transition duration-200">
                            <input
                                type="checkbox"
                                checked={memberIds.includes(user.id)}
                                onChange={() => handleMemberChange(user.id)}
                                className="mr-2 accent-red-500"
                            />
                            <span className="text-white">{user.username}</span>
                        </label>
                    ))}
                </div>
            </div>

            <button type="submit" className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200">
                Create Team
            </button>
        </form>
    );
}
