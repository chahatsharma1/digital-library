import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchLibraries } from "@/state/library/Action.js";
import { useNavigate } from "react-router-dom";
import {Search, ArrowRight, Loader2, ServerCrash } from "lucide-react";

const LibraryPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { libraries, loading, error } = useSelector((state) => state.library);

    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        dispatch(fetchLibraries());
    }, [dispatch]);

    const handleSelect = (library) => {
        navigate(`/library/${library.id}/books`, { state: { library } });
    };

    const filteredLibraries = libraries?.filter((lib) =>
        lib.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lib.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <motion.div
            className="min-h-screen bg-background text-foreground px-4 py-8 font-outfit"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}>
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-10">
                    <h1 className="text-3xl md:text-3xl font-bold tracking-tight">Public Libraries</h1>
                    <p className="text-muted-foreground mt-2">Select a library to explore its collection.</p>
                </header>

                <div className="mb-10 flex justify-center">
                    <div className="relative w-full max-w-lg">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by library name or city..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-lg bg-card/60 border border-border focus:ring-2 focus:ring-primary transition-all shadow-sm"
                        />
                    </div>
                </div>

                {loading && (
                    <div className="flex flex-col items-center justify-center text-center py-16">
                        <Loader2 className="h-10 w-10 text-primary animate-spin" />
                        <p className="text-muted-foreground mt-4">Loading Libraries...</p>
                    </div>
                )}

                {error && (
                    <div className="flex flex-col items-center justify-center text-center py-16">
                        <ServerCrash className="h-12 w-12 text-destructive" />
                        <p className="text-destructive font-semibold mt-4">Failed to fetch libraries</p>
                        <p className="text-muted-foreground mt-2">{error}</p>
                    </div>
                )}

                {!loading && !error && filteredLibraries?.length === 0 && (
                    <div className="text-center py-16">
                        <p className="font-semibold text-lg">No libraries found</p>
                        <p className="text-muted-foreground mt-2">Try adjusting your search or check back later.</p>
                    </div>
                )}

                {!loading && !error && filteredLibraries?.length > 0 && (
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filteredLibraries.map((lib) => (
                            <div
                                key={lib.id}
                                onClick={() => handleSelect(lib)}
                                className="w-full h-full p-6 rounded-2xl bg-card/50 text-card-foreground border border-border shadow-md hover:shadow-xl hover:ring-3 hover:ring-primary/50 transition-all group cursor-pointer relative">
                                <h3 className="text-lg font-bold mb-1">{lib.name}</h3>
                                <p className="text-sm text-muted-foreground">{lib.city}</p>
                                <ArrowRight className="h-5 w-5 text-muted-foreground absolute top-6 right-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default LibraryPage;
