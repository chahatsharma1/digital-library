import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BookOpen, PlusSquare, Share2, RotateCcw, ClipboardList, ArrowRight } from "lucide-react";

const actions = [
    {
        title: "View All Books",
        description: "Browse and manage the book collection.",
        icon: <BookOpen className="h-8 w-8 text-primary" />,
        link: "/librarian/books",
    },
    {
        title: "Add New Book",
        description: "Add a new book to the library.",
        icon: <PlusSquare className="h-8 w-8 text-primary" />,
        link: "/librarian/add-book",
    },
    {
        title: "Issue Book",
        description: "Assign books to students.",
        icon: <Share2 className="h-8 w-8 text-primary" />,
        link: "/librarian/issue-book",
    },
    {
        title: "Return Book",
        description: "Mark books as returned.",
        icon: <RotateCcw className="h-8 w-8 text-primary" />,
        link: "/librarian/return-book",
    },
    {
        title: "Issued Books",
        description: "View all issued book records.",
        icon: <ClipboardList className="h-8 w-8 text-primary" />,
        link: "/librarian/issued-books",
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


const LibrarianDashboard = () => {
    return (
        <div className="min-h-screen bg-background text-foreground font-outfit">
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center mb-12">
                <h1 className="text-3xl md:text-3xl font-bold tracking-tight">
                    Dashboard
                </h1>
                <p className="text-muted-foreground mt-3 text-lg">
                    Welcome back!
                </p>
            </motion.header>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {actions.map((item) => (
                    <motion.div
                        key={item.title}
                        variants={itemVariants}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="h-full"
                    >
                        <Link to={item.link} className="h-full block">
                            <Card className="h-full rounded-2xl shadow-md transition-all duration-300 group relative overflow-hidden bg-card/60 hover:bg-card hover:shadow-xl hover:ring-3 hover:ring-primary/50">
                                <CardContent className="p-4 flex flex-col items-start gap-4 h-full">
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

export default LibrarianDashboard;
