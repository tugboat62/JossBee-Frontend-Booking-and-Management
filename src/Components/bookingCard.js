// BookingForm.js

import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "../Styles/bookingCard.css";
import { useAuth } from "./auth";
import { useNavigate } from "react-router-dom";

const BookingCard = ({ houseId, capacity }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [maxEndDate, setMaxEndDate] = useState(""); // [1
  const [numGuests, setNumGuests] = useState(1); // Default value
  const navigate = useNavigate();
  const auth = useAuth();

  const [showError, setShowError] = useState(false);

  const maxBookingDate = new Date();
  maxBookingDate.setDate(maxBookingDate.getDate() + 3);

  const handleStartDateChange = (e) => { 
    const maxEnd = new Date(e.target.value);
    maxEnd.setDate(maxEnd.getDate() + 3);
    console.log(maxEnd);
    setMaxEndDate(maxEnd.toISOString().split("T")[0]); // [1
    setEndDate(""); // Reset end date if it's out of range
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    console.log(endDate);
  };

  const handleNumGuestsChange = (e) => {
    setNumGuests(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startDate || !endDate || numGuests < 1) {
      setShowError(true);
    } else {
      setShowError(false);
      // Implement your booking submission logic here
      if (!auth.user) {
        navigate("/login");
      } else {
        navigate(`/house/checkout/${houseId}`);
      }
    }
  };

  return (
    <div className="booking-form">
      <h2>Book this House</h2>
      {showError && (
        <Alert variant="danger">Please fill in all fields correctly.</Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="startDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            min={new Date().toISOString().split("T")[0]} // Restrict to current date and future dates
            max={maxBookingDate.toISOString().split("T")[0]} // Set maximum booking duration
            required
          />
        </Form.Group>

        <Form.Group controlId="endDate">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            min={startDate} // Minimum date is the check-in date
            max={
              maxEndDate // Set maximum end date based on start date
            }
            required
          />
        </Form.Group>

        <Form.Group controlId="numGuests">
          <Form.Label>Number of Guests</Form.Label>
          <Form.Control
            type="number"
            value={numGuests}
            onChange={handleNumGuestsChange}
            min={1}
            max={capacity}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Book Now
        </Button>
      </Form>
    </div>
  );
};

export default BookingCard;
