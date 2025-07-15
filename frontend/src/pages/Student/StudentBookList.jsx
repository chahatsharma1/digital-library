import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchStudentBooks} from "@/state/student/Action.js";

const StudentBookList = () => {
    const dispatch = useDispatch();
    const { studentBooks, loading, error } = useSelector((state) => state.student);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');

    useEffect(() => {
        dispatch(fetchStudentBooks(localStorage.getItem("jwt")));
        console.log(studentBooks);
    }, [dispatch]);

    const handleSearchChange = (e) => setSearchQuery(e.target.value.toLowerCase());
    const handleGenreChange = (e) => setSelectedGenre(e.target.value);

    const getGenres = () => {
        const genres = studentBooks?.map(book => book.genre).filter(Boolean);
        return Array.from(new Set(genres));
    };

    const filteredBooks = studentBooks?.filter(studentBooks => {
        const matchesSearch =
            studentBooks.title?.toLowerCase().includes(searchQuery) ||
            studentBooks.author?.toLowerCase().includes(searchQuery);
        const matchesGenre = selectedGenre ? studentBooks.genre === selectedGenre : true;
        return matchesSearch && matchesGenre;
    });

    return (
        <div className="p-4 min-h-screen bg-background text-foreground font-outfit flex flex-col items-center">
            <div className="mb-4 w-full max-w-sm">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search by title or author..."
                    className="w-full px-3 py-2 rounded-md text-sm border border-border bg-popover text-foreground placeholder-muted-foreground shadow-sm focus:ring-2 focus:ring-primary transition"
                />
            </div>

            <div className="mb-8 w-full max-w-xs text-center">
                <label className="text-sm font-medium mb-1 text-muted-foreground block">
                    Filter by Genre
                </label>
                <select
                    value={selectedGenre}
                    onChange={handleGenreChange}
                    className="w-full px-3 py-2 text-sm rounded-md border border-border bg-popover text-foreground shadow-sm focus:ring-2 focus:ring-secondary transition">
                    <option value="">All Genres</option>
                    {getGenres().map((genre, index) => (
                        <option key={index} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>
            </div>

            {loading && <p className="text-sm text-muted-foreground animate-pulse text-center">Loading books...</p>}
            {error && <p className="text-sm text-destructive text-center">Failed to fetch books: {error}</p>}
            {!loading && filteredBooks?.length === 0 && (
                <p className="text-sm text-muted-foreground text-center">No books found.</p>
            )}

            {!loading && filteredBooks?.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full px-4">
                    {filteredBooks.map((book) => (
                        <div
                            key={book.id}
                            className="w-full h-full p-5 rounded-2xl bg-card text-card-foreground border border-border shadow-md hover:shadow-xl hover:border-primary transition duration-300 group">
                            <p className="text-lg font-bold mb-2">{book.title}</p>
                            <p className="text-sm text-muted-foreground mb-1">
                                <span className="font-medium">Author:</span> {book.author}
                            </p>
                            <p className="text-sm text-muted-foreground mb-1">
                                <span className="font-medium">Status:</span> {book.availabilityStatus}
                            </p>
                            <p className="text-sm inline-block px-2 py-1 rounded bg-accent text-accent-foreground mb-2">
                                Genre: {book.genre}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StudentBookList;