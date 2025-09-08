import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/login.css"; // 👈 Move CSS file here or import globally

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
    navigate("/dashboard"); // Redirect after login
  };

  return (
    <main className="login">
      <div className="login__card">
        <h1 className="login__title">Welcome Back 👋</h1>
        <p className="login__subtitle">Login to continue sharing food</p>

        <form onSubmit={handleSubmit} className="login__form">
          <div className="form__group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form__group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn--primary">
            Login
          </button>
        </form>

        <p className="login__footer">
          Don’t have an account?{" "}
          <Link to="/signup" className="link">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
