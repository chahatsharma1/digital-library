import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLibrarian, addLibrarian, deleteUser } from "@/state/user/Action";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {Link} from "react-router-dom";

const AdminLibrarian = () => {
    const jwt = localStorage.getItem("jwt");
    const dispatch = useDispatch();
    const { librarian, loading, error } = useSelector((store) => store.user);
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
            dispatch(fetchLibrarian(jwt));
        } catch {
            alert("Failed to add librarian");
        }
    };

    const handleDeleteLibrarian = async () => {
        if (!window.confirm("Are you sure you want to delete the librarian?")) return;
        try {
            await dispatch(deleteUser(librarian.id, jwt));
            dispatch(fetchLibrarian(jwt));
        } catch {
            alert("Failed to delete librarian");
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
            <h1 className="text-3xl font-bold mb-6 text-center">Librarian Management</h1>

            {loading ? (
                <p className="text-center">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : librarian && librarian?.email ? (
                <Card className="max-w-md w-full mx-auto">
                    <CardContent className="p-6 space-y-4">
                        <div>
                            <p className="text-xs uppercase text-muted-foreground">Name</p>
                            <p className="text-lg font-semibold text-foreground">{librarian.name}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase text-muted-foreground">Email</p>
                            <p className="text-lg font-semibold text-foreground">{librarian.email}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase text-muted-foreground">Role</p>
                            <p className="text-sm text-foreground">
                                {librarian.role
                                    ?.replace("ROLE_", "")
                                    .toLowerCase()
                                    .replace(/^\w/, (c) => c.toUpperCase())}
                            </p>
                        </div>
                        <Button variant="destructive" onClick={handleDeleteLibrarian} className="mt-4 w-full">
                            Delete Librarian
                        </Button>
                    </CardContent>
                </Card>
            ) : showForm ? (
                <div className="max-w-md w-full mx-auto bg-card p-8 rounded-xl shadow space-y-6 border">
                    <div>
                        <Label htmlFor="name" className="mb-1 block font-medium">
                            Name
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="w-full"
                        />
                    </div>
                    <div>
                        <Label htmlFor="email" className="mb-1 block font-medium">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="w-full"
                        />
                    </div>
                    <div>
                        <Label htmlFor="password" className="mb-1 block font-medium">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            className="w-full"
                        />
                    </div>
                    <div className="flex gap-4 justify-end pt-4 border-t border-muted">
                        <Button onClick={handleAddLibrarian} className="px-6 py-2">
                            Add Librarian
                        </Button>
                        <Button variant="secondary" onClick={() => setShowForm(false)} className="px-6 py-2">
                            Cancel
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="text-center max-w-md mx-auto">
                    <p className="mb-6 text-lg">No librarian exists for this university.</p>
                    <Button onClick={() => setShowForm(true)} className="px-8 py-3">
                        Add Librarian
                    </Button>
                </div>
            )}
        </div>
    );
};

export default AdminLibrarian;