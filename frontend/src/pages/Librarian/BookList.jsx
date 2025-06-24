import React, { useEffect } from 'react';
import { fetchBooks } from "@/state/book/Action.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BookList = () => {
    const dispatch = useDispatch();
    const { books, loading, error } = useSelector(store => store.book);

    useEffect(() => {
        dispatch(fetchBooks(localStorage.getItem("jwt")));
    }, [dispatch]);

    return (
        <div className="min-h-screen px-4 py-10 bg-background text-foreground">
            <div className="max-w-6xl mx-auto bg-card rounded-xl shadow-xl p-8 border relative">
                <div className="absolute top-6 right-6">
                    <Link
                        to="/librarian"
                        className="inline-block rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium shadow hover:bg-primary/90 transition-colors">
                        Dashboard
                    </Link>
                </div>
                <h1 className="text-4xl font-bold text-center text-card-foreground mb-10 tracking-tight">
                    📚 Our Book Collection
                </h1>

                {loading && (
                    <div className="text-center py-12">
                        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto" />
                        <p className="mt-4 text-lg text-muted-foreground">Fetching books, please wait...</p>
                    </div>
                )}

                {!loading && !error && books?.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground text-xl">
                        <p>No books found.</p>
                        <p className="text-base mt-2">The library might be empty or the API returned no data.</p>
                    </div>
                )}

                {!loading && !error && books?.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {books.map((book, index) => (
                            <div
                                key={index}
                                className="bg-background border border-border hover:border-accent transition-colors duration-200 rounded-xl p-6 shadow-md hover:shadow-lg"
                            >
                                <h2 className="text-2xl font-semibold text-foreground mb-2 leading-tight">
                                    {book.title || 'Untitled Book'}
                                </h2>
                                <p className="text-muted-foreground text-lg mb-1">
                                    <span className="font-medium text-accent">Author:</span> {book.author || 'Unknown Author'}
                                </p>
                                {book.genre && (
                                    <p className="text-muted-foreground text-md">
                                        <span className="font-medium text-accent">Genre:</span> {book.genre}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {error && (
                    <div className="text-center py-12 text-destructive text-xl">
                        <p>Error: {error}</p>
                        <p className="text-base mt-2">Failed to fetch books. Please try again later.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookList;
