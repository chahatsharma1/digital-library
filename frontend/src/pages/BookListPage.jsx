import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/api.js";
import { useNavigate } from "react-router-dom";
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';
import { Button } from "@/components/ui/button.jsx"
import "../index.css";

const BookListPage = () => {
    const [books, setBooks] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.body.classList.add("dark");
            setIsDarkMode(true);
        } else {
            document.body.classList.remove("dark");
            setIsDarkMode(false);
        }
    }, []);

    const handleToggleTheme = () => {
        setIsDarkMode((prev) => {
            const newTheme = !prev;
            if (newTheme) {
                document.body.classList.add("dark");
                localStorage.setItem("theme", "dark"); // Save preference
            } else {
                document.body.classList.remove("dark");
                localStorage.setItem("theme", "light"); // Save preference
            }
            return newTheme;
        });
    };

    useEffect(() => {
        axios.get(API_BASE_URL).then((res) => setBooks(res.data));
    }, []);

    const handleDelete = (id) => {
        if (!window.confirm("Delete this book?")) return;
        axios.delete(`${API_BASE_URL}/${id}`).then(() =>
            setBooks((prev) => prev.filter((book) => book.id !== id))
        );
    };

    return (
        <div className="min-h-screen p-6 bg-background">
            <Button
                onClick={handleToggleTheme}
                variant="ghost"
                className="p-2 rounded-full
             text-black dark:text-white
             hover:bg-gray-200 dark:hover:bg-gray-800
             focus:ring-2 focus:ring-primary"
            >
                {isDarkMode ? (
                    <SunIcon className="w-5 h-5" />
                ) : (
                    <MoonIcon className="w-5 h-5" />
                )}
            </Button>

            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <h1 className="text-4xl font-bold mb-4 sm:mb-0 text-primary">📚 Book List</h1>
                <Button onClick={() => navigate("/add")}
                        className="bg-primary hover:bg-primary/90 text-white font-semibold px-5 py-2 rounded-lg transition">
                    ➕ Add Book
                </Button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full rounded-lg shadow-lg bg-card text-card-foreground">
                    <thead className="bg-muted text-muted-foreground">
                    <tr>
                        <th className="p-4 text-left">Title</th>
                        <th className="p-4 text-left">Author</th>
                        <th className="p-4 text-left">Genre</th>
                        <th className="p-4 text-left">Status</th>
                        <th className="p-4 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="p-6 text-center text-muted-foreground">
                                No books available.
                            </td>
                        </tr>
                    ) : (
                        books.map((b) => (
                            <tr key={b.id} className="border-t hover:bg-muted">
                                <td className="p-4">{b.title}</td>
                                <td className="p-4">{b.author}</td>
                                <td className="p-4">{b.genre}</td>
                                <td className="p-4">{b.availabilityStatus}</td>
                                <td className="p-4">
                                    <button
                                        onClick={() => navigate(`/edit/${b.id}`)}
                                        className="text-primary hover:underline mr-4"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(b.id)}
                                        className="text-destructive hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookListPage;