import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import IndexPost from "./pages/IndexPost";
import NewPost from "./pages/NewPost";
import Navbar from "./components/NavBar";
import Register from "./users/Register";
import Login from "./users/Login";
import Profile from "./users/Profile";
import Footer from "./components/Footer";
import Show from "./pages/Show";
import { setUser } from "./store/authSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  async function getUser() {
    try {
      const response = await axios.get("api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      dispatch(setUser(response.data));
    } catch (err) {
      console.log(err.message);
      localStorage.removeItem("token");
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-center bg-lime-50 h-screen">
        <Routes>
          <Route path="/" element={<IndexPost />} />
          <Route path="/new" element={<NewPost />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:id" element={<Show />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
