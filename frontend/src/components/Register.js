import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";



const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register, error, setError } = useAuth();
  const navigate = useNavigate();

  // OAuth state
  const [authCode, setAuthCode] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  // Handle traditional signup form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(`http://localhost:5000/api/register`, {
        username,
        email: email.toLowerCase(),
        password,
      });
      const { token, user } = response.data;
      await register(username, email, token, user);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please check your details."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google OAuth signup
  const handleGoogleLogin = () => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&response_type=code&scope=https://www.googleapis.com/auth/calendar.events`;
    window.location.href = googleAuthUrl;
  };

  // Extract authorization code from the URL after redirect
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) setAuthCode(code);
  }, []);

  // Exchange authorization code for access token
  useEffect(() => {
    const exchangeCodeForToken = async (code) => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/exchange-code",
          { authCode: code }
        );
        setAccessToken(response.data.accessToken);
        await register(null, response.data.accessToken, null); // You can pass token directly
        navigate("/dashboard");
      } catch (error) {
        setError("Failed to exchange authorization code. Please try again.");
      }
    };
    if (authCode) exchangeCodeForToken(authCode);
  }, [authCode, navigate, register, setError]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-600">
          Join Us!
        </h2>
        <p className="text-center text-lg text-gray-600">
          Create your account to start your health journey.
        </p>

        {/* Error message display */}
        {error && (
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-red-500 text-center">{error}</p>
          </div>
        )}

        {/* Traditional signup form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">Or</p>

        {/* Google OAuth button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Sign Up with Google
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login here
          </Link>
        </p>

        <div className="text-center mt-4">
          <p className="text-lg text-gray-700">
            “Your health is your real wealth.”
          </p>
          <p className="text-sm text-gray-500">— Mahatma Gandhi</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
