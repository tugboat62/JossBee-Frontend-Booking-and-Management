// BookingForm.js

import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "../../Styles/bookingCard.css";
import axios from "axios";
import "../../Styles/bookingDetails.css"; // Import your custom CSS for styling
import { useNavigate } from "react-router-dom";
import BookingConfirmationModal from "../Modals/bookingConfirmationModal";
import { useAuth } from "../auth";
import BookingSuccessModal from "../Modals/bookingSuccessModal";
import BookingErrorModal from "../Modals/bookingErrorModal";

const BookingCard = ({ houseId, capacity, price, house }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [maxEndDate, setMaxEndDate] = useState("");
  const [numGuests, setNumGuests] = useState(1);
  const [rentAmount, setRentAmount] = useState(0);
  const [creditCard, setCreditCard] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [errorMessage, setErrorBookingMessage] = useState("");
  const [agreeToRules, setAgreeToRules] = useState(false);
  const auth = useAuth();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const navigate = useNavigate();

  const [showError, setShowError] = useState(false);

  const maxBookingDate = new Date();
  maxBookingDate.setDate(maxBookingDate.getDate() + 3);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const handleShowModal = (e) => {
    e.preventDefault();
    if (!auth.user) {
      navigate("/login");
    } else {
      setShowConfirmationModal(true);
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !startDate ||
        !endDate ||
        numGuests < 1 ||
        !creditCard ||
        !phoneNumber ||
        !billingAddress ||
        !agreeToRules
      ) {
        setErrorBookingMessage("Please fill in all fields correctly");
        setShowError(true);
      } else {
        const alreadyBooked = await axios.get(
          `http://localhost:8080/api/v1/booking/user/checkbooking`,
          {
            params: {
              houseId: houseId,
              startDate: startDate,
              endDate: endDate,
            },
          }
        );
        console.log(alreadyBooked.data);
        if (alreadyBooked.data) {
          setErrorBookingMessage("House is already booked for this duration");
          setShowErrorModal(true);
          setShowConfirmationModal(false);
        } else {
          setShowError(false);
          handleCloseModal();
          setRentAmount(
            startDate === endDate
              ? price * numGuests
              : price * numGuests * daysBetween(startDate, endDate)
          );

          const res = await axios.get(
            `http://localhost:8080/api/v1/profile/${auth.user}`
          );
          const user = res.data;
          console.log(user);
          console.log(house);
          console.log(rentAmount);
          console.log(startDate);
          console.log(endDate);
          console.log(new Date().toISOString().split("T")[0]);
          console.log(numGuests);

          const response = await axios.post(
            "http://localhost:8080/api/v1/booking/user/create",
            {
              house: house,
              user: user,
              rentAmount: rentAmount,
              payment: {
                amount: rentAmount,
                paymentMethod: "credit card",
              },
              review: null,
              bookingDate: new Date().toISOString().split("T")[0],
              startDate: startDate,
              endDate: endDate,
              guests: numGuests,
              status: 0,
            }
          );

          if (response.status === 200) {
            setShowSuccessModal(true);
          } else {
            setErrorBookingMessage("Bad request or system error");
            setShowErrorModal(true); // Show error modal for non-200 status
          }
        }
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      setErrorBookingMessage("System couldnot process your booking");
      setShowErrorModal(true); // Show error modal for errors
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

        <BookingSuccessModal
          show={showSuccessModal}
          handleClose={() => setShowSuccessModal(false)}
        />

        <BookingErrorModal
          show={showErrorModal}
          message={errorMessage}
          handleClose={() => setShowErrorModal(false)}
        />
      </Form>
    </div>
  );
};

export default BookingCard;
