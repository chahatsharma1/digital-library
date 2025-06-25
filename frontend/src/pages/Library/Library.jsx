import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button.jsx";
import {fetchLibraries} from "@/state/library/Action.js";
import {useNavigate} from "react-router-dom";

const Library = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { libraries, loading, error } = useSelector((state) => state.library);

    useEffect(() => {
        dispatch(fetchLibraries())

    }, [dispatch]);

    const handleSelect = (library) => {
        navigate(`/library/${library.id}/books`, { state: { library } });
    };


    return (
        <div className="min-h-screen px-4 py-10 bg-background text-foreground">
            <div className="max-w-5xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold mb-6"
                >
                    Public Library
                </motion.h2>

                {loading && <p className="text-muted-foreground">Loading Libraries...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {!loading && !error && Array.isArray(libraries) && libraries.length === 0 && (
                    <p className="text-muted-foreground">No Library found.</p>
                )}

                {!loading && Array.isArray(libraries) && libraries.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        {libraries.map((lib) => (
                            <motion.div
                                key={lib.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                className="p-6 bg-card rounded-xl shadow-md border border-border flex flex-col items-start"
                            >
                                <h3 className="text-xl font-semibold">{lib.name}</h3>
                                <p className="text-muted-foreground mb-4">{lib.city}</p>
                                <Button onClick={() => handleSelect(lib)}>Select</Button>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Library;
