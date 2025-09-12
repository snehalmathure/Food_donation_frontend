import React, { useState, useEffect } from "react";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import "../style/DonationForm.css";

export default function DonationForm() {
  const [foodType, setFoodType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("Fetching current location...");
  const [coords, setCoords] = useState(null);
  const [notes, setNotes] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const provider = new OpenStreetMapProvider();

  // ✅ Get current location once when component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          setCoords({ latitude, longitude });

          try {
            // Reverse geocode (convert coords → address)
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
              {
                headers: {
                  "User-Agent": "food-donation-app",
                  "Accept-Language": "en",
                },
              }
            );

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
    }
  }, []);

  // ✅ Handle typing in search box
  const handleSearch = async (value) => {
    setLocation(value);

    if (value.length > 3) {
      const results = await provider.search({ query: value });
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  // ✅ When user selects a suggestion
  const handleSelect = (place) => {
    setLocation(place.label);
    setCoords({ latitude: place.y, longitude: place.x });
    setSuggestions([]);
  };

  // ✅ Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const donationData = { foodType, quantity, location, notes, coords };
    console.log("Donation Submitted:", donationData);
    alert("🎉 Thank you for your donation!");
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
          {/* Food Type */}
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

          {/* Quantity */}
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

          {/* Location with current + search */}
          <div className="form__group">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              type="text"
              placeholder="Fetching current location..."
              value={location}
              onChange={(e) => handleSearch(e.target.value)}
              required
            />

            {/* Suggestions dropdown */}
            {suggestions.length > 0 && (
              <ul className="suggestions">
                {suggestions.map((s, i) => (
                  <li key={i} onClick={() => handleSelect(s)}>
                    {s.label}
                  </li>
                ))}
              </ul>
            )}

            {coords && (
              <small className="coords">
                📍 Lat: {coords.latitude.toFixed(6)}, Lng:{" "}
                {coords.longitude.toFixed(6)}
              </small>
            )}
          </div>

          {/* Notes */}
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
