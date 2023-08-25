import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "./index.css";
import IndexPost from "./pages/IndexPost";
import NewPost from "./pages/NewPost";
import Navbar from "./components/NavBar";
import Register from "./users/Register";
import Login from "./users/Login";
import Profile from "./users/Profile";
import Footer from "./components/Footer"

function App() {
  const [user, setUser] = useState({});

  async function getUser() {
    try {
      const response = await axios.get("api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      setUser(response.data);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    console.log("page loaded");
  }, []);
  return (
    <div>
      <Navbar setUser={setUser} username={user.username} />
      <div className="flex justify-center bg-lime-50 h-screen">
        <Routes>
          <Route path="/" element={<IndexPost />} />
          <Route path="/new" element={<NewPost />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
