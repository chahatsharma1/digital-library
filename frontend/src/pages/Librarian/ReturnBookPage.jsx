import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllIssues, returnBook } from "@/state/book/Action";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const ReturnBookPage = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { issues } = useSelector((state) => state.book);

    useEffect(() => {
        if (jwt) {
            dispatch(fetchAllIssues(jwt));
        }
    }, [dispatch, jwt]);

    const handleReturn = (issueId) => {
        dispatch(returnBook(issueId, jwt));
    };

    const unreturnedIssues = issues?.filter(issue => !issue.returnDate) || [];

    const sortedIssues = unreturnedIssues.sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate));

    return (
        <div className="min-h-screen bg-background text-foreground px-4 py-8 font-outfit">
            <h1 className="text-3xl font-bold text-center mb-8">Return a Book</h1>

            <div className="max-w-5xl mx-auto">
                {sortedIssues.length > 0 ? (
                    <div className="rounded-lg border shadow-md overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-muted bg-muted">
                                    <TableHead className="font-semibold">Book Title</TableHead>
                                    <TableHead className="font-semibold">Student</TableHead>
                                    <TableHead className="font-semibold">Issued Date</TableHead>
                                    <TableHead className="text-right font-semibold">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sortedIssues.map((issue) => (
                                    <TableRow key={issue.id}>
                                        <TableCell className="font-medium">{issue.book?.title}</TableCell>
                                        <TableCell>{issue.student?.name}</TableCell>
                                        <TableCell>
                                            {new Date(issue.issueDate).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleReturn(issue.id)}
                                            >
                                                Return
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 mt-10">
                        There are no outstanding books to be returned.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ReturnBookPage;