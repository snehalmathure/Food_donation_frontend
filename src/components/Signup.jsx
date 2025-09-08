import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/signup.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect with backend API for signup
    console.log("Signup attempt:", { name, email, password });

    // Temporary redirect after signup
    navigate("/login");
  };

  return (
    <main className="signup">
      <div className="signup__card">
        <h1 className="signup__title">Create Account ✨</h1>
        <p className="signup__subtitle">Join us in sharing food with those in need</p>

        <form onSubmit={handleSubmit} className="signup__form">
          <div className="form__group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn--primary">
            Sign Up
          </button>
        </form>

        <p className="signup__footer">
          Already have an account?{" "}
          <Link to="/login" className="link">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
