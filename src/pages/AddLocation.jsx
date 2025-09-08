// import React, { useState, useCallback, useRef } from "react";
// import { GoogleMap, Marker, useJsApiLoader, Autocomplete } from "@react-google-maps/api";
// import "../style/AddLocation.css";
// export default function AddLocation() {
//   const [selectedPosition, setSelectedPosition] = useState(null);
//   const [beggarCount, setBeggarCount] = useState("");
//   const [comment, setComment] = useState("");
//   const [autocomplete, setAutocomplete] = useState(null);

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY",
//     libraries: ["places"], // important for Autocomplete
//   });

//   const onMapClick = useCallback((e) => {
//     setSelectedPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
//   }, []);

//   const handlePlaceChanged = () => {
//     if (autocomplete !== null) {
//       const place = autocomplete.getPlace();
//       if (place.geometry) {
//         setSelectedPosition({
//           lat: place.geometry.location.lat(),
//           lng: place.geometry.location.lng(),
//         });
//       }
//     } else {
//       console.log("Autocomplete is not loaded yet!");
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!selectedPosition) {
//       alert("Please select a location on the map or from autocomplete!");
//       return;
//     }
//     const locationData = { position: selectedPosition, beggarCount, comment };
//     console.log(locationData);
//     alert("Location added successfully!");
//     setSelectedPosition(null);
//     setBeggarCount("");
//     setComment("");
//   };

//   if (!isLoaded) return <p>Loading Map...</p>;

//   return (
//     <main className="add-location">
//       <div className="add-location__card">
//         <h1 className="title">📍 Add Location</h1>

//         {/* Autocomplete Input */}
//         <Autocomplete
//           onLoad={(autoC) => setAutocomplete(autoC)}
//           onPlaceChanged={handlePlaceChanged}
//         >
//           <input
//             type="text"
//             placeholder="Type location here..."
//             className="autocomplete-input"
//           />
//         </Autocomplete>

//         <GoogleMap
//           mapContainerStyle={{ width: "100%", height: "400px" }}
//           center={selectedPosition || { lat: 18.5204, lng: 73.8567 }}
//           zoom={13}
//           onClick={onMapClick}
//         >
//           {selectedPosition && <Marker position={selectedPosition} />}
//         </GoogleMap>

//         <form onSubmit={handleSubmit} className="location-form">
//           <div className="form-group">
//             <label>Number of Beggars/Dogs</label>
//             <input
//               type="number"
//               placeholder="e.g. 5"
//               value={beggarCount}
//               onChange={(e) => setBeggarCount(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Comments (Optional)</label>
//             <textarea
//               placeholder="Any additional info..."
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               rows="3"
//             ></textarea>
//           </div>

//           <button type="submit" className="btn btn--primary">
//             Save Location
//           </button>
//         </form>
//       </div>
//     </main>
//   );
// }




// import React, { useState } from "react";
// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

// export default function AddLocation() {
//   const [selectedPosition, setSelectedPosition] = useState(null);
//   const [beggarCount, setBeggarCount] = useState("");
//   const [comment, setComment] = useState("");

//   // Component to handle map clicks
//   function LocationMarker() {
//     useMapEvents({
//       click(e) {
//         setSelectedPosition(e.latlng);
//       },
//     });

//     return selectedPosition ? <Marker position={selectedPosition} /> : null;
//   }

//   // Use browser geolocation
//   const useCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setSelectedPosition({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//         },
//         (error) => alert("Error getting location: " + error.message)
//       );
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!selectedPosition) {
//       alert("Please select a location!");
//       return;
//     }
//     const data = {
//       position: selectedPosition,
//       beggarCount,
//       comment,
//     };
//     console.log("Submitted Data:", data);
//     alert("Location submitted successfully!");
//     setSelectedPosition(null);
//     setBeggarCount("");
//     setComment("");
//   };

//   return (
//     <div className="add-location">
//   <div className="add-location__card">
//     <h1>Add Location</h1>
//     <button onClick={useCurrentLocation}>📍 Use Current Location</button>
    
//     <MapContainer
//       center={selectedPosition || { lat: 18.5204, lng: 73.8567 }}
//       zoom={13}
//       className="leaflet-container"
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution="&copy; OpenStreetMap contributors"
//       />
//       <LocationMarker />
//     </MapContainer>

//     <form onSubmit={handleSubmit} className="location-form">
//       <input
//         type="number"
//         placeholder="Number of Beggars / Dogs"
//         value={beggarCount}
//         onChange={(e) => setBeggarCount(e.target.value)}
//         required
//       />
//       <textarea
//         placeholder="Comments (optional)"
//         value={comment}
//         onChange={(e) => setComment(e.target.value)}
//         rows="3"
//       ></textarea>
//       <button type="submit">Save Location</button>
//     </form>
//   </div>
// </div>

//   );
// }

