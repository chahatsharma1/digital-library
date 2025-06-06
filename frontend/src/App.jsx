import {Routes, Route} from "react-router-dom";
import BookListPage from "@/pages/Book/BookListPage.jsx";
import AddBookPage from "@/pages/Book/AddBookPage.jsx";
import EditBookPage from "@/pages/Book/EditBookPage.jsx";
import Home from "@/pages/Home.jsx";
import Login from "@/pages/Auth/Login.jsx";
import Signup from "@/pages/Auth/Signup.jsx";
import Layout from "@/components/Layout.jsx";
import Universities from "@/pages/Universities.jsx";
import Dashboard from "@/pages/Admin/Dashboard.jsx";
import User from "@/pages/Admin/User.jsx";
import AdminLibrarian from "@/pages/Admin/AdminLibrarian.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
            <Route path="/register" element={<Signup/>} />
                <Route path="/admin" element={<Dashboard/>} />
                <Route path="/admin/users" element={<User/>} />
                <Route path="/admin/librarians" element={<AdminLibrarian/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/booklist" element={<BookListPage />} />
            <Route path="/add" element={<AddBookPage />} />
            <Route path="/edit/:id" element={<EditBookPage />} />
                <Route path="/universities" element={<Universities />} />
            </Route>
        </Routes>
    );
}

export default App;
