import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import {fetchMyUniversity, updateUniversity, deleteUniversity,} from "@/state/university/Action.js";
import {Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter,} from "@/components/ui/dialog";

const AdminUniversity = () => {
    const dispatch = useDispatch();
    const { university, loading, error } = useSelector((state) => state.university);

    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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
        if (error) toast.error(error);
    }, [error]);



    const handleUpdateUniversity = async () => {
        await dispatch(updateUniversity({ name, city }, localStorage.getItem("jwt")));
        toast.success("🎉 University details updated.");
        setIsDialogOpen(false);
        dispatch(fetchMyUniversity(localStorage.getItem("jwt")));
    };

    const handleDeleteUniversity = async () => {
        await dispatch(deleteUniversity(localStorage.getItem("jwt")));
        localStorage.removeItem("jwt");

        toast.error("❌ University deleted successfully");
        window.location.href = "/";
    };

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6 font-outfit">
            <h2 className="text-2xl font-semibold font-outfit text-center">Manage University</h2>
            {university && (
                <div className="text-center text-muted-foreground">
                    <p className="text-xl">Current University: <span className="font-medium">{university.name}</span></p>
                    <p className="text-xl">City: <span className="font-medium">{university.city}</span></p>
                </div>
            )}
            <div className="border rounded-md px-4 py-3 flex justify-between items-center">
                <span className="text-base font-medium">Do you want to edit university details?</span>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-primary hover:bg-primary/80" onClick={() => {setIsDialogOpen(true);} }>
                            Edit University
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="font-outfit">Edit University Details</DialogTitle>
                        </DialogHeader>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdateUniversity();
                            }}
                            className="space-y-3 pt-4 font-outfit">
                            <Input
                                onChange={(e) => setName(e.target.value)}
                                placeholder="University Name"
                            />
                            <Input
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="City"
                            />
                            <DialogFooter>
                                <Button className="bg-primary hover:bg-primary/80" type="submit" disabled={loading}>
                                    Save Changes
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

            </div>
            <div className="border rounded-md px-4 py-3 flex justify-between items-center">
                <span className="text-base font-medium">
                    Do you want to delete your university?
                </span>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="destructive"
                        >
                            Delete University
                        </Button>

                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="font-outfit">Are you absolutely sure?</DialogTitle>
                        </DialogHeader>
                        <p className="text-base text-muted-foreground font-outfit">
                            This action cannot be undone. It will permanently delete your university and all associated data.
                        </p>
                        <DialogFooter className="pt-4 font-outfit text-base">
                            <Button variant="destructive"
                                onClick={handleDeleteUniversity}
                                disabled={loading}>
                                Confirm Delete
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default AdminUniversity;