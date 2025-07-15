import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BookOpen, ClipboardList, Info } from "lucide-react";

const StudentDashboard = () => {
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
            link: "/student/library-info",
        },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground px-4 py-8 font-outfit">
            <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold text-center mb-10 font-outfit">
                Student Dashboard
            </motion.h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {actions.map((item, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="cursor-pointer"
                    >
                        <Link to={item.link}>
                            <Card className="rounded-2xl shadow-lg transition duration-300">
                                <CardContent className="p-6 flex flex-col items-start gap-3">
                                    {item.icon}
                                    <h2 className="text-xl font-semibold">{item.title}</h2>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default StudentDashboard;