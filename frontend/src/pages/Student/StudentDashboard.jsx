import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BookOpen, ClipboardList, Info, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const actions = [
    {
        title: "View Available Books",
        description: "Browse all available books in the library",
        icon: <BookOpen className="h-8 w-8 text-primary" />,
        link: "/student/books",
    },
    {
        title: "My Issued Books",
        description: "View the list of books you've borrowed",
        icon: <ClipboardList className="h-8 w-8 text-primary" />,
        link: "/student/my-books",
    },
    {
        title: "Library Info",
        description: "View library rules and timings",
        icon: <Info className="h-8 w-8 text-primary" />,
        link: "/student/staff",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeInOut",
        },
    },
};

const StudentDashboard = () => {
    const [studentName, setStudentName] = useState("Student");

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setStudentName(payload.name || "Student");
            } catch (error) {
                console.error("Failed to decode JWT:", error);
            }
        }
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground px-4 py-5 font-outfit">
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Welcome, {studentName}
                </h1>
                <p className="text-muted-foreground mt-3 text-lg">
                    What would you like to do today?
                </p>
            </motion.header>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
                {actions.map((item) => (
                    <motion.div
                        key={item.title}
                        variants={itemVariants}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="h-full">
                        <Link to={item.link} className="h-full block">
                            <Card className="h-full rounded-2xl shadow-md transition-all duration-300 group relative overflow-hidden bg-card/60 hover:bg-card hover:shadow-xl hover:ring-2 hover:ring-primary/50">
                                <CardContent className="p-6 flex flex-col items-start gap-4 h-full">
                                    <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                                        {item.icon}
                                    </div>
                                    <div className="flex-grow">
                                        <h2 className="text-xl font-semibold">{item.title}</h2>
                                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                                    </div>
                                    <ArrowRight className="h-5 w-5 text-muted-foreground absolute top-6 right-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default StudentDashboard;