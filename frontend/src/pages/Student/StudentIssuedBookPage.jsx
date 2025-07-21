import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, ServerCrash, BookCheck, BookX } from "lucide-react";
import { fetchAllIssuesForStudent } from "@/state/book/Action.js";

const BookTable = ({ title, issues, icon, emptyMessage }) => (
    <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            {icon}
            {title}
        </h2>
        {issues.length > 0 ? (
            <div className="rounded-lg border bg-card shadow-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="rounded-tl-lg bg-muted font-semibold">Book Title</TableHead>
                            <TableHead className="bg-muted font-semibold">Author</TableHead>
                            <TableHead className="bg-muted font-semibold">Issued Date</TableHead>
                            <TableHead className="rounded-tr-lg bg-muted text-right font-semibold">Return Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {issues.map((issue) => (
                            <TableRow key={issue.id}>
                                <TableCell className="font-medium">{issue.book?.title}</TableCell>
                                <TableCell>{issue.book?.author}</TableCell>
                                <TableCell>{new Date(issue.issueDate).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">
                                    {issue.returnDate ? (
                                        new Date(issue.returnDate).toLocaleDateString()
                                    ) : (
                                        <Badge variant="outline">Not Returned</Badge>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        ) : (
            <p className="text-muted-foreground mt-4">{emptyMessage}</p>
        )}
    </section>
);

const StudentIssuedBookPage = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { issues, loading, error } = useSelector((state) => state.book);

    useEffect(() => {
        if (jwt) {
            dispatch(fetchAllIssuesForStudent(jwt));
        }
    }, [dispatch, jwt]);

    const { unreturnedIssues, returnedIssues } = useMemo(() => {
        const sorted = issues ? [...issues].sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate)) : [];
        const unreturned = sorted.filter(issue => !issue.returnDate);
        const returned = sorted.filter(issue => issue.returnDate);
        return { unreturnedIssues: unreturned, returnedIssues: returned };
    }, [issues]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-background text-foreground px-4 pb-8 font-outfit">
            <header className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">My Issued Books</h1>
                <p className="text-muted-foreground mt-2">A record of all the books you have borrowed.</p>
            </header>

            <main className="max-w-5xl mx-auto space-y-10">
                {loading && (
                    <div className="text-center py-16 flex flex-col items-center justify-center">
                        <Loader2 className="h-12 w-12 text-primary animate-spin" />
                        <p className="text-muted-foreground mt-4">Loading your books...</p>
                    </div>
                )}

                {error && (
                    <div className="text-center py-16">
                        <ServerCrash className="h-12 w-12 text-destructive mx-auto" />
                        <p className="text-destructive font-semibold mt-4">Failed to fetch your books</p>
                        <p className="text-muted-foreground mt-2">{error}</p>
                    </div>
                )}

                {!loading && !error && (
                    <>
                        <BookTable
                            title="Currently Issued"
                            issues={unreturnedIssues}
                            icon={<BookX className="h-6 w-6 text-primary" />}
                            emptyMessage="You have no books currently issued."
                        />
                        <BookTable
                            title="Returned Books"
                            issues={returnedIssues}
                            icon={<BookCheck className="h-6 w-6 text-primary" />}
                            emptyMessage="You have not returned any books yet."
                        />
                    </>
                )}
            </main>
        </div>
    );
};

export default StudentIssuedBookPage;