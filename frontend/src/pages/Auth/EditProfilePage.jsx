import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, updateUserProfile, changePassword } from "@/state/user/Action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Loader2, ServerCrash, Building, MapPin, UserCircle, KeyRound, Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";

const EditProfilePage = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { userProfile, loading, error } = useSelector(state => state.user);

    const [formData, setFormData] = useState({ name: "", email: "" });
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false });
    const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

    useEffect(() => {
        if (jwt) {
            dispatch(fetchUserProfile(jwt));
        }
    }, [dispatch, jwt]);

    useEffect(() => {
        if (userProfile) {
            setFormData({ name: userProfile.name, email: userProfile.email });
        }
    }, [userProfile]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(updateUserProfile(formData, jwt));
        if (result && !result.error) {
            toast.success(result.message || "Profile updated successfully!");
            dispatch(fetchUserProfile(jwt));
        } else {
            toast.error(result.message || "Failed to update profile.");
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("New passwords do not match.");
            return;
        }
        const result = await dispatch(changePassword(passwordData, jwt));
        if (result && !result.error) {
            toast.success(result.message || "Password changed successfully!");
            setIsPasswordDialogOpen(false);
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } else {
            toast.error(result.message || "Failed to change password.");
        }
    };

    const togglePasswordVisibility = (field) => {
        setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
    };

    if (loading && !userProfile) {
        return (
            <div className="flex justify-center items-center h-full pt-16">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }

    if (error && !userProfile) {
        return (
            <div className="text-center py-16">
                <ServerCrash className="h-12 w-12 text-destructive mx-auto" />
                <p className="text-destructive font-semibold mt-4">Failed to load profile</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <header className="text-center mb-10">
                <h1 className="text-3xl md:text-3xl font-bold tracking-tight">Edit Profile</h1>
                <p className="text-muted-foreground mt-2">Update your personal and institutional information.</p>
            </header>

            <div className="grid lg:grid-cols-2 lg:gap-8 space-y-8 lg:space-y-0 max-w-6xl mx-auto">
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Your Details</CardTitle>
                        <CardDescription>Make changes to your profile here. Click save when you're done.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col">
                        <form onSubmit={handleSubmit} className="space-y-6 flex-grow flex flex-col">
                            <div className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="border-t pt-6 space-y-4">
                                    <div className="flex items-center"><UserCircle className="h-5 w-5 mr-3 text-muted-foreground" /><div><Label>Role</Label><p className="font-semibold text-muted-foreground">{userProfile?.role.replace("ROLE_", "").replace("_", " ")}</p></div></div>
                                    <div className="flex items-center"><Building className="h-5 w-5 mr-3 text-muted-foreground" /><div><Label>{userProfile?.universityName ? "University" : "Library"}</Label><p className="font-semibold text-muted-foreground">{userProfile?.universityName || userProfile?.libraryName}</p></div></div>
                                    <div className="flex items-center"><MapPin className="h-5 w-5 mr-3 text-muted-foreground" /><div><Label>City</Label><p className="font-semibold text-muted-foreground">{userProfile?.city}</p></div></div>
                                </div>
                            </div>

                            <Button type="submit" className="w-full mt-auto" disabled={loading}>
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Changes"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Security</CardTitle>
                        <CardDescription>Manage your account security settings.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-center">
                        <div className="border rounded-lg p-4 flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold">Password</h3>
                                <p className="text-sm text-muted-foreground">Change your password.</p>
                            </div>
                            <Dialog open={isPasswordDialogOpen} onOpenChange={(isOpen) => {setIsPasswordDialogOpen(isOpen);
                                if (!isOpen) {
                                    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
                                    setShowPassword({ current: false, new: false, confirm: false });
                                }
                            }}>
                                <DialogTrigger asChild>
                                    <Button variant="outline"><KeyRound className="mr-2 h-4 w-4" /> Change Password</Button>
                                </DialogTrigger>
                                <DialogContent className="font-outfit">
                                    <DialogHeader>
                                        <DialogTitle>Change Password</DialogTitle>
                                    </DialogHeader>
                                    <form onSubmit={handlePasswordSubmit} className="space-y-4 pt-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="currentPassword">Current Password</Label>
                                            <div className="relative"><Input id="currentPassword" name="currentPassword" type={showPassword.current ? "text" : "password"} value={passwordData.currentPassword} onChange={handlePasswordChange} required /><Button type="button" variant="ghost" size="icon" className="absolute inset-y-0 right-0 h-full px-3 text-muted-foreground" onClick={() => togglePasswordVisibility('current')}>{showPassword.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</Button></div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="newPassword">New Password</Label>
                                            <div className="relative"><Input id="newPassword" name="newPassword" type={showPassword.new ? "text" : "password"} value={passwordData.newPassword} onChange={handlePasswordChange} required /><Button type="button" variant="ghost" size="icon" className="absolute inset-y-0 right-0 h-full px-3 text-muted-foreground" onClick={() => togglePasswordVisibility('new')}>{showPassword.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</Button></div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                            <div className="relative"><Input id="confirmPassword" name="confirmPassword" type={showPassword.confirm ? "text" : "password"} value={passwordData.confirmPassword} onChange={handlePasswordChange} required /><Button type="button" variant="ghost" size="icon" className="absolute inset-y-0 right-0 h-full px-3 text-muted-foreground" onClick={() => togglePasswordVisibility('confirm')}>{showPassword.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</Button></div>
                                        </div>
                                        <DialogFooter>
                                            <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                                            <Button type="submit" disabled={loading}>
                                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                Update Password
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default EditProfilePage;