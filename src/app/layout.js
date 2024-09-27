// src/app/layout.jsx

"use client";

import './globals.css';
import Navbar from '@components/Navbar';
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@context/UserContext";
import Footer from '@components/Footer';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <UserProvider>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </UserProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
