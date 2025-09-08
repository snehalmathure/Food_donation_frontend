import React, { useState } from "react";
import "../style/DonationForm.css";

export default function DonationForm() {
  const [foodType, setFoodType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const donationData = { foodType, quantity, location, notes };
    console.log("Donation Submitted:", donationData);

    // TODO: Send donationData to backend API
    alert("🎉 Thank you for your donation!");
    setFoodType("");
    setQuantity("");
    setLocation("");
    setNotes("");
  };

  return (
    <main className="donation">
      <div className="donation__card">
        <h1 className="donation__title">🍲 Add Food Donation</h1>
        <p className="donation__subtitle">
          Share leftover food with beggars and street dogs near you
        </p>

        <form onSubmit={handleSubmit} className="donation__form">
          <div className="form__group">
            <label htmlFor="foodType">Food Type</label>
            <input
              id="foodType"
              type="text"
              placeholder="e.g. Rice, Bread, Biscuits"
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
              required
            />
          </div>

          <div className="form__group">
            <label htmlFor="quantity">Quantity (plates/servings)</label>
            <input
              id="quantity"
              type="number"
              placeholder="e.g. 5"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          <div className="form__group">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              type="text"
              placeholder="e.g. Near City Park"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="form__group">
            <label htmlFor="notes">Additional Notes (optional)</label>
            <textarea
              id="notes"
              placeholder="Any extra info like 'contains spices' or 'good for dogs'"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
            ></textarea>
          </div>

          <button type="submit" className="btn btn--primary">
            Submit Donation
          </button>
        </form>
      </div>
    </main>
  );
}
