import React from "react";
import { Link } from "react-router-dom";
import "../style/Home.css";

export default function Home() {
  return (
    <main className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__content">
          <h1>🍲 Share Food, Spread Love</h1>
          <p>
            Donate your leftover food to beggars and street dogs nearby.  
            Together, we can reduce hunger and food waste.
          </p>
          <div className="hero__buttons">
            <Link to="/login" className="btn btn--secondary">Login</Link>
            <Link to="/signup" className="btn btn--secondary">Signup</Link>
            <Link to="/login" className="btn btn--primary">Donate Now</Link>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="info">
        <h2>How It Works?</h2>
        <div className="info__cards">
          <div className="card">
            <h3>1️⃣ Add Donation</h3>
            <p>Enter food details, quantity & location.</p>
          </div>
          <div className="card">
            <h3>2️⃣ Locate Needy</h3>
            <p>Find beggars or dogs nearby through the app.</p>
          </div>
          <div className="card">
            <h3>3️⃣ Share Food</h3>
            <p>Provide food and add feedback about location.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
