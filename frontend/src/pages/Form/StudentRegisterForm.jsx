import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/state/auth/Action.js";
import {fetchUniversities} from "@/state/university/Action.js";

const StudentRegisterForm = ({ onSuccess }) => {
    const dispatch = useDispatch();
    const { error } = useSelector((store) => store.auth);
    const { universities } = useSelector((store) => store.university);
    const [formData, setFormData] = useState({
        name : "",
        email: "",
        password: "",
        role: "ROLE_STUDENT",
        universityId: "",
    });

    useEffect(() => {
        dispatch(fetchUniversities());
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(formData));
        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="name"
                name="name"
                placeholder="Name"
                className="w-full p-3 rounded bg-background placeholder-muted-foreground border border-border text-foreground"
                value={formData.name}
                onChange={handleChange}
                required
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

            <select
                name="universityId"
                value={formData.universityId}
                onChange={handleChange}
                className="w-full p-3 rounded bg-background text-foreground border border-border"
                required
            >
                <option value="" disabled className="text-muted-foreground">
                    Select University
                </option>

                {Array.isArray(universities) && universities.length > 0 ? (
                    universities.map((uni) => (
                        <option key={uni.id} value={uni.id} className="text-foreground">
                            {uni.name}
                        </option>
                    ))
                ) : (
                    <option disabled>Loading universities...</option>
                )}
            </select>


            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-primary-foreground py-3 rounded font-semibold"
            >
                Submit
            </button>
        </form>
    );
};

export default StudentRegisterForm;
