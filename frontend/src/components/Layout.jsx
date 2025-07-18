import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun, LogOut, LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Layout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isHome = location.pathname === "/";
    const isLogin = location.pathname === "/login";
    const isRegister = location.pathname === "/register";

    const [isDark, setIsDark] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState("");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const enableDark = savedTheme === "dark" || (!savedTheme && prefersDark);
        document.documentElement.classList.toggle("dark", enableDark);
        setIsDark(enableDark);

        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            setIsLoggedIn(true);
            try {
                const base64Payload = jwt.split('.')[1];
                const decodedPayload = JSON.parse(atob(base64Payload));
                setRole(decodedPayload.role);
            } catch (error) {
                console.error("Failed to decode JWT", error);
                setRole("");
            }
        } else {
            setIsLoggedIn(false);
            setRole("");
        }
    }, [location]);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        document.documentElement.classList.toggle("dark", newTheme);
        localStorage.setItem("theme", newTheme ? "dark" : "light");
    };

    const handleLogout = () => {
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setRole("");
        navigate("/login");
    };

    const getDashboardLink = () => {
        switch (role) {
            case "ROLE_ADMIN": return "/admin";
            case "ROLE_LIBRARIAN": return "/librarian";
            case "ROLE_STUDENT": return "/student";
            default: return "/";
        }
    };

    const dashboardLink = getDashboardLink();
    const isDashboardPage = location.pathname === dashboardLink;

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-outfit">
            <div className="sticky top-0 z-50 w-full p-4">
                <header className="mx-auto flex h-16 w-full max-w-screen-lg items-center justify-between rounded-lg border border-border/40 bg-background/80 px-6 shadow-lg backdrop-blur-lg">
                    <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
                        <img src="/logo1.png" alt="Library Logo" className="h-8 w-8" />
                        <span className="hidden sm:inline-block">LibraryVerse</span>
                    </Link>

                    <div className="flex items-center gap-2 md:gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                        >
                            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        </Button>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isLoggedIn ? "loggedIn" : "loggedOut"}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.3 }}
                                className="flex items-center gap-2 md:gap-4"
                            >
                                {isLoggedIn ? (
                                    <>
                                        {!isDashboardPage && (
                                            <Button asChild variant="secondary" size="sm">
                                                <Link to={dashboardLink}>
                                                    <LayoutDashboard className="mr-2 h-4 w-4" />
                                                    Dashboard
                                                </Link>
                                            </Button>
                                        )}
                                        <Button onClick={handleLogout} size="sm">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Logout
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        {isHome && (
                                            <nav className="flex items-center gap-2">
                                                <Button asChild size="sm">
                                                    <Link to="/login">Login</Link>
                                                </Button>
                                                <Button asChild variant="outline" size="sm">
                                                    <Link to="/register">Signup</Link>
                                                </Button>
                                            </nav>
                                        )}
                                        {isRegister && (
                                            <Button asChild size="sm">
                                                <Link to="/login">Login</Link>
                                            </Button>
                                        )}
                                        {isLogin && (
                                            <Button asChild size="sm">
                                                <Link to="/register">Signup</Link>
                                            </Button>
                                        )}
                                    </>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </header>
            </div>

            <main className="flex-1 w-full -mt-24 pt-24">
                {isHome ? (
                    <Outlet />
                ) : (
                    <div className="container mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
                        <Outlet />
                    </div>
                )}
            </main>

            <footer className="py-6 md:px-8 md:py-0 border-t border-border/40">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-20 md:flex-row">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        &copy; {new Date().getFullYear()} LibraryVerse. Built for the future of academic access.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
