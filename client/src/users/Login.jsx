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
      navigate("/");
    } catch (err) {
      console.log(err);
      alert(err.response.data.error); // Display an alert with the error message
    }
  };

  // JSX rendering of the Login component
  return (
    <div className="my-32" div>
      <h1 className="flex justify-center mb-4 text-large font-extrabold leading-none tracking-tight text-lime-900 md:text-5xl lg:text-6xl">
        Login
      </h1>
      <form onSubmit={handleSubmit}>
        <label
          className=" text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400"
          htmlFor="username"
        >
          Username:
        </label>
        <br />
        <input
          className="mt-4 w-full rounded border-2 bg-white px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
          value={form.username}
        />
        <br />
        <br />
        <label
          className=" text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400"
          htmlFor="password"
        >
          Password:
        </label>
        <br />
        <input
          className="mt-4 w-full rounded border-2 bg-white px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={form.password}
        />
        <br />
        <br />
        <button className="bg-lime-600 inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#00FF00 ] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] ">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
