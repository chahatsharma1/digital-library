import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BookMarked, ShieldCheck, Users, ArrowRight, Library, School, Sparkles, Star, Zap } from "lucide-react";

const Badge = ({ children, className, variant = "outline", ...props }) => (
    <span
        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
            variant === "outline"
                ? "border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10"
                : "bg-primary text-primary-foreground"
        } ${className}`}
        {...props}
    >
    <Sparkles className="h-3 w-3" />
        {children}
  </span>
);

const FeatureCard = ({ icon, title, description, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        viewport={{ once: true }}
        className="group relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative bg-card/60 backdrop-blur-sm p-8 rounded-xl border border-border/50 text-center flex flex-col items-center shadow-md hover:shadow-lg hover:shadow-primary/20 transition-all duration-500 h-full group-hover:scale-105 group-hover:border-primary/30">
            <div className="mb-6 bg-gradient-to-br from-primary/20 to-accent/20 p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{title}</h3>
            <p className="text-muted-foreground leading-relaxed flex-grow">{description}</p>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Star className="h-4 w-4 text-primary fill-current" />
            </div>
        </div>
    </motion.div>
);

const StepCard = ({ step, title, description, icon, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay }}
        viewport={{ once: true }}
        className="flex items-start gap-4 group">
        <div className="flex-shrink-0 bg-gradient-to-br from-primary to-accent text-white h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
            {step}
        </div>
        <div className="flex-grow">
            <div className="flex items-center gap-2 mb-2">
                {icon}
                <h4 className="font-semibold text-lg">{title}</h4>
            </div>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
    </motion.div>
);

const FloatingElement = ({ children, className = "", delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay }}
        className={`absolute ${className} animate-pulse`}>
        {children}
    </motion.div>
);

const Home = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        setIsAuthenticated(!!token);

        fetch('https://library-99462680398.asia-south1.run.app/actuator/health', { mode: 'no-cors' })
            .catch(error => console.warn("Backend warm-up ping failed:", error));

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
        <div className="min-h-screen bg-background text-foreground font-outfit overflow-x-hidden">
            <main className="relative min-h-screen flex flex-col justify-center items-center text-center px-4">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80" />
                </div>

                <FloatingElement className="top-20 left-10 text-primary/20" delay={0.5}><BookMarked size={32} /></FloatingElement>
                <FloatingElement className="top-40 right-20 text-accent/20" delay={1}><Library size={28} /></FloatingElement>
                <FloatingElement className="bottom-40 left-20 text-primary/20" delay={1.5}><School size={24} /></FloatingElement>
                <FloatingElement className="bottom-20 right-10 text-accent/20" delay={2}><Zap size={20} /></FloatingElement>

                <div className="relative z-10 max-w-6xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                        <Badge className="mb-6 hover:scale-105 transition-transform duration-300">Now Supporting Public & University Libraries</Badge>
                        <motion.h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}>
                            Welcome to <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">LibraryVerse</span>
                        </motion.h1>
                        <motion.p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
                            A modern, secure, and efficient platform to manage libraries for universities and the public — all in one beautiful place.
                        </motion.p>
                        <motion.div className="flex flex-col sm:flex-row justify-center gap-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
                            {isAuthenticated ? (
                                <Button variant="default" size="lg" onClick={redirectBasedOnRole} className="group">
                                    Go to Dashboard <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </Button>
                            ) : (
                                <>
                                    <Button variant="default" size="lg" onClick={() => navigate("/register")} className="group">
                                        Get Started for Free <Sparkles className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                                    </Button>
                                    <Button variant="ghost" size="lg" onClick={() => navigate("/login")}>
                                        Login
                                    </Button>
                                </>
                            )}
                            <Button variant="outline" size="lg" onClick={() => navigate("/library")} className="hover:shadow-md">
                                View Public Library <Library className="ml-2 h-5 w-5" />
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
                <motion.div className="absolute bottom-8 left-1/2 transform -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                    <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
                    </div>
                </motion.div>
            </main>

            <section className="relative py-24 bg-gradient-to-br from-muted/20 to-muted/40">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                        <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Why LibraryVerse?</h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Everything you need to run a modern library with elegance, efficiency, and ease.
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard icon={<BookMarked size={36} className="text-primary" />} title="Modern Management" description="Easily add, track, and manage your entire book collection with our intuitive, beautifully designed interface for any library type." delay={0.1} />
                        <FeatureCard icon={<ShieldCheck size={36} className="text-primary" />} title="Secure & Role-Based" description="Enterprise-grade security with role-based dashboards and permissions for Students, Librarians, and Administrators." delay={0.2} />
                        <FeatureCard icon={<Users size={36} className="text-primary" />} title="Efficient Borrowing" description="Streamline the book issuing and returning process for university libraries, dramatically reducing wait times and improving user experience." delay={0.3} />
                    </div>
                </div>
            </section>

            <section className="py-24 bg-background relative overflow-hidden">
                <div className="absolute inset-0 opacity-5"><div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(139,92,246,0.3)_1px,transparent_0)] bg-[size:40px_40px]" /></div>
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                        <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Two Ways to Get Started</h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">Choose the perfect solution for your institution or community</p>
                    </motion.div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <motion.div className="relative group" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative bg-card/60 backdrop-blur-sm p-10 rounded-2xl border border-border/50 shadow-md hover:shadow-lg transition-all duration-500 group-hover:scale-[1.02]">
                                <div className="flex items-center justify-center gap-4 mb-6"><div className="bg-gradient-to-br from-primary to-accent p-3 rounded-full"><School className="h-8 w-8 text-white" /></div><h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">University Libraries</h3></div>
                                <p className="text-muted-foreground mb-8 text-center text-lg">A private, secure system for your institution.</p>
                                <div className="space-y-6">
                                    <StepCard step={1} icon={<ShieldCheck className="h-5 w-5 text-primary" />} title="Admin Registration" description="Admin registers the university and adds librarians to the secure system." delay={0.1} />
                                    <StepCard step={2} icon={<BookMarked className="h-5 w-5 text-primary" />} title="Library Management" description="Librarian manages the book collection and handles issuing and returning of books." delay={0.2} />
                                    <StepCard step={3} icon={<Users className="h-5 w-5 text-primary" />} title="Student Access" description="Student registers and logs in to browse available books and view their borrowing history." delay={0.3} />
                                </div>
                            </div>
                        </motion.div>
                        <motion.div className="relative group" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative bg-card/60 backdrop-blur-sm p-10 rounded-2xl border border-border/50 shadow-md hover:shadow-lg transition-all duration-500 group-hover:scale-[1.02]">
                                <div className="flex items-center justify-center gap-4 mb-6"><div className="bg-gradient-to-br from-accent to-primary p-3 rounded-full"><Library className="h-8 w-8 text-white" /></div><h3 className="text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Public Libraries</h3></div>
                                <p className="text-muted-foreground mb-8 text-center text-lg">An open collection for everyone to explore.</p>
                                <div className="space-y-6">
                                    <StepCard step={1} icon={<Library className="h-5 w-5 text-accent" />} title="Public Setup" description="Admin registers a public library and assigns a dedicated librarian." delay={0.1} />
                                    <StepCard step={2} icon={<BookMarked className="h-5 w-5 text-accent" />} title="Collection Building" description="Librarian adds and manages the books available in the public collection." delay={0.2} />
                                    <StepCard step={3} icon={<Sparkles className="h-5 w-5 text-accent" />} title="Open Access" description="Anyone can visit the public library section to view available books without needing to log in." delay={0.3} />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-gradient-to-br from-primary/5 to-accent/5 relative overflow-hidden">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                        <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Ready to Transform Your Library?</h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">Join the future of library management with LibraryVerse. Beautiful, secure, and incredibly easy to use.</p>
                        <motion.div className="flex flex-col sm:flex-row justify-center gap-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}>
                            <Button variant="default" size="lg" onClick={() => navigate("/register")} className="group">
                                Start Your Journey <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
