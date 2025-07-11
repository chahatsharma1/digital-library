import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchLibraries } from "@/state/library/Action.js";
import { useNavigate } from "react-router-dom";

const Library = () => {
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
        <div className="min-h-screen px-4 py-10 font-outfit bg-gradient-to-b from-muted/10 to-background text-foreground">
            <div className="max-w-7xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold mb-8"
                >
                    Public Library
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-8 flex justify-center"
                >
                    <input
                        type="text"
                        placeholder="Search by name or city..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full md:w-1/2 px-5 py-3 rounded-lg
                                   bg-card/60 backdrop-blur-md
                                   border border-border
                                   text-foreground placeholder-muted-foreground
                                   shadow-sm focus:ring-2 focus:ring-primary
                                   transition"
                    />
                </motion.div>

                {loading && (
                    <p className="text-muted-foreground">Loading Libraries...</p>
                )}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && filteredLibraries?.length === 0 && (
                    <p className="text-muted-foreground">No libraries found.</p>
                )}

                {!loading && filteredLibraries?.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4">
                        {filteredLibraries.map((lib) => (
                            <motion.div
                                key={lib.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                onClick={() => handleSelect(lib)}
                                className="w-full h-full p-6 rounded-2xl
                                           bg-card/50 backdrop-blur-md
                                           text-card-foreground
                                           border border-border shadow-md
                                           hover:shadow-xl hover:border-primary
                                           transition duration-300
                                           group cursor-pointer"
                            >
                                <p className="text-lg font-bold mb-3">{lib.name}</p>
                                <p className="text-sm text-muted-foreground mb-1">
                                    {lib.city}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Library;
