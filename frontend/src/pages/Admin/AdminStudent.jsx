import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchStudents } from "@/state/user/Action";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";

const AdminStudent = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.user);
    const jwt = localStorage.getItem("jwt");

    useEffect(() => {
        dispatch(fetchStudents(jwt));
    }, [dispatch, jwt]);

    const handleDelete = (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            dispatch(deleteUser(userId, jwt));
        }
    };

    return (
        <div className="relative min-h-screen bg-background text-foreground px-4 py-8 font-outfit">
            <div className="absolute top-4 right-4">
                <Link to="/admin">
                    <Button className="flex items-center gap-2">
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </Button>
                </Link>
            </div>

            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">
                    User Management
                </h1>

                {loading && <p className="text-center">Loading users...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                {!loading && users.length === 0 && (
                    <p className="text-center text-muted-foreground">No students found.</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {users.map((user) => (
                        <Card key={user.id} className="rounded-2xl shadow-lg transition duration-300">
                            <CardContent className="p-6 space-y-2">
                                <p className="text-lg font-semibold">{user.email}</p>
                                <p className="text-sm text-muted-foreground">
                                    {user.role
                                        .replace("ROLE_", "")
                                        .toLowerCase()
                                        .replace(/^\w/, (c) => c.toUpperCase())}
                                </p>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Delete
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminStudent;
