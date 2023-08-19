// BookingForm.js

import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "../Styles/bookingCard.css";
import axios from "axios";
import "../Styles/bookingDetails.css"; // Import your custom CSS for styling
import { useNavigate } from "react-router-dom";
import BookingConfirmationModal from "./bookingConfirmationModal";

const BookingCard = ({ houseId, capacity, price }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [maxEndDate, setMaxEndDate] = useState(""); // [1
  const [numGuests, setNumGuests] = useState(1); // Default value
  const [creditCard, setCreditCard] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [agreeToRules, setAgreeToRules] = useState(false);
  const navigate = useNavigate();

  const [showError, setShowError] = useState(false);

  const maxBookingDate = new Date();
  maxBookingDate.setDate(maxBookingDate.getDate() + 3);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const handleShowModal = () => {
    setShowConfirmationModal(true);
  };
  const handleCloseModal = () => setShowConfirmationModal(false);

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

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleBillingAddressChange = (e) => {
    setBillingAddress(e.target.value);
  };

  const handleAgreeToRulesChange = () => {
    setAgreeToRules(!agreeToRules);
  };

  const handleCreditCardChange = (e) => {
    setCreditCard(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !startDate ||
      !endDate ||
      numGuests < 1 ||
      !creditCard ||
      !phoneNumber ||
      !billingAddress ||
      !agreeToRules
    ) {
      setShowError(true);
    } else {
      setShowError(false);
      // Implement your booking submission logic here

      console.log("Booking submitted");
      handleCloseModal();
    }
  };

  const daysBetween = (date1, date2) => {
    // Get 1 day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    const date1Ms = new Date(date1).getTime();
    const date2Ms = new Date(date2).getTime();

    // Calculate the difference in milliseconds
    const differenceMs = date2Ms - date1Ms;

    // Convert back to days and return
    return Math.round(differenceMs / oneDay);
  };

  return (
    <div className="booking-form">
      <h2>Book this House</h2>
      {showError && (
        <Alert variant="danger">Please fill in all fields correctly.</Alert>
      )}
      <Form onSubmit={handleShowModal}>
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

        {/* Credit Card Details */}
        <Form.Group controlId="creditCard">
          <Form.Label>Credit Card Number</Form.Label>
          <Form.Control
            type="text"
            value={creditCard}
            onChange={handleCreditCardChange}
            required
          />
        </Form.Group>

        {/* Phone Number */}
        <Form.Group controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            required
          />
        </Form.Group>

        {/* Billing Address */}
        <Form.Group controlId="billingAddress">
          <Form.Label>Billing Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={billingAddress}
            onChange={handleBillingAddressChange}
            required
          />
        </Form.Group>

        {/* Agree to Rules */}
        <Form.Group controlId="agreeToRules">
          <Form.Check
            type="checkbox"
            label="I agree to the house rules"
            checked={agreeToRules}
            onChange={handleAgreeToRulesChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Book Now
        </Button>
        <BookingConfirmationModal
          show={showConfirmationModal}
          handleClose={handleCloseModal}
          totalAmount={
            startDate === endDate
              ? price * numGuests
              : price * numGuests * daysBetween(startDate, endDate)
          }
          onConfirm={handleSubmit}
        />
      </Form>
    </div>
  );
};

export default BookingCard;
