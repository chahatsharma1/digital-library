import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Home = () => {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-outfit">
            <main className="flex-1 flex flex-col justify-center items-center text-center px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-6xl font-extrabold mb-4">
                    Welcome to LibraryVerse
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12">
                    A modern, secure, and efficient platform to manage university libraries and student borrowing — all in one place.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="flex flex-col md:flex-row flex-wrap justify-center gap-4">
                    <Link to="/register">
                        <Button
                            size="lg"
                            className="bg-primary text-primary-foreground px-8 py-5 text-lg shadow-md hover:brightness-110">
                            Signup
                        </Button>
                    </Link>

                    <Link to="/login">
                        <Button
                            size="lg"
                            className="bg-primary text-primary-foreground px-8 py-5 text-lg shadow-md hover:brightness-110">
                            Login
                        </Button>
                    </Link>

                    <Link to="/library">
                        <Button
                            size="lg"
                            className="bg-primary text-primary-foreground px-8 py-5 text-lg shadow-md hover:brightness-110">
                            View Public Library
                        </Button>
                    </Link>
                </motion.div>
            </main>
        </div>
    );
};

export default Home;
