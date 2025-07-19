import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/state/auth/Action.js";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2, Eye, EyeOff } from "lucide-react";

const UniversityRegisterForm = ({ onSuccess }) => {
    const dispatch = useDispatch();
    const { error: authError, loading } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "ROLE_ADMIN",
        universityName: "",
        city: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(register(formData));
            onSuccess();
        } catch (err) {
            console.error("Registration failed:", err);
        }
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="admin-name">Name (Admin)</Label>
                    <Input
                        id="admin-name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="admin-email">Email</Label>
                    <Input
                        id="admin-email"
                        type="email"
                        name="email"
                        placeholder="admin@university.edu"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <div className="relative">
                    <Input
                        id="admin-password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute inset-y-0 right-0 h-full px-3 text-muted-foreground"
                        onClick={togglePasswordVisibility}
                        aria-label={showPassword ? "Hide password" : "Show password"}>
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="universityName">University Name</Label>
                    <Input
                        id="universityName"
                        name="universityName"
                        placeholder="e.g., State University"
                        value={formData.universityName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="university-city">City</Label>
                    <Input
                        id="university-city"
                        name="city"
                        placeholder="e.g., Springfield"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            {authError && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-destructive/10 text-destructive text-sm font-medium p-3 rounded-md flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    {authError}
                </motion.div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? "Registering..." : "Register University"}
            </Button>
        </form>
    );
};

export default UniversityRegisterForm;
