// src/app/signup/page.jsx

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state

        try {
            const response = await axios.post("/api/auth/signup", { username, email, password }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Signup successful:', response.data);
            router.push("/signin");
        } catch (err) {
            console.error('Signup error:', err.response?.data?.message || err.message);
            setError(err.response?.data?.message || 'An unexpected error occurred.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-8 bg-[#0f1923] rounded-lg shadow-lg border border-[#ff4655] mb-36">
            <h1 className="text-3xl font-bold text-white mb-6 text-center">Sign Up</h1>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            <form onSubmit={handleSignup} className="flex flex-col space-y-6">
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="border border-gray-600 bg-gray-900 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#ff4655] transition duration-300"
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="border border-gray-600 bg-gray-900 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#ff4655] transition duration-300"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="border border-gray-600 bg-gray-900 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#ff4655] transition duration-300"
                    required
                />
                <button
                    type="submit"
                    className="bg-[#ff4655] hover:bg-gray-800 text-white py-2 rounded transition duration-300 font-semibold"
                >
                    Sign Up
                </button>
                <p className="text-center text-gray-400 mt-4">
                    Already have an account?
                    <a href="/signin" className="text-[#ff4655] hover:underline ml-1">Sign In</a>
                </p>
            </form>
        </div>
    );
}
