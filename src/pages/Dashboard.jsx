import React from "react";
import { Link } from "react-router-dom";
import "../style/Dashboard.css";

export default function Dashboard({ user }) {
  return (
    <main className="dashboard">
      <section className="dashboard__header">
        <h1>👋 Welcome, {user?.name || "Friend"}!</h1>
        <p>Choose an action below to donate food or report locations.</p>
      </section>

      <section className="dashboard__actions">
        <Link to="/donation" className="card card--primary">
          🍲 Create Donation
        </Link>
        <Link to="/addLocation" className="card card--secondary">
          📍 Add Beggar's Location
        </Link>
        <Link to="/recipient-page" className="card card--tertiary">
          🗺️ View Donations / Recipients
        </Link>
      </section>

      {/* Optional: Recent Locations */}
      <section className="dashboard__recent">
        <h2>Recent Locations</h2>
        <p>(Map or list of recent locations can go here)</p>
      </section>
    </main>
  );
}
