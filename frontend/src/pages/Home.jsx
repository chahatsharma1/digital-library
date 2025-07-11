import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const Home = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const redirectBasedOnRole = () => {
        const token = localStorage.getItem("jwt");
        if (!token) return false;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const role = payload.role;

            switch (role) {
                case "ROLE_ADMIN":
                    navigate("/admin");
                    break;
                case "ROLE_LIBRARIAN":
                    navigate("/librarian");
                    break;
                case "ROLE_STUDENT":
                    navigate("/student");
                    break;
                default:
                    navigate("/");
            }
            return true;
        } catch (err) {
            console.error("JWT decode error:", err);
            return false;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        setIsAuthenticated(!!token);
    }, []);

    const handleLoginClick = () => {
        const redirected = redirectBasedOnRole();
        if (!redirected) navigate("/login");
    };

    const handleSignupClick = () => {
        const redirected = redirectBasedOnRole();
        if (redirected) {
            toast("You're already logged in.");
        } else {
            navigate("/register");
        }
    };

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

                    {isAuthenticated ? (
                        <Button
                            size="lg"
                            onClick={redirectBasedOnRole}
                            className="bg-primary text-primary-foreground px-8 py-5 text-lg shadow-md hover:brightness-110">
                            Dashboard
                        </Button>
                    ) : (
                        <>
                            <Button
                                size="lg"
                                onClick={handleSignupClick}
                                className="bg-primary text-primary-foreground px-8 py-5 text-lg shadow-md hover:brightness-110">
                                Signup
                            </Button>

                            <Button
                                size="lg"
                                onClick={handleLoginClick}
                                className="bg-primary text-primary-foreground px-8 py-5 text-lg shadow-md hover:brightness-110">
                                Login
                            </Button>
                        </>
                    )}

                    <Button
                        size="lg"
                        onClick={() => navigate("/library")}
                        className="bg-primary text-primary-foreground px-8 py-5 text-lg shadow-md hover:brightness-110">
                        View Public Library
                    </Button>
                </motion.div>
            </main>
        </div>
    );
};

export default Home;
