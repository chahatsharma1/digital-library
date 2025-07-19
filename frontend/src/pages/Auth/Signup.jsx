import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import StudentRegisterForm from "@/pages/Form/StudentRegisterForm";
import UniversityRegisterForm from "@/pages/Form/UniversityRegisterForm";
import PublicLibraryRegisterForm from "@/pages/Form/LibraryRegisterForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Signup = () => {
    const [activeTab, setActiveTab] = useState("student");
    const navigate = useNavigate();

    const handleSuccess = () => {
        toast.success("Registration successful! Redirecting to login...");
        setTimeout(() => {
            navigate("/login");
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-background text-foreground flex justify-center p-4 pt-14 sm:pt-10 font-outfit">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <Card className="shadow-lg border-border/20">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl font-bold">Create an Account</CardTitle>
                            <CardDescription>Choose your account type to get started.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <TabsList className="grid w-full grid-cols-3 mb-6">
                                <TabsTrigger value="student">Student</TabsTrigger>
                                <TabsTrigger value="university">University</TabsTrigger>
                                <TabsTrigger value="library">Public Library</TabsTrigger>
                            </TabsList>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <TabsContent value="student" className="mt-0">
                                        <StudentRegisterForm onSuccess={handleSuccess} />
                                    </TabsContent>
                                    <TabsContent value="university" className="mt-0">
                                        <UniversityRegisterForm onSuccess={handleSuccess} />
                                    </TabsContent>
                                    <TabsContent value="library" className="mt-0">
                                        <PublicLibraryRegisterForm onSuccess={handleSuccess} />
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

export default Signup;
