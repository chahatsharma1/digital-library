import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLibrarian, addLibrarian, deleteUser } from "@/state/user/Action";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { AlertCircle, Loader2, Eye, EyeOff, UserPlus, Trash2 } from "lucide-react";

const AdminLibrarian = () => {
    const jwt = localStorage.getItem("jwt");
    const dispatch = useDispatch();
    const { librarian, loading, error } = useSelector((store) => store.user);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        dispatch(fetchLibrarian(jwt));
    }, [dispatch, jwt]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddLibrarian = async (e) => {
        e.preventDefault();
        try {
            await dispatch(addLibrarian(formData, jwt)).unwrap();
            setFormData({ name: "", email: "", password: "" });
            setShowForm(false);
            dispatch(fetchLibrarian(jwt));
        } catch (err) {
            console.error("Failed to add librarian:", err);
        }
    };

    const handleDeleteLibrarian = async () => {
        try {
            await dispatch(deleteUser(librarian.id, jwt)).unwrap();
            dispatch(fetchLibrarian(jwt));
        } catch (err) {
            console.error("Failed to delete librarian:", err);
        }
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const renderContent = () => {
        if (loading) {
            return (
                <div className="text-center py-16 flex flex-col items-center justify-center">
                    <Loader2 className="h-12 w-12 text-primary animate-spin" />
                    <p className="text-muted-foreground mt-4">Loading Librarian Data...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="text-center py-16">
                    <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
                    <p className="text-destructive font-semibold mt-4">Failed to fetch data</p>
                    <p className="text-muted-foreground mt-2">{error}</p>
                </div>
            );
        }

        if (librarian?.email) {
            return (
                <Card className="w-full max-w-md bg-card">
                    <CardHeader>
                        <CardTitle>Librarian Details</CardTitle>
                        <CardDescription>The current librarian for this institution.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label>Name</Label>
                            <p className="text-lg font-semibold">{librarian.name}</p>
                        </div>
                        <div>
                            <Label>Email</Label>
                            <p className="text-lg font-semibold">{librarian.email}</p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleDeleteLibrarian} variant="destructive" className="w-full" disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
                            Delete Librarian
                        </Button>
                    </CardFooter>
                </Card>
            );
        }

        if (showForm) {
            return (
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Add New Librarian</CardTitle>
                        <CardDescription>Fill out the form to add a librarian.</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleAddLibrarian}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" placeholder="John Doe" value={formData.name} onChange={handleInputChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" name="email" placeholder="librarian@example.com" value={formData.email} onChange={handleInputChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input id="password" type={showPassword ? "text" : "password"} name="password" placeholder="••••••••" value={formData.password} onChange={handleInputChange} required />
                                    <Button type="button" variant="ghost" size="icon" className="absolute inset-y-0 right-0 h-full px-3 text-muted-foreground" onClick={togglePasswordVisibility}>
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex gap-4">
                            <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="w-1/2">Cancel</Button>
                            <Button type="submit" className="w-1/2" disabled={loading}>
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Add Librarian
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            );
        }

        return (
            <div className="text-center max-w-md mx-auto">
                <p className="mb-6 text-lg text-muted-foreground">No librarian exists for this university.</p>
                <Button onClick={() => setShowForm(true)} size="lg">
                    <UserPlus className="mr-2 h-5 w-5" />
                    Add Librarian
                </Button>
            </div>
        );
    };

    return (
        <div className="bg-slate-50 dark:bg-background text-foreground px-4 pb-8 py-10 font-outfit">
            <header className="text-center mb-10">
                <h1 className="text-3xl md:text-3xl font-bold tracking-tight">Librarian Management</h1>
                <p className="text-muted-foreground mt-2">Add, view, or delete the librarian for your institution.</p>
            </header>
            <main className="flex justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={librarian?.id || showForm.toString()}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="w-full max-w-md"
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};

export default AdminLibrarian;