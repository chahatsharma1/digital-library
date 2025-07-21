import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchStudents } from "@/state/user/Action";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, ServerCrash, Trash2, Search } from "lucide-react";

const AdminStudent = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.user);
    const jwt = localStorage.getItem("jwt");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        dispatch(fetchStudents(jwt));
    }, [dispatch, jwt]);

    const handleDelete = (userId) => {
        dispatch(deleteUser(userId, jwt));
    };

    const filteredStudents = useMemo(() => {
        if (!users) return [];
        return users.filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [users, searchQuery]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-background text-foreground px-4 pb-8 font-outfit">
            <header className="text-center pt-8 mb-10">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Student Management</h1>
                <p className="text-muted-foreground mt-2">View and manage all student accounts.</p>
            </header>

            <main className="max-w-6xl mx-auto">
                <div className="mb-6 flex justify-end">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 bg-card"
                        />
                    </div>
                </div>

                {loading && (
                    <div className="text-center py-16 flex flex-col items-center justify-center">
                        <Loader2 className="h-12 w-12 text-primary animate-spin" />
                        <p className="text-muted-foreground mt-4">Loading students...</p>
                    </div>
                )}

                {error && (
                    <div className="text-center py-16">
                        <ServerCrash className="h-12 w-12 text-destructive mx-auto" />
                        <p className="text-destructive font-semibold mt-4">Failed to fetch students</p>
                        <p className="text-muted-foreground mt-2">{error}</p>
                    </div>
                )}

                {!loading && !error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="rounded-lg border bg-card shadow-md overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted hover:bg-muted">
                                    <TableHead className="font-semibold rounded-tl-lg">Name</TableHead>
                                    <TableHead className="font-semibold">Email</TableHead>
                                    <TableHead className="font-semibold text-right rounded-tr-lg">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredStudents.length > 0 ? (
                                    filteredStudents.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="font-medium">{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(user.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center text-muted-foreground py-10">
                                            No students found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </motion.div>
                )}
            </main>
        </div>
    );
};

export default AdminStudent;