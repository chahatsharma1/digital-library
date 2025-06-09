import {Routes, Route} from "react-router-dom";
import Home from "@/pages/Home.jsx";
import Login from "@/pages/Auth/Login.jsx";
import Signup from "@/pages/Auth/Signup.jsx";
import Layout from "@/components/Layout.jsx";
import Universities from "@/pages/Universities.jsx";
import Dashboard from "@/pages/Admin/Dashboard.jsx";
import User from "@/pages/Admin/User.jsx";
import AdminLibrarian from "@/pages/Admin/AdminLibrarian.jsx";
import LibrarianDashboard from "@/pages/Librarian/LibrarianDashboard.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/register" element={<Signup/>} />
                <Route path="/admin" element={<Dashboard/>} />
                <Route path="/admin/users" element={<User/>} />
                <Route path="/admin/librarian" element={<AdminLibrarian/>} />
                <Route path="/librarian" element={<LibrarianDashboard/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/universities" element={<Universities />} />
            </Route>
        </Routes>
    );
}

export default App;
