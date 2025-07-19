import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/state/auth/Action.js";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Loader2, Eye, EyeOff } from "lucide-react";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("student");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "ROLE_STUDENT",
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const errorTimerRef = useRef(null);

    useEffect(() => {
        return () => clearTimeout(errorTimerRef.current);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) return;

        setIsLoading(true);
        setError(null);
        clearTimeout(errorTimerRef.current);

        try {
            await dispatch(login(formData, navigate));
        } catch (err) {
            const errorMessage = err.message || "Invalid credentials. Please try again.";
            setError(errorMessage);
            errorTimerRef.current = setTimeout(() => setError(null), 5000);
        } finally {
            setIsLoading(false);
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        const newRole = {
            student: "ROLE_STUDENT",
            admin: "ROLE_ADMIN",
            librarian: "ROLE_LIBRARIAN",
        }[tab];
        setFormData({ email: "", password: "", role: newRole });
        setError(null);
        clearTimeout(errorTimerRef.current);
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <div className="bg-slate-50 dark:bg-background text-foreground flex justify-center p-4 pt-16 sm:pt-16 font-outfit">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Tabs value={activeTab} onValueChange={handleTabChange}>
                    <Card className="shadow-lg border-border/20">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
                            <CardDescription>Select your role to sign in to your account.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <TabsList className="grid w-full grid-cols-3 mb-6">
                                <TabsTrigger value="student">Student</TabsTrigger>
                                <TabsTrigger value="admin">Admin</TabsTrigger>
                                <TabsTrigger value="librarian">Librarian</TabsTrigger>
                            </TabsList>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}>
                                    <TabsContent value={activeTab} className="mt-0">
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    placeholder="name@example.com"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                />
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
                                                        aria-label={showPassword ? "Hide password" : "Show password"}>
                                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                    </Button>
                                                </div>
                                            </div>
                                            {error && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="bg-destructive/10 text-destructive text-sm font-medium p-3 rounded-md flex items-center gap-2">
                                                    <AlertCircle className="h-4 w-4" />
                                                    {error}
                                                </motion.div>
                                            )}
                                            <Button type="submit" className="w-full" disabled={isLoading}>
                                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                {isLoading ? "Signing in..." : `Sign in as ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
                                            </Button>
                                        </form>
                                    </TabsContent>
                                </motion.div>
                            </AnimatePresence>
                        </CardContent>
                    </Card>
                </Tabs>
            </motion.div>
        </div>
    );
};

export default Login;
