import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "@/state/book/Action.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BookList = () => {
    const dispatch = useDispatch();
    const { books, loading, error } = useSelector((state) => state.book);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');

    useEffect(() => {
        dispatch(fetchBooks(localStorage.getItem("jwt")));
    }, [dispatch]);

    const genres = React.useMemo(() => {
        if (!books) return [];
        const genreSet = new Set(books.map(book => book.genre).filter(Boolean));
        return Array.from(genreSet);
    }, [books]);

    const filteredBooks = React.useMemo(() => {
        return books?.filter(book => {
            const matchesSearch =
                book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.author?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesGenre = selectedGenre ? book.genre === selectedGenre : true;
            return matchesSearch && matchesGenre;
        });
    }, [books, searchQuery, selectedGenre]);

    const LoaderCircle = (props) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-spin"
            {...props}
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    );

    return (
        <div className="min-h-screen bg-background text-foreground font-outfit p-4 md:p-8">
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Explore Our Collection</h1>
                <p className="text-muted-foreground mt-2">Find your next favorite book.</p>
            </header>

            <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto items-center">
                <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title or author..."
                    className="flex-grow "
                />
                <div className="flex w-full md:w-auto gap-2">
                    <Select onValueChange={setSelectedGenre} value={selectedGenre}>
                        <SelectTrigger className="w-full md:w-[240px]">
                            <SelectValue placeholder="Filter by Genre" />
                        </SelectTrigger>
                        <SelectContent>
                            {genres.map((genre) => (
                                <SelectItem className="font-outfit" key={genre} value={genre}>
                                    {genre}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {selectedGenre && (
                        <Button variant="ghost" onClick={() => setSelectedGenre('')}>Clear</Button>
                    )}
                </div>
            </div>

            <main className="max-w-7xl mx-auto">
                {loading && (
                    <div className="flex flex-col items-center justify-center text-center py-16">
                        <LoaderCircle className="h-10 w-10 text-primary" />
                        <p className="text-muted-foreground mt-4">Loading books...</p>
                    </div>
                )}

                {error && (
                    <div className="text-center py-16">
                        <p className="text-destructive font-semibold">Failed to fetch books: {error}</p>
                        <p className="text-muted-foreground mt-2">Please try refreshing the page.</p>
                    </div>
                )}

                {!loading && !error && filteredBooks?.length === 0 && (
                    <div className="text-center py-16">
                        <p className="font-semibold text-lg">No books found</p>
                        <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria.</p>
                    </div>
                )}

                {!loading && !error && filteredBooks?.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredBooks.map((book) => (
                            <Card key={book.id} className="flex flex-col h-full transition-all duration-300 hover:border-primary hover:ring-3 hover:ring-primary/50">
                                <CardHeader>
                                    <CardTitle className="truncate">{book.title}</CardTitle>
                                    <CardDescription>by {book.author}</CardDescription>
                                </CardHeader>
                                <CardFooter className="flex justify-between items-center">
                                    <Badge variant="outline">{book.genre}</Badge>
                                    <Badge variant={book.availabilityStatus === 'AVAILABLE' ? 'default' : 'destructive'}>
                                        {book.availabilityStatus}
                                    </Badge>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default BookList;
