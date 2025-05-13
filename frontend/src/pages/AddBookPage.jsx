import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

const AddBookPage = ({ onClose }) => {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        genre: "",
        availabilityStatus: "AVAILABLE",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(API_BASE_URL, formData).then(() => {
            onClose?.();
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-4 sm:p-8">
            <div>
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full p-2"
                />
            </div>
            <div>
                <Label htmlFor="author">Author</Label>
                <Input
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full p-2"
                />
            </div>
            <div>
                <Label htmlFor="genre">Genre</Label>
                <Input
                    id="genre"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full p-2"
                />
            </div>
            <div>
                <Label htmlFor="availabilityStatus">Status</Label>
                <select
                    id="availabilityStatus"
                    name="availabilityStatus"
                    value={formData.availabilityStatus}
                    onChange={handleChange}
                    className="w-full mt-2 p-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                    <option value="AVAILABLE">Available</option>
                    <option value="CHECKED_OUT">Checked Out</option>
                </select>
            </div>
            <div className="flex justify-center gap-4 pt-6">
                <Button type="submit">
                    Save
                </Button>
            </div>
        </form>
    );
};

export default AddBookPage;
