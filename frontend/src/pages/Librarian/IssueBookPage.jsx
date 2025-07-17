import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { issueBookToStudent } from "@/state/book/Action";
import { fetchBooks } from "@/state/book/Action.js";
import { fetchStudentsByLibrarian } from "@/state/user/Action.js";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";

const IssueBookPage = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    const { books } = useSelector(state => state.book);
    const { users: students } = useSelector(state => state.user);
    const { loading, issuedBook, error } = useSelector(state => state.book);
    const [bookId, setBookId] = useState('');
    const [studentId, setStudentId] = useState('');
    const [localError, setLocalError] = useState('');

    useEffect(() => {
        dispatch(fetchBooks(jwt));
        dispatch(fetchStudentsByLibrarian(jwt));
    }, [dispatch, jwt]);

    useEffect(() => {
        if (issuedBook) {
            toast.success(`Book issued successfully!`);
            setBookId('');
            setStudentId('');
            setLocalError('');
        }
    }, [issuedBook]);

    useEffect(() => {
        if (error) {
            setLocalError(error);
        }
    }, [error]);

    const handleIssueBook = () => {
        if (!bookId || !studentId) {
            setLocalError('Please select both book and student.');
            return;
        }
        setLocalError('');
        dispatch(issueBookToStudent(bookId, studentId, jwt));
    };

    return (
        <div className="min-h-screen bg-background text-foreground px-4 py-8 font-outfit">
            <h1 className="text-3xl font-bold text-center mb-6">Issue Book to Student</h1>

            <Card className="max-w-md mx-auto p-6 shadow-lg rounded-2xl">
                <CardContent className="space-y-4">

                    <div>
                        <label className="block mb-1 font-medium">Select Book</label>
                        <select
                            value={bookId}
                            onChange={(e) => setBookId(e.target.value)}
                            className="w-full p-2 border rounded bg-popover text-sm"
                        >
                            <option value="">-- Choose a Book --</option>
                            {books && books.map(book => (
                                <option key={book.id} value={book.id}>
                                    {book.title} by {book.author}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Select Student</label>
                        <select
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            className="w-full p-2 border rounded bg-popover text-sm"
                        >
                            <option value="">-- Choose a Student --</option>
                            {students && students.map(student => (
                                <option key={student.id} value={student.id}>
                                    {student.id} - {student.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {localError && (
                        <div className="text-red-600 text-sm text-center">{localError}</div>
                    )}

                    <Button
                        onClick={handleIssueBook}
                        disabled={loading}
                        className="w-full"
                    >
                        {loading ? "Issuing..." : "Issue Book"}
                    </Button>

                </CardContent>
            </Card>
        </div>
    );
};

export default IssueBookPage;
