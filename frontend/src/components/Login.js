import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import QueryString from "qs";


// OAuth keys
const CLIENT_ID =
  "";
const CLIENT_SECRET = "";
const REDIRECT_URI = "";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, error, setError } = useAuth();
  const navigate = useNavigate();

  // OAuth state
  const [authCode, setAuthCode] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    try {
      if (accessToken)
        navigate("/dashboard")
    } catch (error) {
      
    }
  }, [accessToken])

  // Prevent multiple token exchanges
  const tokenExchanged = useRef(false);

  // Handle traditional login form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(`http://localhost:5000/api/login`, {
        email: email.toLowerCase(),
        password,
      });
      const { token, user } = response.data;
      await login(email, token, user);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google OAuth login
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

  // Exchange authorization code for access token only once
  useEffect(() => {
    const exchangeCodeForToken = async (code) => {
      try {
        if (tokenExchanged.current) return;

        tokenExchanged.current = true;

        // const response = await axios.post(
        //   "http://localhost:5000/api/auth/exchange-code",
        //   { authCode: code }
        // );

        const response = await axios.post(
          "https://oauth2.googleapis.com/token",
          QueryString.stringify({
            code: authCode,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            redirect_uri: REDIRECT_URI,
            grant_type: "authorization_code",
          }),
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        );

        console.log(response);
        
        const accessToken = response.data.access_token;
        console.log(accessToken);

        console.log('login successfull');
        
        setAccessToken(accessToken);
        localStorage.setItem("access_token", accessToken);
        const email = "sachipatankar19@gmail.com"
        const token = '67135a33652fe8494684473f'
        const username =  'sachi';

        console.log(email, token, username)
        await login(email, token, username);
        navigate("/dashboard");
      } catch (error) {
        setError(
          "Failed to exchange authorization code or fetch user info. Please try again."
        );
        // Reset the token exchange flag on error
        tokenExchanged.current = false;
      }
    };

    if (authCode && !tokenExchanged.current) {
      exchangeCodeForToken(authCode);
    }
  }, [authCode]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-600">
          Welcome Back!
        </h2>
        <p className="text-center text-lg text-gray-600">
          Login to continue your journey towards better health.
        </p>

        {/* Error message display */}
        {error && (
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-red-500 text-center">{error}</p>
          </div>
        )}

        {/* Traditional login form */}
        <form onSubmit={handleSubmit} className="space-y-6">
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
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">Or</p>

        {/* Google OAuth button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Login with Google
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Register here
          </Link>
        </p>

        <div className="text-center mt-4">
          <p className="text-lg text-gray-700">
            “The greatest wealth is health.”
          </p>
          <p className="text-sm text-gray-500">— Virgil</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
