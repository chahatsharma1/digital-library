import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUniversityStaff } from "@/state/user/Action.js";
import { motion } from "framer-motion";
import { Card, CardContent} from "@/components/ui/card";
import { Avatar, AvatarFallback} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { UserCog, UserSquare, Mail, ServerCrash} from "lucide-react";

const StaffSkeletonCard = () => (
    <div className="flex items-center space-x-4 p-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[200px]" />
        </div>
    </div>
);

const UniversityStaffPage = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { staff, loading, error } = useSelector((state) => state.user);

    useEffect(() => {
        if (jwt) {
            dispatch(fetchUniversityStaff(jwt));
        }
    }, [dispatch, jwt]);

    const { admins, librarians } = useMemo(() => {
        const admins = staff.filter(s => s.role === 'ROLE_ADMIN');
        const librarians = staff.filter(s => s.role === 'ROLE_LIBRARIAN');
        return { admins, librarians };
    }, [staff]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-background text-foreground px-4 pb-8 font-outfit">
            <header className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">University Staff</h1>
                <p className="text-muted-foreground mt-2">Contact information for your university's administrators and librarians.</p>
            </header>

            <main className="max-w-4xl mx-auto space-y-10">
                {loading && (
                    <div>
                        <Skeleton className="h-8 w-1/4 mb-4" />
                        <Card>
                            <StaffSkeletonCard />
                            <StaffSkeletonCard />
                        </Card>
                    </div>
                )}

                {error && (
                    <div className="text-center py-16">
                        <ServerCrash className="h-12 w-12 text-destructive mx-auto" />
                        <p className="text-destructive font-semibold mt-4">Failed to fetch staff details</p>
                        <p className="text-muted-foreground mt-2">{error}</p>
                    </div>
                )}

                {!loading && !error && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
                        className="space-y-10">
                        <motion.section variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                                <UserCog className="h-6 w-6 text-primary" />
                                Administrators
                            </h2>
                            <Card>
                                <CardContent className="p-0 divide-y divide-border">
                                    {admins.length > 0 ? admins.map(admin => (
                                        <div key={admin.id} className="flex items-center gap-4 p-4">
                                            <Avatar>
                                                <AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-grow">
                                                <p className="font-semibold">{admin.name}</p>
                                                <p className="text-sm text-muted-foreground flex items-center gap-1.5"><Mail className="h-3 w-3"/> {admin.email}</p>
                                            </div>
                                            <Badge variant="destructive">Admin</Badge>
                                        </div>
                                    )) : <p className="p-4 text-muted-foreground">No administrators found.</p>}
                                </CardContent>
                            </Card>
                        </motion.section>

                        <motion.section variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                                <UserSquare className="h-6 w-6 text-primary" />
                                Librarians
                            </h2>
                            <Card>
                                <CardContent className="p-0 divide-y divide-border">
                                    {librarians.length > 0 ? librarians.map(librarian => (
                                        <div key={librarian.id} className="flex items-center gap-4 p-4">
                                            <Avatar>
                                                <AvatarFallback>{librarian.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-grow">
                                                <p className="font-semibold">{librarian.name}</p>
                                                <p className="text-sm text-muted-foreground flex items-center gap-1.5"><Mail className="h-3 w-3"/> {librarian.email}</p>
                                            </div>
                                            <Badge variant="secondary">Librarian</Badge>
                                        </div>
                                    )) : <p className="p-4 text-muted-foreground">No librarians found.</p>}
                                </CardContent>
                            </Card>
                        </motion.section>
                    </motion.div>
                )}
            </main>
        </div>
    );
};

export default UniversityStaffPage;