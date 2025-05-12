import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/api.js";
import { useNavigate } from "react-router-dom";

const BookListPage = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

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
        <div className="p-8 text-white bg-gray-900 min-h-screen">
            <div className="flex justify-between mb-4">
                <h1 className="text-3xl font-bold">📚 Books</h1>
                <button
                    onClick={() => navigate("/add")}
                    className="bg-green-500 px-4 py-2 rounded">
                    ➕ Add Book
                </button>
            </div>
            <table className="w-full text-left bg-gray-800 rounded shadow">
                <thead className="bg-gray-700">
                <tr>
                    <th className="p-2">Title</th>
                    <th>Author</th>
                    <th>Genre</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {books.map((b) => (
                    <tr key={b.id} className="border-t border-gray-700">
                        <td className="p-2">{b.title}</td>
                        <td>{b.author}</td>
                        <td>{b.genre}</td>
                        <td>{b.availabilityStatus}</td>
                        <td>
                            <button
                                onClick={() => navigate(`/edit/${b.id}`)}
                                className="text-blue-400 mr-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(b.id)}
                                className="text-red-400"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookListPage;
