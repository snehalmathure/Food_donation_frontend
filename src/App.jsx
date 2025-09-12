import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CreateDonation from "./pages/CreateDonation";
import RecipientPage from "./pages/RecipientPage";
import DonationForm from "./components/DonationForm";
import AddLocation from "./pages/AddLocation";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/privateRoute"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/create-donation" element={<CreateDonation />} />
        <Route path="/donation/:id" element={<RecipientPage />} />
        <Route path="/donation" element={<DonationForm />} />
        <Route path="/addLocation" element={<AddLocation />} /> */}
          {/* Protected route for DonationForm */}
        <Route
          path="/donate"
          element={
            <privateRoute>
              <Dashboard/>
              <AddLocation/>
              <DonationForm />
            </privateRoute>
          }
        />

        {/* Fallback to login if route not found */}
        <Route path="*" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
