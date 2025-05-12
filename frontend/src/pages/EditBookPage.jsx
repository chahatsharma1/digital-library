import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api.js";
import BookForm from "../pages/BookForm";

const EditBookPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/${id}`).then((res) => setBook(res.data));
    }, [id]);

    const handleUpdate = (data) => {
        axios.put(`${API_BASE_URL}/${id}`, data).then(() => navigate("/"));
    };

    return (
        <div className="p-8 bg-gray-900 min-h-screen text-white">
            <h2 className="text-2xl mb-4">Edit Book</h2>
            {book && <BookForm book={book} onSubmit={handleUpdate} onCancel={() => navigate("/")} />}
        </div>
    );
};

export default EditBookPage;
