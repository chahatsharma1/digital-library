import {Routes, Route} from "react-router-dom";
import BookListPage from "./pages/BookListPage.jsx";
import AddBookPage from "./pages/AddBookPage";
import EditBookPage from "./pages/EditBookPage";
import Home from "@/pages/Home.jsx";
import Login from "@/pages/auth/Login.jsx";
import Signup from "@/pages/auth/Signup.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Signup/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/booklist" element={<BookListPage />} />
            <Route path="/add" element={<AddBookPage />} />
            <Route path="/edit/:id" element={<EditBookPage />} />
        </Routes>
    );
}

export default App;
