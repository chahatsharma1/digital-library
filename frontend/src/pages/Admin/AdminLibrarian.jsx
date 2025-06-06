import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchLibrarian,
    addLibrarian,
    deleteUser,
} from "@/state/user/Action";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AdminLibrarian = () => {
    const jwt = localStorage.getItem("jwt");
    const dispatch = useDispatch();

    const { librarian, loading, error } = useSelector((state) => state.user);

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        dispatch(fetchLibrarian(jwt));
    }, [dispatch, jwt]);

    const handleAddLibrarian = async () => {
        try {
            await dispatch(addLibrarian(formData, jwt));
            setFormData({ name: "", email: "", password: "" });
            setShowForm(false);
        } catch {
            alert("Failed to add librarian");
        }
    };

    const handleDeleteLibrarian = async () => {
        if (!window.confirm("Are you sure you want to delete the librarian?")) return;
        try {
            await dispatch(deleteUser(librarian.id, jwt));
        } catch {
            alert("Failed to delete librarian");
        }
    };

    return (
        <div className="min-h-screen p-6 bg-background text-foreground">
            <h1 className="text-3xl font-bold mb-6 text-center">Librarian Management</h1>

            {loading ? (
                <p className="text-center">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : librarian && librarian.email ? (
                <Card className="max-w-md mx-auto">
                    <CardContent className="p-4 space-y-2">
                        <p className="text-lg font-semibold">Name: {librarian.name}</p>
                        <p className="text-lg font-semibold">Email: {librarian.email}</p>
                        <p className="text-sm text-muted-foreground">
                            {librarian.role
                                ?.replace("ROLE_", "")
                                .toLowerCase()
                                .replace(/^\w/, (c) => c.toUpperCase())}
                        </p>
                        <Button variant="destructive" onClick={handleDeleteLibrarian}>
                            Delete Librarian
                        </Button>
                    </CardContent>
                </Card>
            ) : showForm ? (
                <div className="max-w-md mx-auto bg-card p-6 rounded-xl shadow space-y-4 border">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                            }
                            required
                        />
                    </div>
                    <div className="flex gap-2 justify-end">
                        <Button onClick={handleAddLibrarian}>Add Librarian</Button>
                        <Button variant="secondary" onClick={() => setShowForm(false)}>
                            Cancel
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <p className="mb-4">No librarian exists for this university.</p>
                    <Button onClick={() => setShowForm(true)}>Add Librarian</Button>
                </div>
            )}
        </div>
    );
};

export default AdminLibrarian;
