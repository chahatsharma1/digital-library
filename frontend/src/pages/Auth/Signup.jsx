import { useState } from "react";
import StudentRegisterForm from "@/pages/Form/StudentRegisterForm";
import UniversityRegisterForm from "@/pages/Form/UniversityRegisterForm";
import PublicLibraryRegisterForm from "@/pages/Form/LibraryRegisterForm";
import {toast} from "react-hot-toast";
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const [activeTab, setActiveTab] = useState("student");
    const navigate = useNavigate();

    const handleSuccess = () => {
        toast.success("🎉 Registration successful!");
        setTimeout(() => {
            navigate("/login");
        }, 2000);
    };

    return (
        <div className="bg-background text-foreground px-4 py-10 flex flex-col items-center font-outfit">
            <h2 className="text-4xl font-bold mb-6">Register</h2>

            <div className="flex space-x-4 mb-8 border-b border-border">
                <button
                    className={`pb-2 text-lg font-semibold ${
                        activeTab === "student"
                            ? "text-secondary border-b-2 border-secondary"
                            : "text-muted-foreground"
                    }`}
                    onClick={() => setActiveTab("student")}>
                    Student
                </button>

                <button
                    className={`pb-2 text-lg font-semibold ${activeTab === "university"
                        ? "text-secondary border-b-2 border-secondary"
                        : "text-muted-foreground"}`}
                    onClick={() => setActiveTab("university")}>
                    University
                </button>

                <button
                    className={`pb-2 text-lg font-semibold ${activeTab === "library"
                            ? "text-secondary border-b-2 border-secondary"
                            : "text-muted-foreground"}`}
                    onClick={() => setActiveTab("library")}>
                    Public Library
                </button>
            </div>

            <div className="w-full max-w-xl bg-card/50 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-border">
                {activeTab === "student" && <StudentRegisterForm onSuccess={() => handleSuccess()} />}
                {activeTab === "university" && <UniversityRegisterForm onSuccess={() => handleSuccess()} />}
                {activeTab === "library" && <PublicLibraryRegisterForm onSuccess={() => handleSuccess()} />}
            </div>
        </div>
    );
};

export default Signup;