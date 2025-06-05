import { useState } from "react";
import StudentRegisterForm from "../Register/StudentRegisterForm";
import UniversityRegisterForm from "../Register/UniversityRegisterForm";

const Signup = () => {
    const [activeTab, setActiveTab] = useState("student");

    return (
        <div className="bg-background text-foreground px-4 py-10 flex flex-col items-center">
            <h2 className="text-4xl font-bold mb-6">Register</h2>

            <div className="flex space-x-4 mb-8 border-b border-border">
                <button
                    className={`pb-2 text-lg ${
                        activeTab === "student"
                            ? "text-primary border-b-2 border-primary"
                            : "text-muted-foreground"
                    }`}
                    onClick={() => setActiveTab("student")}>
                    Student Registration
                </button>
                <button
                    className={`pb-2 text-lg ${
                        activeTab === "university"
                            ? "text-primary border-b-2 border-primary"
                            : "text-muted-foreground"
                    }`}
                    onClick={() => setActiveTab("university")}
                >
                    University Registration
                </button>
            </div>

            <div className="w-full max-w-xl bg-card p-8 rounded-2xl shadow-lg">
                {activeTab === "student" ? (
                    <StudentRegisterForm />
                ) : (
                    <UniversityRegisterForm />
                )}
            </div>
        </div>
    );
};

export default Signup;
