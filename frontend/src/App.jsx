import {Routes, Route} from "react-router-dom";
import BookListPage from "./pages/BookListPage.jsx";
import AddBookPage from "./pages/AddBookPage";
import EditBookPage from "./pages/EditBookPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<BookListPage />} />
            {/*<Route path="/add" element={<AddBookPage />} />*/}
            {/*<Route path="/edit/:id" element={<EditBookPage />} />*/}
        </Routes>
    );
}

export default App;
