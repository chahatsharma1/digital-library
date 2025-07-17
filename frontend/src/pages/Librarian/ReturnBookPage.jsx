import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllIssues, returnBook } from "@/state/book/Action";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const IssuedBooksPage = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    const { issues, returnedBook } = useSelector((state) => state.book);

    useEffect(() => {
        dispatch(fetchAllIssues(jwt));
        console.log(issues)
    }, [dispatch, jwt]);

    useEffect(() => {
        if (returnedBook) {
            toast.success("Book returned successfully!");
            dispatch(fetchAllIssues(jwt));
        }
    }, [returnedBook, dispatch, jwt]);

    const handleReturn = (issueId) => {
        dispatch(returnBook(issueId, jwt));
    };

    return (
        <div className="min-h-screen bg-background text-foreground px-4 py-8 font-outfit">
            <h1 className="text-3xl font-bold text-center mb-6">Issued Books</h1>

            <div className="space-y-4 max-w-3xl mx-auto">
                {issues?.length > 0 ? (
                    issues.map((issue) => (
                        <Card key={issue.id} className="shadow rounded-lg">
                            <CardContent className="flex justify-between items-center p-4">
                                <div>
                                    <p><strong>Book:</strong> {issue?.book?.title}</p>
                                    <p><strong>Student:</strong> {issue?.student?.name}</p>
                                    <p><strong>Issued Date:</strong> {issue?.issueDate}</p>
                                </div>
                                <Button onClick={() => handleReturn(issue.id)}>Return Book</Button>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No books have been issued yet.</p>
                )}
            </div>
        </div>
    );
};

export default IssuedBooksPage;
