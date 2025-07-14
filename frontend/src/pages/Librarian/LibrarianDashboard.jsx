import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BookOpen, PlusSquare, Share2, RotateCcw, ClipboardList, GraduationCap } from "lucide-react";

const LibrarianDashboard = () => {
    const actions = [
        {
            title: "View All Books",
            description: "Browse and manage the book collection",
            icon: <BookOpen className="h-8 w-8 text-primary" />,
            link: "/librarian/books",
        },
        {
            title: "Add New Book",
            description: "Add a new book to the library",
            icon: <PlusSquare className="h-8 w-8 text-primary" />,
            link: "/librarian/add-book",
        },
        {
            title: "Issue Book",
            description: "Assign books to students",
            icon: <Share2 className="h-8 w-8 text-primary" />,
            link: "/librarian/issue-book",
        },
        {
            title: "Return Book",
            description: "Mark books as returned",
            icon: <RotateCcw className="h-8 w-8 text-primary" />,
            link: "/librarian/return-book",
        },
        {
            title: "Issued Books",
            description: "View all issued book records",
            icon: <ClipboardList className="h-8 w-8 text-primary" />,
            link: "/librarian/issued-books",
        },
        {
            title: "Books by Student",
            description: "Track books issued to a student",
            icon: <GraduationCap className="h-8 w-8 text-primary" />,
            link: "/librarian/student-books",
        },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground px-4 py-8 font-outfit">
            <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold text-center mb-10 font-outfit">
                Librarian Dashboard
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

export default LibrarianDashboard;