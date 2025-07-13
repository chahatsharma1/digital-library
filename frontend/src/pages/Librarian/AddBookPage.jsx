import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {BookOpen, Save, AlertCircle, User, Tag, FileText,} from 'lucide-react';
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
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.author.trim()) newErrors.author = 'Author is required';
        if (!formData.genre.trim()) newErrors.genre = 'Genre is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            await dispatch(addBook(formData, localStorage.getItem("jwt")));

            setFormData({
                title: '',
                author: '',
                genre: '',
            });

            toast.success('Book added successfully!');
        } catch (error) {
            console.error('Error adding book:', error);
            alert('Error adding book. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5" />
                                Book Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {/* Only 3 Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center gap-2">
                                            <FileText className="h-4 w-4" />
                                            Book Title *
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                                                errors.title ? 'border-red-500' : 'border-border'
                                            }`}
                                            placeholder="Enter book title"
                                        />
                                        {errors.title && (
                                            <p className="text-sm text-red-500 flex items-center gap-1">
                                                <AlertCircle className="h-3 w-3" />
                                                {errors.title}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center gap-2">
                                            <User className="h-4 w-4" />
                                            Author *
                                        </label>
                                        <input
                                            type="text"
                                            name="author"
                                            value={formData.author}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                                                errors.author ? 'border-red-500' : 'border-border'
                                            }`}
                                            placeholder="Enter author name"
                                        />
                                        {errors.author && (
                                            <p className="text-sm text-red-500 flex items-center gap-1">
                                                <AlertCircle className="h-3 w-3" />
                                                {errors.author}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center gap-2">
                                            <Tag className="h-4 w-4" />
                                            Genre *
                                        </label>
                                        <input
                                            type="text"
                                            name="genre"
                                            value={formData.genre}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                                                errors.genre ? 'border-red-500' : 'border-border'
                                            }`}
                                            placeholder="Enter genre (e.g., Fiction, Science, History)"
                                        />
                                        {errors.genre && (
                                            <p className="text-sm text-red-500 flex items-center gap-1">
                                                <AlertCircle className="h-3 w-3" />
                                                {errors.genre}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-6">
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={loading || isSubmitting}
                                        className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                        <Save className="h-4 w-4" />
                                        {isSubmitting || loading ? 'Adding Book...' : 'Add Book'}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => window.history.back()}
                                        className="flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-2 rounded-lg hover:bg-secondary/90 transition-colors">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AddBookPage;