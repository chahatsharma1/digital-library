import React, { useEffect, useState } from 'react';
import { fetchBooks } from "@/state/book/Action.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BookList = () => {
    const dispatch = useDispatch();
    const { books, loading, error } = useSelector(store => store.book);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');

    useEffect(() => {
        dispatch(fetchBooks(localStorage.getItem("jwt")));
    }, [dispatch]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const handleGenreChange = (e) => {
        setSelectedGenre(e.target.value);
    };

    const getGenres = () => {
        const genres = books?.map(book => book.genre).filter(Boolean);
        return Array.from(new Set(genres));
    };

    const filteredBooks = books?.filter(book => {
        const matchesSearch =
            book.title?.toLowerCase().includes(searchQuery) ||
            book.author?.toLowerCase().includes(searchQuery);

        const matchesGenre = selectedGenre ? book.genre === selectedGenre : true;

        return matchesSearch && matchesGenre;
    });

    return (
        <div className="min-h-screen px-4 py-10 bg-background text-foreground">
            <div className="max-w-6xl mx-auto bg-card rounded-2xl shadow-xl p-8 border border-border relative">
                <div className="absolute top-6 right-6">
                    <Link
                        to="/librarian"
                        className="inline-block rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium shadow hover:bg-primary/90 transition-all duration-300"
                    >
                        Dashboard
                    </Link>
                </div>

                <h1 className="text-4xl font-bold text-center text-card-foreground mb-10 tracking-tight relative z-10">
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        📚 Browse Books
                    </span>
                </h1>

                <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between">
                    <input
                        type="text"
                        placeholder="Search by title or author..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full md:w-1/2 px-4 py-2 rounded-xl border border-border bg-popover text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                    />

                    <select
                        value={selectedGenre}
                        onChange={handleGenreChange}
                        className="w-full md:w-1/3 px-4 py-2 rounded-xl border border-border bg-popover text-foreground focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-300"
                    >
                        <option value="">All Genres</option>
                        {getGenres().map((genre, index) => (
                            <option key={index} value={genre}>
                                {genre}
                            </option>
                        ))}
                    </select>
                </div>

                {loading && (
                    <div className="text-center py-12 animate-fade-in">
                        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto" />
                        <p className="mt-4 text-lg text-muted-foreground">Fetching books...</p>
                    </div>
                )}

                {!loading && filteredBooks?.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground text-xl animate-fade-in">
                        <p>No books found for your search or filter.</p>
                    </div>
                )}

                {!loading && filteredBooks?.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                        {filteredBooks.map((book, index) => (
                            <div
                                key={index}
                                className="bg-popover border border-border hover:border-accent transition-all duration-300 transform hover:scale-[1.02] rounded-xl p-6 shadow-md hover:shadow-xl"
                            >
                                <h2 className="text-2xl font-semibold text-card-foreground mb-2 leading-tight">
                                    {book.title || 'Untitled Book'}
                                </h2>
                                <p className="text-muted-foreground text-lg mb-1">
                                    <span className="font-medium text-accent">Author:</span> {book.author || 'Unknown'}
                                </p>
                                {book.genre && (
                                    <p className="text-muted-foreground text-md">
                                        <span className="font-medium text-secondary">Genre:</span> {book.genre}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {error && (
                    <div className="text-center py-12 text-destructive text-xl animate-fade-in">
                        <p>Error: {error}</p>
                        <p className="text-base mt-2">Failed to fetch books.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookList;
