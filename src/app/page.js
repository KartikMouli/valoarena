"use client"
import Image from 'next/image';
import valobg from '../../public/valobg.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [tournaments, setTournaments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const response = await axios.get("/api/tournaments");

                // Filter only upcoming tournaments
                const upcomingTournaments = response.data.filter(tournament =>
                    new Date(tournament.startDate) >= new Date()
                );

                setTournaments(upcomingTournaments);
            } catch (err) {
                console.error('Error fetching tournaments:', err);
                setError('Failed to load tournaments.');
            }
        };

        fetchTournaments();
    }, []);

    // console.log(tournaments);

    return (
        <div className="text-white bg-black">
            {/* Hero Section */}
            <div className="relative h-screen">
                <Image
                    src={valobg}
                    alt="Valorant background"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-50"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
                    <h1 className="text-5xl font-bold text-white drop-shadow-md">
                        Welcome to Valorant Championship Arena
                    </h1>
                    <p className="mt-4 text-lg text-gray-300">
                        The ultimate showdown of the best teams!
                    </p>
                    <a href="/tournaments" className="mt-8 bg-red-600 hover:bg-red-800 text-white py-3 px-6 rounded-lg text-lg font-semibold">
                        Register Now
                    </a>
                </div>
            </div>

            {/* Tournament Info Section */}
            <div className="py-12 bg-gray-900">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold">Upcoming Tournaments</h2>
                    <p className="mt-4 text-gray-400">Don’t miss out on the action!</p>

                    {error && <p className="mt-4 text-red-500">{error}</p>}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                        {tournaments.map(tournament => (
                            <div key={tournament.id} className="bg-gray-800 p-6 rounded-lg shadow-md hover:scale-105 transition-transform">
                                <h3 className="text-xl font-semibold">{tournament.name}</h3>
                                <p className="mt-2">{new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}</p>
                                <a href={`/tournaments/${tournament.id}`} className="mt-4 inline-block bg-red-600 hover:bg-red-800 text-white py-2 px-4 rounded-lg">
                                    View Details
                                </a>
                            </div>
                        ))}
                    </div>


                </div>
            </div>

            {/* Highlights Section */}
            <div className="py-12 bg-black">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold">Tournament Highlights</h2>
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 p-4 gap-5">
                        <iframe
                            className='w-full h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96'
                            src="https://www.youtube.com/embed/U6KBa0W1GMQ?si=FPvsdhU8Mc_r4DmZ"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                        <iframe
                            className='w-full h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96'
                            src="https://www.youtube.com/embed/zufMUTl-hu4?si=lU7yCxI-Z0S89xxv"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>

                    </div>
                </div>
            </div>
        </div>
        // 
    );
}

export default Home;
