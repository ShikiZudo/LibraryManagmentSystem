import { Footer } from "./components/Footer";
import NavBar from "./components/NavBar";
import BookInfoBase from "./pages/BookInfo/BookInfoBase";
import { BookList } from "./pages/BookList/BookList";
import { Landing } from "./pages/Landing/Landing";
import { Login } from "./pages/Login/Login";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Signup } from "./pages/Signup/Signup";
import ProfileBase from "./pages/UserProfile/ProfileBase";
import AdminProfileBase from "./pages/AdminProfile/AdminProfileBase";
import { useAuthorization } from "./context/AuthorizationProvider";

function App() {
  const auth = useAuthorization().getAuthData;
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-slate-50">
          <NavBar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/booklist" element={<BookList />} />
            <Route path="/bookinfo/:bookId" element={<BookInfoBase />} />
            {auth?.role === "ADMIN" ? (
              <>
                <Route
                  path="/profile:section "
                  element={<AdminProfileBase />}
                />
                <Route path="/profile" element={<AdminProfileBase />} />
              </>
            ) : (
              <>
                <Route path="/profile:section" element={<ProfileBase />} />
                <Route path="/profile" element={<ProfileBase />} />
              </>
            )}
            <Route path="*" element={<div>Page path not defined</div>} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
