import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Button } from "@/components/ui/button.jsx";
import axios from "axios";
import { API_BASE_URL } from "@/config/api.js";

const EditBookPage = ({ bookId, onClose }) => {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        genre: "",
        availabilityStatus: "AVAILABLE",
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (bookId) {
            setFetching(true);
            setError(null);
            axios.get(`${API_BASE_URL}/books/${bookId}`)
                .then((res) => {
                    setFormData(res.data);
                })
                .catch((err) => {
                    setError("Failed to load book data.");
                    console.error(err);
                })
                .finally(() => {
                    setFetching(false);
                });
        }
    }, [bookId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        axios.put(`${API_BASE_URL}/books/${bookId}`, formData)
            .then(() => {
                onClose?.();
            })
            .catch((err) => {
                setError("Failed to update book.");
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };


    if (fetching) return <p>Loading book data...</p>;

    return (
        <form onSubmit={handleSubmit} className="space-y-6 px-6 py-4">
            {error && (
                <p className="text-destructive mb-4 text-center">{error}</p>
            )}
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    disabled={loading}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                    disabled={loading}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="genre">Genre</Label>
                <Input
                    id="genre"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    required
                    disabled={loading}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="availabilityStatus">Status</Label>
                <select
                    id="availabilityStatus"
                    name="availabilityStatus"
                    value={formData.availabilityStatus}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:ring-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                    <option value="AVAILABLE">Available</option>
                    <option value="CHECKED_OUT">Checked Out</option>
                </select>
            </div>
            <div className="flex justify-center gap-2 pt-4">
                <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </form>
    );
};

export default EditBookPage;
