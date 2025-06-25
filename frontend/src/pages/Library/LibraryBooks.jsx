import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooksByLibrary } from "@/state/book/Action";
import { useParams } from "react-router-dom";

const LibraryBooks = () => {
    const { libraryId } = useParams();
    const dispatch = useDispatch();
    const { books, loading, error } = useSelector((state) => state.book);

    useEffect(() => {
        if (libraryId) dispatch(fetchBooksByLibrary(libraryId));
    }, [libraryId]);

    return (
        <div className="p-6 bg-background text-foreground">
            <h2 className="text-3xl font-semibold mb-4">Books in Library</h2>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {books.map((book) => (
                    <div key={book.id} className="p-4 bg-card rounded-xl shadow border">
                        <h3 className="font-semibold text-lg">{book.title}</h3>
                        <p className="text-muted-foreground">{book.author}</p>
                        <p className="text-sm">{book.genre}</p>
                        <p className="text-xs">Status: {book.availabilityStatus}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LibraryBooks;
