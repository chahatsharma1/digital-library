import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api.js";
import BookForm from "../pages/BookForm";

const AddBookPage = () => {
    const navigate = useNavigate();
    const handleAdd = (data) => {
        axios.post(API_BASE_URL, data).then(() => navigate("/"));
    };
    return (
        <div className="p-8 bg-gray-900 min-h-screen text-white">
            <h2 className="text-2xl mb-4">Add Book</h2>
            <BookForm onSubmit={handleAdd} onCancel={() => navigate("/")} />
        </div>
    );
};

export default AddBookPage;
