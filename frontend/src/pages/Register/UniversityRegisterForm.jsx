import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/state/auth/Action.js";

const UniversityRegisterForm = () => {
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "ROLE_ADMIN",
        universityName: "",
        city: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(formData));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                name="universityName"
                placeholder="University Name"
                className="w-full p-3 rounded bg-background placeholder-muted-foreground border border-border text-foreground"
                value={formData.universityName}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="city"
                placeholder="City"
                className="w-full p-3 rounded bg-background placeholder-muted-foreground border border-border text-foreground"
                value={formData.city}
                onChange={handleChange}
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-3 rounded bg-background placeholder-muted-foreground border border-border text-foreground"
                value={formData.email}
                onChange={handleChange}
                required
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

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-primary-foreground py-3 rounded font-semibold">
                Submit
            </button>
        </form>
    );
};

export default UniversityRegisterForm;
