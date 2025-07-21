import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { fetchMyUniversity, updateUniversity, deleteUniversity } from "@/state/university/Action.js";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Loader2, ServerCrash, Edit, Trash2 } from "lucide-react";

const AdminUniversity = () => {
    const dispatch = useDispatch();
    const { university, loading, error } = useSelector((state) => state.university);

    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchMyUniversity(localStorage.getItem("jwt")));
    }, [dispatch]);

    useEffect(() => {
        if (university) {
            setName(university.name);
            setCity(university.city);
        }
    }, [university]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const handleUpdateUniversity = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updateUniversity({ name, city }, localStorage.getItem("jwt"))).unwrap();
            toast.success("University details updated successfully.");
            setIsEditOpen(false);
            dispatch(fetchMyUniversity(localStorage.getItem("jwt")));
        } catch (err) {
            toast.error("Failed to update university.");
        }
    };

    const handleDeleteUniversity = async () => {
        try {
            await dispatch(deleteUniversity(localStorage.getItem("jwt"))).unwrap();
            localStorage.removeItem("jwt");
            toast.success("University deleted successfully. Logging out...");
            setTimeout(() => {
                window.location.href = "/";
            }, 2000);
        } catch (err) {
            toast.error("Failed to delete university.");
        }
    };

    return (
        <div className="min-h-screen dark:bg-background text-foreground px-4 py-6 pb-8 font-outfit">
            <header className="text-center mb-10">
                <h1 className="text-3xl md:text-3xl font-bold tracking-tight">Manage University</h1>
                <p className="text-muted-foreground mt-2">View, edit, or delete your institution's details.</p>
            </header>

            <main className="max-w-3xl mx-auto">
                {loading && !university && (
                    <div className="text-center py-16 flex flex-col items-center justify-center">
                        <Loader2 className="h-12 w-12 text-primary animate-spin" />
                        <p className="text-muted-foreground mt-4">Loading University Data...</p>
                    </div>
                )}

                {error && !university && (
                    <div className="text-center py-16">
                        <ServerCrash className="h-12 w-12 text-destructive mx-auto" />
                        <p className="text-destructive font-semibold mt-4">Failed to fetch data</p>
                        <p className="text-muted-foreground mt-2">{error}</p>
                    </div>
                )}

                {university && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8">
                        <Card >
                            <CardContent className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <Label>University Name</Label>
                                    <p className="text-lg font-semibold">{university.name}</p>
                                </div>
                                <div className="space-y-1">
                                    <Label>City</Label>
                                    <p className="text-lg font-semibold">{university.city}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Actions</CardTitle>
                                <CardDescription>Manage your university settings below.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="border rounded-lg p-4 flex justify-between items-center">
                                    <div>
                                        <h3 className="font-semibold">Edit Details</h3>
                                        <p className="text-sm text-muted-foreground">Update the name and city of your university.</p>
                                    </div>
                                    <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                                        <DialogTrigger asChild>
                                            <Button variant="outline"><Edit className="mr-2 h-4 w-4" /> Edit</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit University Details</DialogTitle>
                                            </DialogHeader>
                                            <form onSubmit={handleUpdateUniversity} className="space-y-4 pt-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="name">University Name</Label>
                                                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="city">City</Label>
                                                    <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} />
                                                </div>
                                                <DialogFooter>
                                                    <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                                                    <Button type="submit" disabled={loading}>
                                                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                        Save Changes
                                                    </Button>
                                                </DialogFooter>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                </div>

                                <div className="border border-destructive/50 bg-destructive/5 rounded-lg p-4 flex justify-between items-center">
                                    <div>
                                        <h3 className="font-semibold text-destructive">Delete University</h3>
                                        <p className="text-sm text-destructive/80">This action is permanent and cannot be undone.</p>
                                    </div>
                                    <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                                        <DialogTrigger asChild>
                                            <Button variant="destructive"><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                <DialogDescription>
                                                    This will permanently delete your university and all associated data, including librarians, students, and books.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                                                <Button variant="destructive" onClick={handleDeleteUniversity} disabled={loading}>
                                                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                    Confirm Delete
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </main>
        </div>
    );
};

export default AdminUniversity;
