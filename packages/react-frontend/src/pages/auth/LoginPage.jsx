import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = "http://localhost:8000";

export default function LoginPage() {
  // hook to navigate between pages
  const navigate = useNavigate();

  // State variables for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State variables for loading and error handling
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(""); // clear any previous error messages

    makeLoginCall().then((response) => {
      if (response && response.status === 200) {
        // Valid credentials, sign user in
        const token = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        getUserData().then((response) => {
          console.log("Got user data: ", response.name);
          localStorage.setItem("name", response.name);
          window.location.reload(); // refreshes page to load name data
        });
        setEmail("");
        setPassword("");
        console.log("Login form submitted with:", {
          email,
          password,
        });
        navigate("/month"); // render by default the month view, but TODO: change to user's default view
      }
      // Invalid credentials, display appropriate error message
      else {
        if (response.status == 401) {
          console.log(response.data);
          setError("Invalid email or password.");
        } else {
          console.log("Error: unknown issue logging in:", response.status);
        }
      }
    });
  };

  // Create user, send data to backend
  async function makeLoginCall() {
    try {
      const user = {
        name: "", // irrelevant in this scenario
        email: email,
        password: password,
        confirmPassword: password, // irrelevant in this scenario; making it the same for simplicity
      };
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.text();

      console.log("makeLoginCall() response: ", data);

      return {
        status: response.status,
        data,
      };
    } catch (error) {
      console.log("Login error:", error);
      return false;
    }
  }

  async function getUserData() {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/${email}`, {
        method: "GET",
      });

      const name = await response.text();

      console.log("getUserData() response: ", name);

      return {
        status: response.status,
        name,
      };
    } catch (error) {
      console.log("Login error:", error);
      return false;
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 font-serif">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="hamburger"
          src="../../../public/hamburger.png"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-serif tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      {/* Div container for Form -> Username (their) and Password */}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-700">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 text-gray-700"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Sign in
            </button>
          </div>
        </form>
        {error && <div className="text-red-600">{error}</div>}

        {/* Div container in case user doesn't have an account, it will navigate the user towards signing up.*/}
        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account?
          <Link
            to="/register"
            className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
          >
            {" "}
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
