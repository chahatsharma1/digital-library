import { useState } from "react";
import StudentRegisterForm from "@/pages/Form/StudentRegisterForm";
import UniversityRegisterForm from "@/pages/Form/UniversityRegisterForm";
import PublicLibraryRegisterForm from "@/pages/Form/LibraryRegisterForm";

const Signup = () => {
    const [activeTab, setActiveTab] = useState("student");

    return (
        <div className="bg-background text-foreground px-4 py-10 flex flex-col items-center font-mono">
            <h2 className="text-4xl font-bold mb-6">Register</h2>

            <div className="flex space-x-4 mb-8 border-b border-border">
                <button
                    className={`pb-2 text-lg font-semibold ${
                        activeTab === "student"
                            ? "text-primary border-b-2 border-primary"
                            : "text-muted-foreground"
                    }`}
                    onClick={() => setActiveTab("student")}
                >
                    Student
                </button>

                <button
                    className={`pb-2 text-lg font-semibold ${
                        activeTab === "university"
                            ? "text-primary border-b-2 border-primary"
                            : "text-muted-foreground"
                    }`}
                    onClick={() => setActiveTab("university")}
                >
                    University
                </button>

                <button
                    className={`pb-2 text-lg font-semibold ${
                        activeTab === "library"
                            ? "text-primary border-b-2 border-primary"
                            : "text-muted-foreground"
                    }`}
                    onClick={() => setActiveTab("library")}
                >
                    Public Library
                </button>
            </div>

            <div className="w-full max-w-xl bg-card p-8 rounded-2xl shadow-lg">
                {activeTab === "student" && <StudentRegisterForm />}
                {activeTab === "university" && <UniversityRegisterForm />}
                {activeTab === "library" && <PublicLibraryRegisterForm />} {/* ✅ Add this */}
            </div>
        </div>
    );
};

export default Signup;
