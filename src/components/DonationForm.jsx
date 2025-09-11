import React, { useState, useEffect } from "react";
import "../style/DonationForm.css";

export default function DonationForm() {
  const [foodType, setFoodType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("Fetching current location...");
  const [notes, setNotes] = useState("");
  const [coords, setCoords] = useState(null);

  // Get user location when component loads
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          setCoords({ latitude, longitude });

          try {
            // Reverse geocoding request (OpenStreetMap)
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
              {
                headers: {
                  "User-Agent": "food-donation-app", // required by Nominatim
                  "Accept-Language": "en",
                },
              }
            );

            if (!res.ok) throw new Error("Failed to fetch address");

            const data = await res.json();

            if (data.display_name) {
              setLocation(data.display_name);
            } else {
              setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
            }
          } catch (err) {
            console.error("Error fetching address:", err);
            setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          }
        },
        (err) => {
          console.error("Location access denied:", err);
          setLocation(""); // let user enter manually
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setLocation("");
    }
  }, []);

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const donationData = { foodType, quantity, location, notes, coords };
    console.log("Donation Submitted:", donationData);

    // TODO: Send donationData to backend API
    alert("🎉 Thank you for your donation!");

    // Reset form
    setFoodType("");
    setQuantity("");
    setLocation("");
    setNotes("");
    setCoords(null);
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
              placeholder="Fetching current location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)} // user can still edit manually
              required
            />
            {coords && (
              <small className="coords">
                📍 Lat: {coords.latitude.toFixed(6)}, Lng:{" "}
                {coords.longitude.toFixed(6)}
              </small>
            )}
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
