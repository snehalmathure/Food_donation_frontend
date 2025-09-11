import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { useState, useEffect } from "react";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "../style/AddLocation.css"; // your CSS
import L from "leaflet";


// Recenter map when coordinates change
function RecenterMap({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) map.setView([coords.lat, coords.lng], 15);
  }, [coords, map]);
  return null;
}

// Search bar component
function SearchField({ setCoords }) {
  const map = useMap();
  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      autoComplete: true,
      autoCompleteDelay: 300,
      showMarker: false,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true,
    });

    map.addControl(searchControl);

    map.on("geosearch/showlocation", (result) => {
      const { x, y } = result.location;
      setCoords({ lat: y, lng: x });
    });

    return () => {
      map.removeControl(searchControl);
      map.off("geosearch/showlocation");
    };
  }, [map, setCoords]);

  return null;
}

// Click handler (optional)
function ClickHandler({ setCoords }) {
  useMapEvents({
    click(e) {
      setCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

// Main Component
export default function AddLocation() {
  const [coords, setCoords] = useState(null);
  const [beggarCount, setBeggarCount] = useState("");
  const [comment, setComment] = useState("");


// ✅ Add the emoji marker here, inside the component
  const emojiIcon = L.divIcon({
    className: "custom-emoji-marker",
    html: "📍",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  // Automatically get current location on page load
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.error("Geolocation error:", err),
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation not supported by your browser!");
    }
  }, []);

  // Submit form to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!coords) return alert("Select a location first!");

    const locationData = {
      latitude: coords.lat,
      longitude: coords.lng,
      beggarCount,
      comment,
    };

    try {
      const res = await fetch("http://localhost:5000/api/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(locationData),
      });
      if (!res.ok) throw new Error("Failed to save");
      alert("✅ Location saved!");
      setBeggarCount("");
      setComment("");
    } catch (err) {
      alert("❌ Error: " + err.message);
    }
  };

  return (
    <div className="container">
      <h2 className="title">📍 Add Location</h2>

      <MapContainer
        center={coords || [20.5937, 78.9629]}
        zoom={coords ? 15 : 5}
        className="mapContainer"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SearchField setCoords={setCoords} />
        <ClickHandler setCoords={setCoords} />
        {coords && (
          <Marker
  position={coords}
  draggable={true}
  icon={emojiIcon}
  eventHandlers={{
    dragend: (e) => {
      const marker = e.target;
      const position = marker.getLatLng();
      setCoords({ lat: position.lat, lng: position.lng });
    },
  }}
/>
        )}
        <RecenterMap coords={coords} />
      </MapContainer>

      {coords && (
        <p className="coordinates">
          📌 Selected: <b>Lat:</b> {coords.lat}, <b>Lng:</b> {coords.lng}
        </p>
      )}

      <form onSubmit={handleSubmit} className="form">
        <div>
          <label className="label">Number of Beggars/Dogs</label>
          <input
            type="number"
            value={beggarCount}
            onChange={(e) => setBeggarCount(e.target.value)}
            required
            className="input"
          />
        </div>
        <div>
          <label className="label">Comments (Optional)</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="textarea"
          />
        </div>
        <button type="submit" className="button">
          Save Location
        </button>
      </form>
    </div>
  );
}
