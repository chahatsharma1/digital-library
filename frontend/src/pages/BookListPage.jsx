import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/api.js";
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';
import { Button } from "@/components/ui/button.jsx";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import "../index.css";
import AddBookPage from "@/pages/AddBookPage.jsx";
import EditBookPage from "@/pages/EditBookPage.jsx";

const BookListPage = () => {
    const [books, setBooks] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState(null);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

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
                localStorage.setItem("theme", "dark");
            } else {
                document.body.classList.remove("dark");
                localStorage.setItem("theme", "light");
            }
            return newTheme;
        });
    };

    const reloadBooks = () => {
        axios.get(`${API_BASE_URL}/books`).then((res) => setBooks(res.data));
    };

    useEffect(() => {
        reloadBooks();
    }, []);

    const handleDelete = (id) => {
        if (!window.confirm("Delete this book?")) return;
        axios.delete(`${API_BASE_URL}/books/${id}`).then(() =>
            setBooks((prev) => prev.filter((book) => book.id !== id))
        );
    };

    const handleEdit = (bookId) => {
        setSelectedBookId(bookId);
        setIsEditDialogOpen(true);
    };

    return (
        <div className="min-h-screen p-6 bg-background text-foreground transition-colors">
            <div className="flex justify-end mb-4">
                <Button onClick={handleToggleTheme} variant="ghost" className="p-2 rounded-full text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 ">
                    {isDarkMode ? (
                        <SunIcon className="w-5 h-5" />
                    ) : (
                        <MoonIcon className="w-5 h-5" />
                    )}
                </Button>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold text-primary mb-4 sm:mb-0">📚 Book List</h1>

                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button
                            className="bg-primary hover:bg-primary/90 text-white font-semibold px-5 py-2 rounded-lg transition"
                            onClick={() => setIsAddDialogOpen(true)}>
                            ➕ Add Book
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg bg-card text-card-foreground shadow-xl rounded-2xl p-8">
                        <DialogTitle className="text-3xl font-bold mb-6">📘 Add a New Book</DialogTitle>
                        <AddBookPage
                            onClose={() => {
                                reloadBooks();
                                setIsAddDialogOpen(false);
                            }}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="w-full max-w-5xl mx-auto overflow-hidden rounded-2xl shadow-xl bg-card text-card-foreground border border-border">
                <table className="w-full border-separate border-spacing-0 text-sm sm:text-base">
                    <thead className="bg-muted text-muted-foreground">
                    <tr>
                        <th scope="col" className="p-4 text-left rounded-tl-2xl">Title</th>
                        <th scope="col" className="p-4 text-left">Author</th>
                        <th scope="col" className="p-4 text-left">Genre</th>
                        <th scope="col" className="p-4 text-left">Status</th>
                        <th scope="col" className="p-4 text-left rounded-tr-2xl">Actions</th>
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
                        books.map((b, index) => {
                            const isLast = index === books.length - 1;
                            return (
                                <tr key={b.id} className="group transition hover:bg-muted">
                                    <td className={`p-4 ${isLast ? "rounded-bl-2xl" : ""}`}>{b.title}</td>
                                    <td className="p-4">{b.author}</td>
                                    <td className="p-4">{b.genre}</td>
                                    <td className="p-4">{b.availabilityStatus.replace("_", " ")}</td>
                                    <td className={`p-4 ${isLast ? "rounded-br-2xl" : ""}`}>
                                        <Dialog
                                            open={selectedBookId === b.id && isEditDialogOpen}
                                            onOpenChange={(open) => {
                                                if (!open) {
                                                    setSelectedBookId(null);
                                                    setIsEditDialogOpen(false);
                                                }}}>
                                            <DialogTrigger asChild>
                                                <button
                                                    onClick={() => handleEdit(b.id)}
                                                    className="text-primary hover:underline mr-4">
                                                    Edit
                                                </button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-lg bg-card text-card-foreground shadow-xl rounded-2xl p-8">
                                                <DialogTitle>Edit Book</DialogTitle>
                                                <EditBookPage
                                                    bookId={b.id}
                                                    onClose={() => {
                                                        reloadBooks();
                                                        setSelectedBookId(null);
                                                        setIsEditDialogOpen(false);
                                                    }}
                                                />
                                            </DialogContent>
                                        </Dialog>
                                        <button
                                            onClick={() => handleDelete(b.id)}
                                            className="text-destructive hover:underline">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookListPage;
