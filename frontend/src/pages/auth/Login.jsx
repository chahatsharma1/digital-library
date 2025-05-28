import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {loginUser} from "@/state/auth/Action.js";

const Login = () => {
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(formData));
    };

    return (
        <div className="flex justify-center items-center h-screen bg-[#0F172A] text-white">
            <form className="bg-[#1E293B] p-8 rounded-2xl shadow-lg w-full max-w-sm" onSubmit={handleSubmit}>
                <h2 className="text-2xl mb-4 font-semibold">Login</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-2 mb-4 rounded bg-[#0F172A] text-white"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-2 mb-4 rounded bg-[#0F172A] text-white"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <button className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white p-2 rounded">Login</button>
            </form>
        </div>
    );
};

export default Login;