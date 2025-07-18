import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllIssues } from "@/state/book/Action";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const IssuedBooksPage = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { issues } = useSelector(state => state.book);

    useEffect(() => {
        if (jwt) {
            dispatch(fetchAllIssues(jwt));
        }
    }, [dispatch, jwt]);

    const sortedIssues = issues
        ? [...issues].sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate))
        : [];

    return (
        <div className="min-h-screen bg-background text-foreground p-6 font-outfit">
            <h1 className="text-3xl font-bold text-center mb-8">All Issued Books</h1>

            <div className="max-w-7xl mx-auto">
                {sortedIssues.length > 0 ? (
                    <div className="rounded-lg border shadow-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="font-semibold">Issue ID</TableHead>
                                    <TableHead className="font-semibold">Book Title</TableHead>
                                    <TableHead className="font-semibold">Author</TableHead>
                                    <TableHead className="font-semibold">Student</TableHead>
                                    <TableHead className="font-semibold">Issued Date</TableHead>
                                    <TableHead className="font-semibold">Return Date</TableHead>
                                    <TableHead className="font-semibold text-right">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sortedIssues.map(issue => (
                                    <TableRow key={issue.id}>
                                        <TableCell>{issue.id}</TableCell>
                                        <TableCell className="font-medium">{issue.book?.title}</TableCell>
                                        <TableCell>{issue.book?.author}</TableCell>
                                        <TableCell>{issue.student?.name}</TableCell>
                                        <TableCell>
                                            {new Date(issue.issueDate).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            {issue.returnDate
                                                ? new Date(issue.returnDate).toLocaleDateString()
                                                : "Not Returned"}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Badge variant={issue?.returnDate ? "secondary" : "default"}>
                                                {issue?.returnDate ? "Returned" : "Issued"}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 mt-10">No books have been issued yet.</p>
                )}
            </div>
        </div>
    );
};

export default IssuedBooksPage;