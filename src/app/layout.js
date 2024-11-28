// src/app/layout.jsx

"use client";

import './globals.css';
import Navbar from '@components/Navbar';
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@context/UserContext";
import Footer from '@components/Footer';



export default function RootLayout({ children }) {
  return (

    <html lang="en" suppressHydrationWarning>
      <body>
        <SessionProvider>
          <UserProvider>

            <div className="min-h-screen bg-background">
              <Navbar />
              <main className="pt-16 flex-grow">{children}</main>
              <Footer />
            </div>


          </UserProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
