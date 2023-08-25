import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

let emptyForm = {
  username: "",
  password: "",
  email: "",
};

function Register({ setUser }) {
  const navigate = useNavigate();

  // State for storing the form data
  let [form, setForm] = useState(emptyForm);

  // Function to update form state when input values change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the "/auth/register" endpoint with the form data
      const authResponse = await axios.post("/auth/register", form);
      const token = authResponse.data.token;

      // If no token is returned, clear the form and exit the function
      if (!token) {
        setForm(emptyForm);
        return;
      }

      // Store the token in the browser's local storage
      localStorage.setItem("token", token);

      // Send a GET request to "/api/users" to fetch user data using the token for authentication
      const userResponse = await axios.get("/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Set the user state with the fetched user data
      setUser(userResponse.data);

      // Navigate to the "/posts" route
      navigate("/posts");
    } catch (err) {
      console.log(err);
      alert(err.response.data.error);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <br />
        <input
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
          value={form.username}
        />
        <br />
        <br />
        <label htmlFor="email">Email:</label>
        <br />
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          value={form.email}
        />
        <br />
        <br />
        <label htmlFor="password">Password:</label>
        <br />
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={form.password}
        />
        <br />
        <br />
        <button>Submit</button>
      </form>
    </>
  );
}

export default Register;
