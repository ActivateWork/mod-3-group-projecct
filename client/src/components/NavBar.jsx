import { Link } from "react-router-dom";

function Navbar({ setUser, username }) {
  
  const logout = () => {
    localStorage.removeItem("token")
    setUser({})
  };

  return (
    <ul id='navbar'>
      <li>
        <Link to="/">
          <p>Home page</p>
        </Link>
      </li>
      <li style={{ color: "black" }}>Welcome {username}!</li>
          <li onClick={logout}>
            <Link to="/posts">Logout</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
    </ul>
  );
}

export default Navbar;