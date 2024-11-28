"use client"
import Image from 'next/image';
import valobg from '../../public/valobg.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Trophy, Shield, Target, ArrowRight } from 'lucide-react';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


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

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b bg-background from-gray-900 to-black text-white">

            {/* Hero Section */}
            <section className="relative h-screen">
                <Image
                    src="/valobg.jpg"
                    alt="Valorant background"
                    fill
                    priority
                    className="object-cover brightness-40"
                />
                <div className="absolute inset-0 bg-black/50" />
                <motion.div
                    className="absolute inset-0 flex flex-col justify-center items-center text-center px-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-600">
                        Valorant Championship Arena
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl">
                        Join the ultimate showdown where legends are made and champions rise
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button

                            className="bg-red-600 hover:bg-red-700 text-white px-8 py-2 text-lg"
                            asChild
                        >
                            <Link href="/tournaments">Register Now</Link>
                        </Button>
                        <Button

                            variant="outline"
                            className="border-red-500 text-red-500 hover:bg-red-500/10 px-6 py-2 text-lg"
                            asChild
                        >
                            <Link href="/tournaments">View Tournaments</Link>
                        </Button>
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-2">
                <div className="container mx-auto">
                    <motion.h2
                        className="text-4xl font-bold text-center mb-16"
                        {...fadeInUp}
                    >
                        Why Choose Our Platform?
                    </motion.h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Trophy,
                                title: "Professional Tournaments",
                                description: "Compete in high-stakes tournaments with professional organization and management"
                            },
                            {
                                icon: Shield,
                                title: "Anti-Cheat System",
                                description: "Advanced anti-cheat measures ensure fair play and competitive integrity"
                            },
                            {
                                icon: Target,
                                title: "Live Statistics",
                                description: "Real-time performance tracking and detailed match statistics"
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                            >
                                <Card className="p-6 bg-gray-800/50 border-gray-700 hover:bg-gray-800/80 transition-all">
                                    <feature.icon className="w-12 h-12 text-red-500 mb-4" />
                                    <CardTitle className="text-xl font-semibold mb-2">{feature.title}</CardTitle>
                                    {/* <p className="text-gray-400 mt-auto">{feature.description}</p> */}
                                    <CardDescription className="mt-auto">{feature.description}</CardDescription>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Upcoming Tournaments */}
            <section className="py-20 px-4 bg-gray-900/50">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold mb-4">Upcoming Tournaments</h2>
                        <p className="text-gray-400 text-lg">Don&apos; miss out on the action!</p>
                    </motion.div>

                    {error && (
                        <div className="text-center text-red-500 mb-8">
                            {error}
                        </div>
                    )}

                    <div className="grid md:grid-cols-3 gap-8">
                        {tournaments.map((tournament, index) => (
                            <motion.div
                                key={tournament.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="bg-gray-800/50 border-gray-700 overflow-hidden hover:scale-105 transition-all duration-300">
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-2">{tournament.name}</h3>
                                        <p className="text-gray-400 mb-4">
                                            {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
                                        </p>
                                        <Button className="w-full flex bg-red-600 hover:bg-red-700" asChild>
                                            <Link href={`/tournaments/${tournament.id}`}>
                                                View Details
                                                <ArrowRight className="ml-2 w-4 h-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Highlights Section */}
            <section className="py-20 px-10">
                <div className="container mx-auto">
                    <motion.h2
                        className="text-4xl font-bold text-center mb-12"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        Tournament Highlights
                    </motion.h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="aspect-video rounded-lg overflow-hidden"
                        >
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/U6KBa0W1GMQ?si=FPvsdhU8Mc_r4DmZ"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="aspect-video rounded-lg overflow-hidden"
                        >
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/zufMUTl-hu4?si=lU7yCxI-Z0S89xxv"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
        // 
    );
}

export default Home;
