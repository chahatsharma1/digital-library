import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/state/auth/Action.js";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error } = useSelector((state) => state.auth);

    const [activeTab, setActiveTab] = useState("student");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "ROLE_STUDENT",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(login(formData, navigate));

        if (result.error) {
            toast.error(result.message);
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setFormData({
            email: "",
            password: "",
            role:
                tab === "student"
                    ? "ROLE_STUDENT"
                    : tab === "admin"
                        ? "ROLE_ADMIN"
                        : "ROLE_LIBRARIAN",
        });
    };

    return (
        <div className="bg-background text-foreground flex flex-col items-center justify-center px-4 py-10 font-outfit">
            <h2 className="text-4xl font-bold mb-6">Login</h2>

            <div className="flex space-x-6 mb-8 border-b border-border">
                <button
                    className={`pb-2 text-lg font-semibold ${
                        activeTab === "student"
                            ? "text-secondary border-b-2 border-secondary"
                            : "text-muted-foreground"
                    }`}
                    onClick={() => handleTabChange("student")}>
                    Student Login
                </button>
                <button
                    className={`pb-2 text-lg font-semibold ${
                        activeTab === "admin"
                            ? "text-secondary border-b-2 border-secondary"
                            : "text-muted-foreground"
                    }`}
                    onClick={() => handleTabChange("admin")}>
                    Admin Login
                </button>
                <button
                    className={`pb-2 text-lg font-semibold ${
                        activeTab === "librarian"
                            ? "text-secondary border-b-2 border-secondary"
                            : "text-muted-foreground"
                    }`}
                    onClick={() => handleTabChange("librarian")}>
                    Librarian Login
                </button>
            </div>

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-card/50 backdrop-blur-md p-8 rounded-2xl border border-border shadow-md space-y-6">
            <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-3 rounded bg-background placeholder-muted-foreground border border-border text-foreground"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoFocus
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-3 rounded bg-background placeholder-muted-foreground border border-border text-foreground"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                {error && <p className="text-red-500 text-center text-sm">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-dark text-primary-foreground py-3 rounded font-semibold"
                >
                    Login as {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </button>
            </form>
        </div>
    );
};

export default Login;
