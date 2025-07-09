import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const Layout = () => {
    const location = useLocation();
    const isHome = location.pathname === "/";
    const isLogin = location.pathname === "/login";
    const isRegister = location.pathname === "/register";

    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const enableDark = saved === "dark" || (!saved && prefersDark);
        document.documentElement.classList.toggle("dark", enableDark);
        setIsDark(enableDark);
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        document.documentElement.classList.toggle("dark", newTheme);
        localStorage.setItem("theme", newTheme ? "dark" : "light");
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <header className="p-6 flex justify-between items-center border-b">
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold font-outfit tracking-tight hover:opacity-90 transition">
                    <img src="/logo1.png" alt="Library Logo" className="h-8 w-8" />
                    LibraryVerse
                </Link>

                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        className="text-muted-foreground hover:text-foreground"
                        aria-label="Toggle dark mode">
                        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </Button>

                    {isHome && (
                        <nav className="space-x-4">
                            <Link to="/login">
                                <Button className="bg-primary text-primary-foreground hover:brightness-110 font-outfit">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button className="bg-primary text-primary-foreground hover:brightness-110 font-outfit">
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
