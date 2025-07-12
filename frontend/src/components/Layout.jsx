import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {Moon, Sun, LogOut, LayoutDashboard} from "lucide-react";
import { useEffect, useState } from "react";

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
                setRole(decodedPayload.role); // Update if your JWT has a different key
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
            case "ROLE_ADMIN":
                return "/admin";
            case "ROLE_LIBRARIAN":
                return "/librarian";
            case "ROLE_STUDENT":
                return "/student";
            default:
                return "/";
        }
    };

    const dashboardLink = getDashboardLink();
    const isDashboardPage = location.pathname === dashboardLink;

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-outfit">
            <header className="p-6 flex justify-between items-center border-b">
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold font-outfit tracking-tight hover:opacity-90 transition">
                    <img src="/logo1.png" alt="Library Logo" className="h-8 w-8" />
                    LibraryVerse
                </Link>

                <div className="flex items-center gap-4 ml-auto">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        className="text-muted-foreground hover:text-foreground"
                        aria-label="Toggle dark mode"
                    >
                        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </Button>

                    {isLoggedIn && (
                        <>
                            {!isDashboardPage && (
                                <Link to={dashboardLink}>
                                    <Button className="bg-secondary hover:bg-secondary/80">
                                        <LayoutDashboard />
                                        Dashboard</Button>
                                </Link>
                            )}
                            {!["/", ""].includes(location.pathname) && !location.pathname.startsWith("/library") && (
                                <Button onClick={handleLogout}>
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </Button>
                            )}
                        </>
                    )}


                    {!isLoggedIn && (
                        <>
                            {isHome && (
                                <nav className="space-x-4">
                                    <Link to="/login">
                                        <Button className="bg-primary text-primary-foreground hover:bg-primary/80 font-outfit">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link to="/register">
                                        <Button className="bg-primary text-primary-foreground hover:bg-primary/80 font-outfit">
                                            Signup
                                        </Button>
                                    </Link>
                                </nav>
                            )}

                            {isRegister && (
                                <nav>
                                    <Link to="/login">
                                        <Button className="bg-primary text-primary-foreground hover:brightness-110 font-outfit">
                                            Login
                                        </Button>
                                    </Link>
                                </nav>
                            )}

                            {isLogin && (
                                <nav>
                                    <Link to="/register">
                                        <Button className="bg-primary text-primary-foreground hover:brightness-110 font-outfit">
                                            Signup
                                        </Button>
                                    </Link>
                                </nav>
                            )}
                        </>
                    )}
                </div>
            </header>

            <main className="flex-1">
                <Outlet />
            </main>

            <footer className="text-center text-sm text-muted-foreground py-4 border-t font-outfit">
                © 2025 LibraryVerse. Built for the future of academic access.
            </footer>
        </div>
    );
};

export default Layout;
