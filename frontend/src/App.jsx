import {Routes, Route} from "react-router-dom";
import BookListPage from "@/pages/BookList/BookListPage.jsx";
import AddBookPage from "@/pages/AddPage/AddBookPage.jsx";
import EditBookPage from "@/pages/EditPage/EditBookPage.jsx";
import Home from "@/pages/Home.jsx";
import Login from "@/pages/Auth/Login.jsx";
import Signup from "@/pages/Auth/Signup.jsx";

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
