import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {Loader2, AlertCircle } from 'lucide-react';
import { addBook } from '@/state/book/Action.js';
import { toast } from "react-hot-toast";

const AddBookPage = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.book || {});

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Title is required.';
        if (!formData.author.trim()) newErrors.author = 'Author is required.';
        if (!formData.genre.trim()) newErrors.genre = 'Genre is required.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            await dispatch(addBook(formData, localStorage.getItem("jwt"))).unwrap();
            toast.success('Book added successfully!');
            setFormData({ title: '', author: '', genre: '' });
        } catch (error) {
            console.error('Error adding book:', error);
            toast.error(error.message || 'Error adding book. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-outfit p-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mx-auto"
            >
                <Card className="shadow-lg border-border/40">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-bold">Add a New Book</CardTitle>
                        <CardDescription>Fill out the form below to add a new book to the collection.</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-6 pt-2">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="e.g., The Great Gatsby"
                                    className={errors.title ? 'border-destructive' : ''}
                                />
                                {errors.title && <p className="text-sm text-destructive flex items-center gap-1"><AlertCircle className="h-4 w-4" />{errors.title}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="author">Author</Label>
                                <Input
                                    id="author"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleInputChange}
                                    placeholder="e.g., F. Scott Fitzgerald"
                                    className={errors.author ? 'border-destructive' : ''}
                                />
                                {errors.author && <p className="text-sm text-destructive flex items-center gap-1"><AlertCircle className="h-4 w-4" />{errors.author}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="genre">Genre</Label>
                                <Input
                                    id="genre"
                                    name="genre"
                                    value={formData.genre}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Fiction"
                                    className={errors.genre ? 'border-destructive' : ''}
                                />
                                {errors.genre && <p className="text-sm text-destructive flex items-center gap-1"><AlertCircle className="h-4 w-4" />{errors.genre}</p>}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => window.history.back()}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {loading ? 'Adding...' : 'Add Book'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </motion.div>
        </div>
    );
};

export default AddBookPage;
