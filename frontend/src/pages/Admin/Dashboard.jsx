import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ShieldCheck, Users, Library } from "lucide-react";

const Dashboard = () => {
    const options = [
        {
            title: "Manage Librarian",
            description: "Assign a librarian to your university",
            icon: <ShieldCheck className="h-8 w-8 text-primary" />,
            link: "/admin/librarians",
        },
        {
            title: "Manage Users",
            description: "View and delete students or librarians",
            icon: <Users className="h-8 w-8 text-primary" />,
            link: "/admin/users",
        },
        {
            title: "Manage Admin",
            description: "Check university & librarian info",
            icon: <Library className="h-8 w-8 text-primary" />,
            link: "/universities",
        },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground px-4 py-8">
            <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold text-center mb-8"
            >
                Admin Dashboard
            </motion.h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {options.map((item, idx) => (
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

export default Dashboard;
