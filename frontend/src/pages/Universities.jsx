import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUniversities } from "@/state/university/Action.js";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Universities = () => {
    const dispatch = useDispatch();
    const { universities, loading, error } = useSelector((state) => state.university);
    const [selectedUniversity, setSelectedUniversity] = useState(null);

    useEffect(() => {
        dispatch(fetchUniversities());
    }, [dispatch]);

    const handleSelect = (university) => {
        setSelectedUniversity(university);
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
                    Public Universities
                </motion.h2>

                {loading && <p className="text-muted-foreground">Loading universities...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {!loading && !error && Array.isArray(universities) && universities.length === 0 && (
                    <p className="text-muted-foreground">No universities found.</p>
                )}

                {!loading && Array.isArray(universities) && universities.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        {universities.map((uni) => (
                            <motion.div
                                key={uni.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                className="p-6 bg-card rounded-xl shadow-md border border-border flex flex-col items-start"
                            >
                                <h3 className="text-xl font-semibold">{uni.name}</h3>
                                <p className="text-muted-foreground mb-4">{uni.city}</p>
                                <Button onClick={() => handleSelect(uni)}>Select</Button>
                            </motion.div>
                        ))}
                    </div>
                )}

                {selectedUniversity && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-10 p-6 border border-border rounded-xl bg-muted text-left">
                        <h4 className="text-lg font-semibold mb-2">Selected University:</h4>
                        <p><strong>Name:</strong> {selectedUniversity.name}</p>
                        <p><strong>City:</strong> {selectedUniversity.city}</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Universities;
