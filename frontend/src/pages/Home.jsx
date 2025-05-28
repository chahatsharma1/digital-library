import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Home = () => {
    return (
        <div className="min-h-screen bg-[#0F172A] text-[#F1F5F9] flex flex-col">
            <header className="p-6 flex justify-between items-center">
                <h1 className="text-3xl font-bold">LibraryVerse</h1>
                <nav className="space-x-4">
                    <Link to="/login">
                        <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white">Login</Button>
                    </Link>
                    <Link to="/register">
                        <Button className="bg-[#38BDF8] hover:bg-[#0EA5E9] text-white">Register</Button>
                    </Link>
                </nav>
            </header>

            <main className="flex-1 flex flex-col justify-center items-center text-center px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-6xl font-extrabold mb-6"
                >
                    Welcome to LibraryVerse
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-lg md:text-xl text-[#CBD5E1] max-w-xl mb-10"
                >
                    Your modern, digital-first library management platform. Secure. Fast. Easy.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    <Link to="/register">
                        <Button size="lg" className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-8 py-6 rounded-2xl text-xl shadow-lg">
                            Get Started
                        </Button>
                    </Link>
                </motion.div>
            </main>

            <footer className="text-center text-sm text-[#94A3B8] py-4">
                © {new Date().getFullYear()} LibraryVerse. All rights reserved.
            </footer>
        </div>
    );
}
export default Home;