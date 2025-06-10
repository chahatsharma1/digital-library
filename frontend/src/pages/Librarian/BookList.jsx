import React, { useEffect } from 'react';
import { fetchBooks } from "@/state/book/Action.js";
import { useDispatch, useSelector } from "react-redux";

const BookList = () => {
    const dispatch = useDispatch();
    const { books, loading, error } = useSelector(store => store.book);
    useEffect(() => {
        dispatch(fetchBooks(localStorage.getItem("jwt")));
    }, [dispatch]);


    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 font-sans">
            <div className="bg-background p-8 rounded-lg shadow-xl w-full max-w-4xl border border-gray-200">
                <h1 className="text-4xl font-extrabold text-center text-foreground mb-8 tracking-tight">
                    Our Book Collection
                </h1>

                {loading && (
                    <div className="text-center py-8">
                        <div className="animate-spin inline-block w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <p className="mt-4 text-lg text-gray-600">Fetching books, please wait...</p>
                    </div>
                )}
                {!loading && !error && books?.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground text-xl">
                        <p>No books found.</p>
                        <p className="text-base mt-2">The library might be empty or the API returned no data.</p>
                    </div>
                )}
                {!loading && !error && books?.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {books.map((book, index) => ( // No need for 'books?' here as we've checked length
                            <div key={index} className="bg-background p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 border border-blue-100">
                                <h2 className="text-2xl font-semibold text-foreground mb-2 leading-tight">
                                    {book.title || 'Untitled Book'}
                                </h2>
                                <p className="text-muted-foreground text-lg mb-1">
                                    <span className="font-medium">Author:</span> {book.author || 'Unknown Author'}
                                </p>
                                {book.genre && (
                                    <p className="text-muted-foreground text-md mb-1">
                                        <span className="font-medium">Genre:</span> {book.genre}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                {error && (
                    <div className="text-center py-8 text-red-600 text-xl">
                        <p>Error: {error}</p>
                        <p className="text-base mt-2">Failed to fetch books. Please try again later.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookList;