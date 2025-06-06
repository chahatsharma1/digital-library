import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "@/state/user/Action";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const User = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.user);
    const jwt = localStorage.getItem("jwt");

    useEffect(() => {
        dispatch(fetchUsers(jwt));
    }, [dispatch, jwt]);

    const handleDelete = (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            dispatch(deleteUser(userId, jwt));
        }
    };

    return (
        <div className="min-h-screen p-6 bg-background text-foreground">
            <div className="flex justify-end mb-6">
                <Link to="/admin">
                    <Button size="md" className="bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-md hover:brightness-110">
                        Dashboard
                    </Button>
                </Link>
            </div>

            <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>

            {loading && <p className="text-center">Loading users...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                    <Card key={user.id} className="shadow-lg border border-border">
                        <CardContent className="p-4 space-y-2">
                            <p className="font-semibold text-lg">{user.email}</p>
                            <p className="text-sm text-muted-foreground">{user.role
                                .replace("ROLE_", "")
                                .toLowerCase()
                                .replace(/^\w/, (c) => c.toUpperCase())}</p>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDelete(user.id)}>
                                Delete
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default User;
