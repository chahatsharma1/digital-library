import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllIssues } from "@/state/book/Action";
import { Card, CardContent } from "@/components/ui/card";

const IssuedBooksPage = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    const { issues } = useSelector(state => state.book);

    useEffect(() => {
        if (jwt) {
            dispatch(fetchAllIssues(jwt));
        }
    }, [dispatch, jwt]);

    return (
        <div className="min-h-screen bg-background text-foreground p-6 font-outfit">
            <h1 className="text-3xl font-bold text-center mb-6">All Issued Books</h1>

            {issues && issues.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {issues.map(issue => (
                        <Card key={issue.id} className="shadow-md rounded-2xl">
                            <CardContent className="p-4 space-y-2">
                                <h2 className="font-bold text-lg">Issue ID: {issue.id}</h2>
                                <p><span className="font-medium">Book:</span> {issue.book?.title} by {issue.book?.author}</p>
                                <p><span className="font-medium">Student:</span> {issue.student?.name} (ID: {issue.student?.id})</p>
                                <p><span className="font-medium">Issued Date:</span> {new Date(issue.issueDate).toLocaleDateString()}</p>
                                <p><span className="font-medium">Status:</span> {issue.returned ? "Returned" : "Issued"}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No books have been issued yet.</p>
            )}
        </div>
    );
};

export default IssuedBooksPage;
