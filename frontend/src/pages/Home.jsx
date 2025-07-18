import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BookMarked, ShieldCheck, Users, ArrowRight, Library, School } from "lucide-react";

const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-card/50 p-6 rounded-lg border border-border/20 text-center flex flex-col items-center shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
        <div className="mb-4 bg-primary/10 p-3 rounded-full">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm flex-grow">{description}</p>
    </div>
);

const Home = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        setIsAuthenticated(!!token);
    }, []);

    const redirectBasedOnRole = () => {
        const token = localStorage.getItem("jwt");
        if (!token) return false;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const role = payload.role;
            switch (role) {
                case "ROLE_ADMIN": navigate("/admin"); break;
                case "ROLE_LIBRARIAN": navigate("/librarian"); break;
                case "ROLE_STUDENT": navigate("/student"); break;
                default: navigate("/");
            }
            return true;
        } catch (err) {
            console.error("JWT decode error:", err);
            return false;
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-outfit">
            <main className="min-h-screen flex flex-col justify-center items-center text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Badge variant="outline" className="mb-4"> Now Supporting Public & University Libraries </Badge>
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tighter">
                        Welcome to LibraryVerse
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
                        A modern, secure, and efficient platform to manage libraries for universities and the public — all in one place.
                    </p>
                    <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
                        {isAuthenticated ? (
                            <Button size="lg" onClick={redirectBasedOnRole} className="text-lg shadow-lg">
                                Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        ) : (
                            <>
                                <Button size="lg" onClick={() => navigate("/register")} className="text-lg shadow-lg">
                                    Get Started for Free
                                </Button>
                                <Button size="lg" variant="outline" onClick={() => navigate("/login")} className="text-lg">
                                    Login
                                </Button>
                            </>
                        )}
                        <Button
                            size="lg"
                            variant="secondary"
                            onClick={() => navigate("/library")}
                            className="text-lg shadow-md">
                            View Public Library
                        </Button>
                    </div>
                </motion.div>
            </main>

            <section id="features" className="py-20 bg-muted/40">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold">Why LibraryVerse?</h2>
                        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                            Everything you need to run a modern library with ease and efficiency.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <FeatureCard
                            icon={<BookMarked size={28} className="text-primary" />}
                            title="Modern Management"
                            description="Easily add, track, and manage your entire book collection with our intuitive interface for any library type."
                        />
                        <FeatureCard
                            icon={<ShieldCheck size={28} className="text-primary" />}
                            title="Secure & Role-Based"
                            description="Secure access for Students, Librarians, and Admins with role-based dashboards and permissions."
                        />
                        <FeatureCard
                            icon={<Users size={28} className="text-primary" />}
                            title="Efficient Borrowing"
                            description="Streamline the book issuing and returning process for university libraries, reducing wait times."
                        />
                    </div>
                </div>
            </section>

            <section id="how-it-works" className="py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-12">Two Ways to Get Started</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        <div className="bg-card/50 p-8 rounded-lg border border-border/20">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <School className="h-8 w-8 text-primary"/>
                                <h3 className="text-2xl font-semibold">For University Libraries</h3>
                            </div>
                            <p className="text-muted-foreground mb-6">A private, secure system for your institution.</p>
                            <ol className="space-y-4 text-left">
                                <li className="flex items-start gap-3">
                                    <span className="bg-primary text-primary-foreground h-6 w-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">1</span>
                                    <span><strong>Admin:</strong> Registers the university and adds librarians to the system.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="bg-primary text-primary-foreground h-6 w-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">2</span>
                                    <span><strong>Librarian:</strong> Manages the book collection and handles issuing and returning of books.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="bg-primary text-primary-foreground h-6 w-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">3</span>
                                    <span><strong>Student:</strong> Registers and logs in to browse available books and view their borrowing history.</span>
                                </li>
                            </ol>
                        </div>

                        <div className="bg-card/50 p-8 rounded-lg border border-border/20">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <Library className="h-8 w-8 text-primary"/>
                                <h3 className="text-2xl font-semibold">For Public Libraries</h3>
                            </div>
                            <p className="text-muted-foreground mb-6">An open collection for everyone to explore.</p>
                            <ol className="space-y-4 text-left">
                                <li className="flex items-start gap-3">
                                    <span className="bg-primary text-primary-foreground h-6 w-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">1</span>
                                    <span><strong>Admin:</strong> Registers a public library and assigns a librarian.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="bg-primary text-primary-foreground h-6 w-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">2</span>
                                    <span><strong>Librarian:</strong> Adds and manages the books available in the public collection.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="bg-primary text-primary-foreground h-6 w-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">3</span>
                                    <span><strong>Anyone:</strong> Can visit the public library section to view the available books without needing to log in.</span>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const Badge = ({ children, className, ...props }) => (
    <span className={`inline-block rounded-full border px-3 py-1 text-sm font-semibold ${className}`} {...props}>
        {children}
    </span>
);


export default Home;
