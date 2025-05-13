import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

const EditBookPage = ({ bookId, onClose }) => {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        genre: "",
        availabilityStatus: "AVAILABLE",
    });

    useEffect(() => {
        if (bookId) {
            axios.get(`${API_BASE_URL}/${bookId}`).then((res) => {
                setFormData(res.data);
            });
        }
    }, [bookId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`${API_BASE_URL}/${bookId}`, formData).then(() => {
            onClose?.();
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 px-6 py-4">
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input id="author" name="author" value={formData.author} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="genre">Genre</Label>
                <Input id="genre" name="genre" value={formData.genre} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="availabilityStatus">Status</Label>
                <select
                    id="availabilityStatus"
                    name="availabilityStatus"
                    value={formData.availabilityStatus}
                    onChange={handleChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:ring-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option value="AVAILABLE">Available</option>
                    <option value="CHECKED_OUT">Checked Out</option>
                </select>

            </div>
            <div className="flex justify-center gap-2 pt-4">
                <Button type="submit">
                    Save Changes
                </Button>
            </div>
        </form>
    );
};

export default EditBookPage;
