import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentBooks } from "@/state/student/Action.js";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, ServerCrash } from "lucide-react";

const StudentBookList = () => {
    const dispatch = useDispatch();
    const { studentBooks, loading, error } = useSelector((state) => state.student);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');

    useEffect(() => {
        dispatch(fetchStudentBooks(localStorage.getItem("jwt")));
    }, [dispatch]);

    const handleSearchChange = (e) => setSearchQuery(e.target.value);
    const handleGenreChange = (value) => setSelectedGenre(value);

    const genres = React.useMemo(() => {
        if (!studentBooks) return [];
        const genreSet = new Set(studentBooks.map(book => book.genre).filter(Boolean));
        return Array.from(genreSet);
    }, [studentBooks]);

    const filteredBooks = React.useMemo(() => {
        if (!studentBooks) return [];
        return studentBooks.filter(book => {
            const lowercasedQuery = searchQuery.toLowerCase();
            const matchesSearch =
                book.title?.toLowerCase().includes(lowercasedQuery) ||
                book.author?.toLowerCase().includes(lowercasedQuery);
            const matchesGenre = selectedGenre ? book.genre === selectedGenre : true;
            return matchesSearch && matchesGenre;
        });
    }, [studentBooks, searchQuery, selectedGenre]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-background text-foreground px-4 pb-8 font-outfit">
            <header className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Available Books</h1>
                <p className="text-muted-foreground mt-2">Browse all books available in your university's library.</p>
            </header>

            <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">
                <Input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search by title or author..."
                    className="flex-grow bg-card"
                />
                <div className="flex w-full md:w-auto gap-2">
                    <Select onValueChange={handleGenreChange} value={selectedGenre}>
                        <SelectTrigger className="w-full md:w-[200px] bg-card">
                            <SelectValue placeholder="Filter by Genre" />
                        </SelectTrigger>
                        <SelectContent>
                            {genres.map((genre) => (
                                <SelectItem key={genre} value={genre}>
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
                    <div className="text-center py-16 flex flex-col items-center justify-center">
                        <Loader2 className="h-12 w-12 text-primary animate-spin" />
                        <p className="text-muted-foreground mt-4">Loading books...</p>
                    </div>
                )}

                {error && (
                    <div className="text-center py-16">
                        <ServerCrash className="h-12 w-12 text-destructive mx-auto" />
                        <p className="text-destructive font-semibold mt-4">Failed to fetch books</p>
                        <p className="text-muted-foreground mt-2">{error}</p>
                    </div>
                )}

                {!loading && !error && filteredBooks.length === 0 && (
                    <div className="text-center py-16">
                        <p className="font-semibold text-lg">No Books Available</p>
                        <p className="text-muted-foreground mt-2">There are currently no books in the library that match your search.</p>
                    </div>
                )}

                {!loading && !error && filteredBooks.length > 0 && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: { transition: { staggerChildren: 0.05 } }
                        }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredBooks.map((book) => (
                            <motion.div
                                key={book.id}
                                variants={{
                                    hidden: { y: 20, opacity: 0 },
                                    visible: { y: 0, opacity: 1 }
                                }}>
                                <Card className="flex flex-col h-full bg-card transition-colors">
                                    <CardHeader>
                                        <CardTitle className="truncate">{book.title}</CardTitle>
                                        <CardDescription>by {book.author}</CardDescription>
                                    </CardHeader>
                                    <CardFooter className="flex justify-between items-center mt-auto pt-4">
                                        <Badge variant="outline">{book.genre}</Badge>
                                        <Badge variant={book.availabilityStatus === 'AVAILABLE' ? 'default' : 'destructive'}>
                                            {book.availabilityStatus}
                                        </Badge>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </main>
        </div>
    );
};

export default StudentBookList;