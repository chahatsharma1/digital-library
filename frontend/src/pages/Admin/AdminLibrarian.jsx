import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLibrarian, addLibrarian, deleteUser } from "@/state/user/Action";
import { Button } from "@/components/ui/button";
import { Link} from "react-router-dom";
import { LayoutDashboard} from "lucide-react";
import { motion } from "framer-motion";

const AdminLibrarian = () => {
    const jwt = localStorage.getItem("jwt");
    const dispatch = useDispatch();
    const { librarian, loading, error } = useSelector((store) => store.user);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });

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
        <div className="bg-background text-foreground min-h-screen px-4 py-8 font-outfit relative">
            <div className="absolute top-4 right-4">
                <Link to="/admin">
                    <Button className="flex items-center gap-2">
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </Button>
                </Link>
            </div>

            <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold text-center mb-8"
            >
                Librarian Management
            </motion.h1>

            <div className="flex justify-center">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : librarian?.email ? (
                    <div className="bg-card/50 backdrop-blur-md p-8 rounded-2xl border border-border shadow-md w-full max-w-md space-y-4">
                        <div>
                            <p className="text-xs uppercase text-muted-foreground">Name</p>
                            <p className="text-lg font-semibold">{librarian.name}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase text-muted-foreground">Email</p>
                            <p className="text-lg font-semibold">{librarian.email}</p>
                        </div>

                        <div className="flex gap-4 pt-4 bg-sec">
                            <Button onClick = {handleDeleteLibrarian()} type="submit" className="w-full bg-secondary hover:bg-secondary">
                                Delete
                            </Button>
                        </div>
                    </div>
                ) : showForm ? (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleAddLibrarian();
                        }}
                        className="w-full max-w-md bg-card/50 backdrop-blur-md p-8 rounded-2xl border border-border shadow-md space-y-6"
                    >
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="w-full p-3 rounded bg-background placeholder-muted-foreground border border-border text-foreground"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="w-full p-3 rounded bg-background placeholder-muted-foreground border border-border text-foreground"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full p-3 rounded bg-background placeholder-muted-foreground border border-border text-foreground"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />

                        <p className="text-xs text-muted-foreground -mt-4">Minimum 6 characters recommended</p>

                        <div className="flex gap-4 pt-2">
                            <Button type="submit" className="w-1/2">
                                Add Librarian
                            </Button>
                            <Button type="button" variant="secondary" onClick={() => setShowForm(false)} className="w-1/2">
                                Cancel
                            </Button>
                        </div>

                    </form>
                ) : (
                    <div className="text-center max-w-md mx-auto">
                        <p className="mb-6 text-lg">No librarian exists for this university.</p>
                        <Button onClick={() => setShowForm(true)} className="px-8 py-3">
                            Add Librarian
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminLibrarian;
