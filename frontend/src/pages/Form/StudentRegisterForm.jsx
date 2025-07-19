import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/state/auth/Action.js";
import { fetchUniversities } from "@/state/university/Action.js";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Loader2, Eye, EyeOff } from "lucide-react";

const StudentRegisterForm = ({ onSuccess }) => {
    const dispatch = useDispatch();
    const { error: authError, loading } = useSelector((state) => state.auth);
    const { universities, loading: universitiesLoading } = useSelector((state) => state.university);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "ROLE_STUDENT",
        universityId: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        dispatch(fetchUniversities());
    }, [dispatch]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUniversityChange = (value) => {
        setFormData({ ...formData, universityId: value });
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
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="Jane Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="student@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                    <Input
                        id="password"
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
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="university">University</Label>
                <Select
                    name="universityId"
                    value={formData.universityId}
                    onValueChange={handleUniversityChange}
                    required>
                    <SelectTrigger id="university" className="w-full">
                        <SelectValue placeholder={universitiesLoading ? "Loading..." : "Select University"} />
                    </SelectTrigger>
                    <SelectContent>
                        {Array.isArray(universities) && universities.length > 0 ? (
                            universities.map((uni) => (
                                <SelectItem key={uni.id} value={uni.id.toString()} className="font-outfit">
                                    {uni.name}
                                </SelectItem>
                            ))
                        ) : (
                            <SelectItem value="none" disabled>
                                No universities available
                            </SelectItem>
                        )}
                    </SelectContent>
                </Select>
            </div>

            {authError && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-destructive/10 text-destructive text-sm font-medium p-3 rounded-md flex items-center gap-2"
                >
                    <AlertCircle className="h-4 w-4" />
                    {authError}
                </motion.div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? "Registering..." : "Register as Student"}
            </Button>
        </form>
    );
};

export default StudentRegisterForm;