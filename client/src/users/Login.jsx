import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Initial form state with empty values for username, password, and email

let emptyForm = {
  username: "",
  password: "",
  email: "",
};

// Login component definition
function Login({ setUser }) {
  const navigate = useNavigate();

  // State to hold the form data, initialized with emptyForm
  let [form, setForm] = useState(emptyForm);

  // Function to handle input changes and update the form state
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    try {
      // Send a POST request to the server to authenticate user
      const authResponse = await axios.post("/auth/login", form);
      const token = authResponse.data.token;

      if (!token) {
        setForm(emptyForm); // Reset the form if authentication fails
        return;
      }

      // If authentication is successful, store the token in local storage
      localStorage.setItem("token", token);

      // Send a GET request to fetch user data using the stored token
      const userResponse = await axios.get("/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Update the user context with the fetched user data
      setUser(userResponse.data);

      // Navigate the user to the "/posts" route
      navigate("/posts");
    } catch (err) {
      console.log(err);
      alert(err.response.data.error); // Display an alert with the error message
    }
  };

  // JSX rendering of the Login component
  return (
    <>
      <h1>Login</h1>
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

export default Login;
