// src/components/SignOut.jsx

"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
    const handleSignOut = () => {
        signOut({ callbackUrl: "/" }); // Redirects user to homepage after sign-out
    };

    return (
        <button
            onClick={handleSignOut}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200"
        >
            Sign Out
        </button>
    );
}
