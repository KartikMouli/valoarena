"use client";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();


    const handleSignin = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (res.error) {
                setError(res.error);
            } else {
                router.push("/"); // Redirect to home or dashboard
            }
        } catch (err) {
            console.error('Signin error:', err.response?.data?.message || err.message);
            setError('An unexpected error occurred.');
        }
    };

    const handleDemoSignIn = () => {
        setEmail("demo@abc.com");
        setPassword("demo")
        
        
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-8 bg-[#0f1923] rounded-lg shadow-lg border border-[#ff4655] mb-32">
            <h1 className="text-3xl font-bold text-white mb-6 text-center">Sign In</h1>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            <form onSubmit={handleSignin} className="flex flex-col space-y-6">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="border border-gray-600 bg-gray-800 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#ff4655] transition duration-300"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="border border-gray-600 bg-gray-800 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#ff4655] transition duration-300"
                    required
                />
                <button
                    type="submit"
                    className="bg-[#ff4655] hover:bg-gray-800 text-white py-2 rounded transition duration-300 font-semibold"
                >
                    Sign In
                </button>
                <button
                    type="button"
                    onClick={handleDemoSignIn}
                    className="bg-gray-800 hover:bg-[#ff4655] text-white py-2 rounded transition duration-300 font-semibold mt-4"
                >
                    Demo Sign In
                </button>
                <p className="text-center text-gray-400 mt-4">
                    Don&apos;t have an account?
                    <a href="/signup" className="text-[#ff4655] hover:underline ml-1">Sign Up</a>
                </p>
            </form>
        </div>
    );
}
