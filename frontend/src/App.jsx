import {Routes, Route} from "react-router-dom";
import Home from "@/pages/Home.jsx";
import Login from "@/pages/Auth/Login.jsx";
import Signup from "@/pages/Auth/Signup.jsx";
import Layout from "@/components/Layout.jsx";
import Library from "@/pages/Library/Library.jsx";
import AdminDashboard from "@/pages/Admin/AdminDashboard.jsx";
import AdminStudent from "@/pages/Admin/AdminStudent.jsx";
import AdminLibrarian from "@/pages/Admin/AdminLibrarian.jsx";
import LibrarianDashboard from "@/pages/Librarian/LibrarianDashboard.jsx";
import AddBookPage from "@/pages/Librarian/AddBookPage.jsx";
import BookList from "@/pages/Librarian/BookList.jsx";
import LibraryBooks from "@/pages/Library/LibraryBooks.jsx";
import AdminUniversity from "@/pages/Admin/AdminUniversity.jsx";
import StudentDashboard from "@/pages/Student/StudentDashboard.jsx";
import StudentBookList from "@/pages/Student/StudentBookList.jsx";
import IssueBookPage from "@/pages/Librarian/IssueBookPage.jsx";
import IssuedBookPage from "@/pages/Librarian/AllIssuedBookPage.jsx";
import ReturnBookPage from "@/pages/Librarian/ReturnBookPage.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/register" element={<Signup/>} />
                <Route path="/student" element={<StudentDashboard/>} />
                <Route path="/student/books" element={<StudentBookList/>} />
                <Route path="/admin" element={<AdminDashboard/>} />
                <Route path="/admin/students" element={<AdminStudent/>} />
                <Route path="/admin/librarians" element={<AdminLibrarian/>} />
                <Route path="/admin/university" element={<AdminUniversity/>} />
                <Route path="/librarian" element={<LibrarianDashboard/>} />
                <Route path="/librarian/books" element={<BookList/>} />
                <Route path="/librarian/add-book" element={<AddBookPage/>} />
                <Route path="/librarian/issue-book" element={<IssueBookPage/>} />
                <Route path="/librarian/issued-books" element={<IssuedBookPage/>} />
                <Route path="/librarian/return-book" element={<ReturnBookPage/>} />
                <Route path="/library/:libraryId/books" element={<LibraryBooks />} />
                <Route path="/login" element={<Login />} />
                <Route path="/library" element={<Library />} />
            </Route>
        </Routes>
    );
}

export default App;