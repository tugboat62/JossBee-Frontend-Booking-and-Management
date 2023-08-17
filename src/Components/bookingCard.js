// BookingForm.js

import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "../Styles/bookingCard.css";
import { useAuth } from "./auth";
import { useNavigate } from "react-router-dom";

const BookingCard = ({ houseId }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numGuests, setNumGuests] = useState(1); // Default value
  const navigate = useNavigate();
  const auth = useAuth();

  const [showError, setShowError] = useState(false);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    console.log(startDate);
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
      {showError && <Alert variant="danger">Please fill in all fields correctly.</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="startDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="endDate">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
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
